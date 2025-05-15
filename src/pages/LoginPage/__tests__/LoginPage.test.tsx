import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { renderWithProviders } from '../../../../test/utils';
import { LoginPage } from '../LoginPage';
import { internalPaths } from 'shared/constants';
import { authenticate } from 'entities/user/model';

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

jest.mock('entities/user/model', () => ({
	authenticate: jest.fn(),
}));

describe('LoginPage', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('корректно отображает форму входа', () => {
		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		expect(screen.getByText('Вход')).toBeInTheDocument();
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
		expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
		expect(store.getState().user.isAuthenticated).toBe(false);
		expect(store.getState().user.user).toBe(null);
	});

	it('отключить кнопку «Отправить», если форма недействительна', () => {
		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const submitButton = screen.getByRole('button', { name: /Войти/i });
		expect(submitButton).toBeDisabled();
		expect(store.getState().user.isAuthenticated).toBe(false);
		expect(store.getState().user.user).toBe(null);
	});

	it('показывает ошибки проверки для недействительного адреса электронной почты и пароля', async () => {
		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Пароль');
		const submitButton = screen.getByRole('button', { name: /Войти/i });

		await userEvent.type(emailInput, 'invalid-email');
		await userEvent.type(passwordInput, '123');
		fireEvent.click(submitButton);

		expect(screen.getByText('Введите корректный email')).toBeInTheDocument();
		expect(
			screen.getByText('Пароль должен быть не менее 6 символов'),
		).toBeInTheDocument();
		expect(store.getState().user.isAuthenticated).toBe(false);
		expect(store.getState().user.user).toBe(null);
	});

	it('показывает сообщение об ошибке при неудачном входе в систему', async () => {
		(authenticate as jest.Mock).mockReturnValue(null);

		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Пароль');
		const submitButton = screen.getByRole('button', { name: /Войти/i });

		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.type(passwordInput, 'wrongpassword');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('Неверный Email или пароль')).toBeInTheDocument();
			expect(store.getState().user.isAuthenticated).toBe(false);
			expect(store.getState().user.user).toBe(null);
		});
	});

	it('переходит к / и обновляет стор при успешном входе в систему', async () => {
		const userData = {
			id: '1',
			name: 'Test User',
			email: 'test@example.com',
		};
		(authenticate as jest.Mock).mockReturnValue(userData);

		const { store } = renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: null, isAuthenticated: false } },
		});

		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Пароль');
		const submitButton = screen.getByRole('button', { name: /Войти/i });

		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.type(passwordInput, 'password123');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith(internalPaths.home, {
				replace: true,
			});
			expect(store.getState().user.isAuthenticated).toBe(true);
			expect(store.getState().user.user).toEqual(userData);
		});
	});

	it('редиректит на /, если пользователь уже авторизован', async () => {
		const userData = {
			id: '1',
			name: 'Test User',
			email: 'test@example.com',
		};
		renderWithProviders(<LoginPage />, {
			routerProps: { initialEntries: ['/login'] },
			preloadedState: { user: { user: userData, isAuthenticated: true } },
		});

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
