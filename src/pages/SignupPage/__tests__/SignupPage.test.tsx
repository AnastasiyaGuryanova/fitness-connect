import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../test/utils';
import { SignupPage } from '../SignupPage';
import { internalPaths } from 'shared/constants';
import { registerUser } from 'entities/user/model';
import type { User } from 'entities/user';

// Мок для react-router-dom
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
	const actual =
		jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockNavigate,
		Navigate: jest.fn(({ to, replace }) => {
			mockNavigate(to, { replace });
			return null;
		}),
	};
});

// Мок для entities/user/model
jest.mock('entities/user/model', () => ({
	registerUser: jest.fn(),
	login: jest.fn((user) => ({ type: 'user/login', payload: user })),
}));

// Мок для @hookform/resolvers/zod
jest.mock('@hookform/resolvers/zod', () => ({
	zodResolver: () => () => ({
		values: {},
		errors: {},
	}),
}));

describe('SignupPage', () => {
	let consoleErrorMock: jest.Mock;
	let consoleLogMock: jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		consoleErrorMock = jest.fn();
		consoleLogMock = jest.fn();
		console.error = consoleErrorMock;
		console.log = consoleLogMock;
	});

	afterEach(() => {
		if (consoleErrorMock.mock.calls.length > 0) {
			consoleLogMock('Captured console.error:', consoleErrorMock.mock.calls);
		}
	});

	it('корректно отображает форму регистрации', async () => {
		const { store } = renderWithProviders(<SignupPage />, {
			routerProps: { initialEntries: ['/signup'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		screen.debug();

		await waitFor(
			() => {
				expect(screen.getByText('Регистрация')).toBeInTheDocument();
				expect(screen.getByLabelText('Имя')).toBeInTheDocument();
				expect(screen.getByLabelText('Email или телефон')).toBeInTheDocument();
				expect(screen.getByLabelText('Возраст')).toBeInTheDocument();
				expect(screen.getByLabelText('Вес (кг)')).toBeInTheDocument();
				expect(
					screen.getByRole('button', { name: /Зарегистрироваться/i }),
				).toBeInTheDocument();
				expect(store.getState().user.isAuthenticated).toBe(false);
				expect(store.getState().user.user).toBe(null);
			},
			{ timeout: 2000 },
		);
	});

	it('выключает кнопку «Отправить», если форма недействительна', async () => {
		const { store } = renderWithProviders(<SignupPage />, {
			routerProps: { initialEntries: ['/signup'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		screen.debug();

		await waitFor(
			() => {
				const submitButton = screen.getByRole('button', {
					name: /Зарегистрироваться/i,
				});
				expect(submitButton).toBeDisabled();
				expect(store.getState().user.isAuthenticated).toBe(false);
				expect(store.getState().user.user).toBe(null);
			},
			{ timeout: 2000 },
		);
	});

	it('показывает сообщение об ошибке при неудачной регистрации', async () => {
		(registerUser as jest.Mock).mockReturnValue({
			success: false,
			error: 'Пользователь уже существует',
		});

		const { store } = renderWithProviders(<SignupPage />, {
			routerProps: { initialEntries: ['/signup'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		screen.debug();

		const nameInput = screen.getByLabelText('Имя');
		const contactInput = screen.getByLabelText('Email или телефон');
		const ageInput = screen.getByLabelText('Возраст');
		const weightInput = screen.getByLabelText('Вес (кг)');
		const submitButton = screen.getByRole('button', { name: /Зарегистрироваться/i });

		await userEvent.type(nameInput, 'Test User');
		await userEvent.type(contactInput, 'test@example.com');
		await userEvent.type(ageInput, '25');
		await userEvent.type(weightInput, '70');
		await userEvent.click(submitButton);

		screen.debug();

		await waitFor(
			() => {
				expect(
					screen.getByText('Пользователь уже существует'),
				).toBeInTheDocument();
				expect(store.getState().user.isAuthenticated).toBe(false);
				expect(store.getState().user.user).toBe(null);
			},
			{ timeout: 2000 },
		);
	});

	it('переходит на главную страницу и обновляет магазин при успешной регистрации', async () => {
		const userData: User = {
			id: '1',
			name: 'Test User',
			contact: 'test@example.com',
			photoUrls: [],
			age: 25,
		};
		(registerUser as jest.Mock).mockReturnValue({ success: true, user: userData });

		const { store } = renderWithProviders(<SignupPage />, {
			routerProps: { initialEntries: ['/signup'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		screen.debug();

		const nameInput = screen.getByLabelText('Имя');
		const contactInput = screen.getByLabelText('Email или телефон');
		const ageInput = screen.getByLabelText('Возраст');
		const weightInput = screen.getByLabelText('Вес (кг)');
		const submitButton = screen.getByRole('button', { name: /Зарегистрироваться/i });

		await userEvent.type(nameInput, 'Test User');
		await userEvent.type(contactInput, 'test@example.com');
		await userEvent.type(ageInput, '25');
		await userEvent.type(weightInput, '70');
		await userEvent.click(submitButton);

		screen.debug();

		await waitFor(
			() => {
				expect(mockNavigate).toHaveBeenCalledWith(internalPaths.home, {
					replace: true,
				});
				expect(store.getState().user.isAuthenticated).toBe(true);
				expect(store.getState().user.user).toEqual(userData);
			},
			{ timeout: 2000 },
		);
	});

	it('перенаправляет на главную страницу, если пользователь уже аутентифицирован', async () => {
		const userData: User = {
			id: '1',
			name: 'Test User',
			contact: 'test@example.com',
			photoUrls: [],
		};
		renderWithProviders(<SignupPage />, {
			routerProps: { initialEntries: ['/signup'] },
			preloadedState: { user: { user: userData, isAuthenticated: true } },
		});

		screen.debug();

		await waitFor(
			() => {
				expect(mockNavigate).toHaveBeenCalledWith(internalPaths.home, {
					replace: true,
				});
			},
			{ timeout: 2000 },
		);
	});
});
