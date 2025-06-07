import { Navigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'shared/ui';
import { internalPaths } from 'shared/constants';
import { useAppSelector } from 'app/store/hooks';
import { signupSchema, type SignupFormData } from 'entities/user';
import { useSignup, SignupFormFields } from 'features/auth';

export const SignupPage = () => {
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const { handleSignup, error } = useSignup();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		trigger,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		mode: 'onChange',
		defaultValues: {
			photos: [],
		},
	});

	if (isAuthenticated) {
		return <Navigate to={internalPaths.home} replace />;
	}

	return (
		<Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
			<Form onSubmit={handleSubmit(handleSignup)}>
				<Typography variant="h2" align="center" mb={1}>
					Регистрация
				</Typography>

				<SignupFormFields
					register={register}
					errors={errors}
					setValue={setValue}
					trigger={trigger}
				/>

				<Button
					label="Зарегистрироваться"
					type="submit"
					disabled={!isValid}
					sx={{ mt: 2 }}
				/>

				{error && (
					<Typography color="error" align="center" mt={2}>
						{error}
					</Typography>
				)}

				<Typography align="center" mt={2}>
					Уже есть аккаунт? <Link to={internalPaths.login}>Войти</Link>
				</Typography>
			</Form>
		</Box>
	);
};
