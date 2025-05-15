import { type User } from './userSlice';

const mockUsers: { [key: string]: User & { password: string } } = {
	'test@example.com': {
		id: '1',
		name: 'Test User',
		email: 'test@example.com',
		password: 'password123',
	},
};

export const authenticate = (email: string, password: string): User | null => {
	const userData = mockUsers[email];
	if (userData && userData.password === password) {
		const { password, ...user } = userData;
		return user;
	}
	return null;
};
