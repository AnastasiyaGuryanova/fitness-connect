import { Navigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'shared/ui';
import { internalPaths } from 'shared/constants';
import { useAppSelector } from 'app/store/hooks';
import { loginSchema, type LoginFormData } from 'entities/user';
import { useLogin, LoginFormFields } from 'features/auth';

export const LoginPage = () => {
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const { handleLogin, error } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	});

	if (isAuthenticated) {
		return <Navigate to={internalPaths.home} replace />;
	}

	return (
		<Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
			<Form onSubmit={handleSubmit(handleLogin)}>
				<Typography variant="h2" align="center" mb={1}>
					Вход
				</Typography>

				<LoginFormFields register={register} errors={errors} />

				<Button label="Войти" type="submit" disabled={!isValid} sx={{ mt: 2 }} />

				{error && (
					<Typography color="error" align="center" mt={2}>
						{error}
					</Typography>
				)}

				<Typography align="center" mt={2}>
					Нет аккаунта?{' '}
					<Link to={internalPaths.signup}>Зарегистрироваться</Link>
				</Typography>
			</Form>
		</Box>
	);
};
