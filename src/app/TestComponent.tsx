import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { login, logout } from 'entities/user';

export const TestComponent = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, user } = useAppSelector((state) => state.user);

	return (
		<div>
			<Typography variant="h1">Online Fitness Trainer</Typography>
			<Typography>
				Auth: {isAuthenticated ? `Logged in as ${user?.name}` : 'Not logged in'}
			</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={() =>
					dispatch(
						login({ id: '1', name: 'Test User', email: 'test@example.com' }),
					)
				}
			>
				Login
			</Button>
			<Button
				variant="outlined"
				color="secondary"
				onClick={() => dispatch(logout())}
			>
				Logout
			</Button>
		</div>
	);
};
