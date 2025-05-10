import { api } from 'shared/api';
import { type User } from '../model/userSlice';

export const userApi = {
	getUsers: () => api.get<User[]>('/users'),
	createUser: (user: Omit<User, 'id'>) => api.post<User>('/users', user),
};
