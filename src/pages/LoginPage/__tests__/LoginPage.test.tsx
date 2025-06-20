import { screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../../../test/utils';
import { LoginPage } from '../LoginPage';
import { internalPaths } from 'shared/constants';
import { authenticate } from 'entities/user/model';
import type { User } from 'entities/user';

// Мок для react-router-dom
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
	const actual = jest.requireActual('react-router-dom');
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
	authenticate: jest.fn(),
	login: jest.fn((user) => ({ type: 'user/login', payload: user })),
}));

// Временный мок для zodResolver, чтобы обойти parseAsync
jest.mock('@hookform/resolvers/zod', () => ({
	zodResolver: () => () => ({ values: {}, errors: {} }),
}));

describe('LoginPage', () => {
	let user: UserEvent;
	let consoleErrorMock: jest.Mock;
	let consoleLogMock: jest.Mock;

	beforeEach(() => {
		user = userEvent.setup();
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
		jest.clearAllMocks();
	});

	it('корректно отображает форму входа', () => {
		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		expect(screen.getByText('Вход')).toBeInTheDocument();
		expect(screen.getByLabelText('Email или телефон')).toBeInTheDocument();
		expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
		expect(screen.getByText(/Зарегистрироваться/i)).toBeInTheDocument();
		expect(store.getState().user.isAuthenticated).toBe(false);
		expect(store.getState().user.user).toBe(null);
	});

	it('отключает кнопку «Отправить», если форма недействительна', () => {
		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const submitButton = screen.getByRole('button', { name: /Войти/i });
		expect(submitButton).toBeDisabled();
		expect(store.getState().user.isAuthenticated).toBe(false);
		expect(store.getState().user.user).toBe(null);
	});

	it('показывает сообщение об ошибке при неудачном входе', async () => {
		(authenticate as jest.Mock).mockReturnValue(null);

		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const contactInput = screen.getByLabelText('Email или телефон');
		const passwordInput = screen.getByLabelText('Пароль');
		const submitButton = screen.getByRole('button', { name: /Войти/i });

		await user.type(contactInput, 'test@example.com');
		await user.type(passwordInput, 'wrongpassword');
		await user.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText('Неверный email/телефон или пароль'),
			).toBeInTheDocument();
			expect(store.getState().user.isAuthenticated).toBe(false);
			expect(store.getState().user.user).toBe(null);
		});
	});

	it('переходит на главную страницу и обновляет стор при успешном входе', async () => {
		const userData: User = {
			id: '1',
			name: 'Test User',
			contact: 'test@example.com',
			role: 'client',
		};
		(authenticate as jest.Mock).mockReturnValue(userData);

		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const contactInput = screen.getByLabelText('Email или телефон');
		const passwordInput = screen.getByLabelText('Пароль');
		const submitButton = screen.getByRole('button', { name: /Войти/i });

		await user.type(contactInput, 'test@example.com');
		await user.type(passwordInput, 'password123');
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith(internalPaths.home, {
				replace: true,
			});
			expect(store.getState().user.isAuthenticated).toBe(true);
			expect(store.getState().user.user).toEqual(userData);
		});
	});

	it('перенаправляет на главную страницу, если пользователь уже аутентифицирован', () => {
		const userData: User = {
			id: '1',
			name: 'Test User',
			contact: 'test@example.com',
			role: 'client',
		};
		renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: userData, isAuthenticated: true } },
		});

		expect(mockNavigate).toHaveBeenCalledWith(internalPaths.home, { replace: true });
	});
});
