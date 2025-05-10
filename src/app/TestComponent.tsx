import { useAppDispatch, useAppSelector } from './store/hooks';
import { login, logout } from 'entities/user';

export const TestComponent = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, user } = useAppSelector((state) => state.user);

	return (
		<div>
			<h1>
				Auth: {isAuthenticated ? `Logged in as ${user?.name}` : 'Not logged in'}
			</h1>
			<button
				onClick={() =>
					dispatch(
						login({ id: '1', name: 'Test User', email: 'test@example.com' }),
					)
				}
			>
				Login
			</button>
			<button onClick={() => dispatch(logout())}>Logout</button>
		</div>
	);
};
