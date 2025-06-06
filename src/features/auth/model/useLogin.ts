import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/store/hooks';
import { internalPaths } from 'shared/constants';
import { login, type LoginFormData, authenticate } from 'entities/user';

export const useLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const handleLogin = (data: LoginFormData) => {
		setError(null);
		const user = authenticate(data.contact, data.password);
		if (user) {
			dispatch(login(user));
			navigate(internalPaths.home, { replace: true });
		} else {
			setError('Неверный email/телефон или пароль');
		}
	};

	return { handleLogin, error, setError };
};
