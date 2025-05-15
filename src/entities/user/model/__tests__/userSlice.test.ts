import userReducer, {
	login,
	logout,
	type UserState,
} from 'entities/user/model/userSlice';

describe('userReducer', () => {
	const initialState: UserState = { user: null, isAuthenticated: false };
	const userData = { id: '1', name: 'Test User', email: 'test@example.com' };

	it('обрабатывает вход в систему', () => {
		const newState = userReducer(initialState, login(userData));
		expect(newState).toEqual({ user: userData, isAuthenticated: true });
	});

	it('обрабатывает выход из системы', () => {
		const loggedInState: UserState = { user: userData, isAuthenticated: true };
		const newState = userReducer(loggedInState, logout());
		expect(newState).toEqual({ user: null, isAuthenticated: false });
	});
});
