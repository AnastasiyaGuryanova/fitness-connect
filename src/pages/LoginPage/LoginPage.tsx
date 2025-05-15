import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Form, Input, Button } from 'shared/ui';
import { internalPaths } from 'shared/constants';
import { login } from 'entities/user/model/userSlice';
import { authenticate } from 'entities/user/model';

const loginSchema = z.object({
	email: z.string().email('Введите корректный email').nonempty('Email обязателен'),
	password: z
		.string()
		.min(6, 'Пароль должен быть не менее 6 символов')
		.nonempty('Пароль обязателен'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: LoginFormData) => {
		setError(null);
		const user = authenticate(data.email, data.password);
		if (user) {
			dispatch(login(user));
			navigate(internalPaths.home, { replace: true });
		} else {
			setError('Неверный Email или пароль');
		}
	};

	if (isAuthenticated) {
		return <Navigate to={internalPaths.home} replace />;
	}

	return (
		<Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h2" align="center" mb={1}>
					Вход
				</Typography>

				<Input
					label="Email"
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<Input
					label="Пароль"
					type="password"
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
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
