import { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
	it('рендерит TextField с переданными пропсами', () => {
		render(<Input label="Test" type="text" />);
		expect(screen.getByLabelText('Test')).toBeInTheDocument();
	});

	it('передает ref корректно', () => {
		const TestComponent = () => {
			const inputRef = useRef<HTMLInputElement>(null);
			return <Input label="Test" inputRef={inputRef} />;
		};

		const { container } = render(<TestComponent />);
		const input = container.querySelector('input');

		expect(input).toBeInstanceOf(HTMLInputElement);
		fireEvent.input(input!, { target: { value: 'test' } });
		expect(input).toHaveValue('test');
	});
});
