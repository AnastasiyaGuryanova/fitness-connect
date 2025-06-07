import { render, screen, cleanup } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { FileUpload } from '../FileUpload';

describe('FileUpload', () => {
	let user: UserEvent;

	beforeEach(() => {
		user = userEvent.setup();
		global.URL.createObjectURL = jest.fn(() => 'mocked-url');
		global.URL.revokeObjectURL = jest.fn();
	});

	afterEach(() => {
		cleanup();
		jest.clearAllMocks();
	});

	it('отображает метку и кнопку загрузки', () => {
		const handleChange = jest.fn();
		render(<FileUpload label="Upload Photos" onChange={handleChange} />);
		expect(screen.getByText('Upload Photos')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /загрузить файлы/i }),
		).toBeInTheDocument();
	});

	it('вызывает onChange с выбранными файлами', async () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				data-testid="file-input"
			/>,
		);
		const fileInput = screen.getByTestId('file-input');
		const files = [new File(['test'], 'test.jpg', { type: 'image/jpeg' })];
		await user.upload(fileInput, files);
		expect(handleChange).toHaveBeenCalledWith(files);
	});

	it('отображает предпросмотр загруженных изображений', async () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				data-testid="file-input"
			/>,
		);
		const fileInput = screen.getByTestId('file-input');
		const files = [
			new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
			new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
		];
		await user.upload(fileInput, files);

		const image1 = screen.getByAltText('Preview test1.jpg');
		const image2 = screen.getByAltText('Preview test2.jpg');
		expect(image1).toHaveStyle('width: 80px; height: 80px');
		expect(image2).toHaveStyle('width: 80px; height: 80px');
		expect(screen.getByText('test1.jpg')).toBeInTheDocument();
		expect(screen.getByText('test2.jpg')).toBeInTheDocument();
	});

	it('удаляет файл при нажатии на кнопку "Удалить"', async () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				data-testid="file-input"
			/>,
		);
		const fileInput = screen.getByTestId('file-input');
		const files = [
			new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
			new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
		];
		await user.upload(fileInput, files);

		const deleteButton = screen.getAllByRole('button', { name: /удалить/i })[0];
		await user.click(deleteButton);

		expect(handleChange).toHaveBeenCalledWith([files[1]]);
		expect(screen.queryByText('test1.jpg')).not.toBeInTheDocument();
		expect(screen.getByText('test2.jpg')).toBeInTheDocument();
	});

	it('ограничивает количество файлов до maxFiles', async () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				maxFiles={2}
				data-testid="file-input"
			/>,
		);
		const fileInput = screen.getByTestId('file-input');
		const files = [
			new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
			new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
			new File(['test3'], 'test3.jpg', { type: 'image/jpeg' }),
		];
		await user.upload(fileInput, files);

		expect(handleChange).toHaveBeenCalledWith([files[0], files[1]]);
		expect(screen.getByText('test1.jpg')).toBeInTheDocument();
		expect(screen.getByText('test2.jpg')).toBeInTheDocument();
		expect(screen.queryByText('test3.jpg')).not.toBeInTheDocument();
	});

	it('фильтрует не-изображения и файлы больше 5 МБ', async () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				data-testid="file-input"
			/>,
		);
		const fileInput = screen.getByTestId('file-input');
		const files = [
			new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
			new File(['test'], 'test.pdf', { type: 'application/pdf' }),
			new File([new Blob([new ArrayBuffer(6 * 1024 * 1024)])], 'big.jpg', {
				type: 'image/jpeg',
			}),
		];
		await user.upload(fileInput, files);

		expect(handleChange).toHaveBeenCalledWith([files[0]]);
		expect(screen.getByText('test.jpg')).toBeInTheDocument();
		expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
		expect(screen.queryByText('big.jpg')).not.toBeInTheDocument();
	}, 10000);

	it('отображает ошибку из пропса error', () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				error="Требуется 3 файла"
			/>,
		);
		expect(screen.getByText('Требуется 3 файла')).toBeInTheDocument();
	});

	it('сбрасывает input после загрузки файлов', async () => {
		const handleChange = jest.fn();
		render(
			<FileUpload
				label="Upload"
				onChange={handleChange}
				data-testid="file-input"
			/>,
		);
		const fileInput = screen.getByTestId('file-input');
		const files = [new File(['test'], 'test.jpg', { type: 'image/jpeg' })];
		await user.upload(fileInput, files);

		expect(fileInput).toHaveValue('');
		await user.upload(fileInput, files);
		expect(handleChange).toHaveBeenCalledTimes(2);
	});
});
