import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/store/hooks';
import { internalPaths } from 'shared/constants';
import { type SignupFormData, login, registerUser } from 'entities/user';

export const useSignup = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const handleSignup = async (data: SignupFormData) => {
		setError(null);
		const result = await registerUser(data.contact, data.password, data);

		if (result.success) {
			if (result.user) {
				dispatch(login(result.user));
				navigate(internalPaths.home, { replace: true });
			} else {
				setError('Ошибка: данные пользователя отсутствуют');
			}
		} else {
			setError(result.error || 'Ошибка регистрации');
		}
	};

	return { handleSignup, error, setError };
};
