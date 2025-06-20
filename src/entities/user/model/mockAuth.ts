import type { SignupFormData } from './schema';
import { type User } from './userSlice';

export const mockUsers: { [key: string]: User & { password: string } } = {
	'test@example.com': {
		id: '1',
		name: 'Test User',
		contact: 'test@example.com',
		password: 'password123',
		role: 'client',
	},
	'+79999999999': {
		id: '2',
		name: 'Test User Phone',
		contact: '+79999999999',
		password: 'password123',
		role: 'trainer',
	},
};

// Функция аутентификации
export const authenticate = (contact: string, password: string): User | null => {
	const userData = mockUsers[contact];
	if (userData && userData.password === password) {
		const { password, ...user } = userData;
		return user;
	}
	return null;
};

// Функция регистрации
export const registerUser = async (
	contact: string,
	password: string,
	data: SignupFormData,
) => {
	try {
		if (mockUsers[contact]) {
			return {
				success: false,
				error: 'Пользователь с таким email или телефоном уже существует',
			};
		}

		const userId = Date.now().toString();

		const photoUrls = data.photos.map(
			(_, index) => `mock-photo-${userId}-${index}.jpg`,
		);

		// Создаем объект пользователя
		const newUser: User & { password: string } = {
			id: userId,
			name: data.name,
			contact,
			password,
			age: data.age,
			weight: data.weight,
			height: data.height,
			waistCircumference: data.waist,
			chestCircumference: data.chest,
			hipCircumference: data.hips,
			armCircumference: data.arm,
			legCircumference: data.leg,
			goal: data.goal,
			restrictions: data.restrictions,
			trainingExperience: data.trainingExperience,
			diet: data.diet,
			photoUrls,
			role: 'client',
		};

		mockUsers[contact] = newUser;

		const { password: _, ...userWithoutPassword } = newUser;

		return {
			success: true,
			user: userWithoutPassword,
		};
	} catch (error) {
		return { success: false, error: 'Ошибка при регистрации' };
	}
};
