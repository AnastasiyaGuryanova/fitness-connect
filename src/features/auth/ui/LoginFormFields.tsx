import { Box } from '@mui/material';
import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { Input } from 'shared/ui';
import { type LoginFormData } from 'entities/user';

interface LoginFormFieldsProps {
	register: UseFormRegister<LoginFormData>;
	errors: FieldErrors<LoginFormData>;
}

export const LoginFormFields = ({ register, errors }: LoginFormFieldsProps) => {
	return (
		<Box>
			<Input
				label="Email или телефон"
				{...register('contact')}
				error={!!errors.contact}
				helperText={errors.contact?.message}
			/>
			<Input
				label="Пароль"
				type="password"
				{...register('password')}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>
		</Box>
	);
};
