import { authenticate, registerUser, mockUsers } from '../mockAuth';
import type { SignupFormData } from '../schema';

describe('authenticate', () => {
	it('возвращает данные пользователя для действительных учетных данных', () => {
		const result = authenticate('test@example.com', 'password123');
		expect(result).toEqual({
			id: '1',
			name: 'Test User',
			contact: 'test@example.com',
			role: 'client',
		});
	});

	it('возвращает null для недействительных учетных данных', () => {
		const result = authenticate('test@example.com', 'wrongpassword');
		expect(result).toBeNull();
	});
});

describe('registerUser', () => {
	const mockData: SignupFormData = {
		name: 'New User',
		contact: 'new@example.com',
		age: 25,
		weight: 70,
		height: 175,
		waist: 80,
		chest: 100,
		hips: 90,
		arm: 35,
		leg: 50,
		goal: 'Lose weight',
		restrictions: '',
		trainingExperience: 'Beginner',
		diet: 'Balanced',
		photos: [
			new File(['front'], 'front.jpg', { type: 'image/jpeg' }),
			new File(['side'], 'side.jpg', { type: 'image/jpeg' }),
			new File(['back'], 'back.jpg', { type: 'image/jpeg' }),
		],
		password: 'password123',
		confirmPassword: 'password123',
	};

	beforeEach(() => {
		// Очищаем mockUsers для изоляции тестов
		Object.keys(mockUsers).forEach((key) => delete mockUsers[key]);
	});

	it('успешно регистрирует пользователя и возвращает данные пользователя', async () => {
		const result = await registerUser(mockData.contact, mockData.password, mockData);

		expect(result).toEqual({
			success: true,
			user: {
				id: expect.any(String),
				name: mockData.name,
				contact: mockData.contact,
				age: mockData.age,
				weight: mockData.weight,
				height: mockData.height,
				waistCircumference: mockData.waist,
				chestCircumference: mockData.chest,
				hipCircumference: mockData.hips,
				armCircumference: mockData.arm,
				legCircumference: mockData.leg,
				goal: mockData.goal,
				restrictions: mockData.restrictions,
				trainingExperience: mockData.trainingExperience,
				diet: mockData.diet,
				photoUrls: expect.arrayContaining([
					expect.stringMatching(/mock-photo-.+\.jpg/),
					expect.stringMatching(/mock-photo-.+\.jpg/),
					expect.stringMatching(/mock-photo-.+\.jpg/),
				]),
				role: 'client',
			},
		});
	});

	it('возвращает ошибку, если пользователь уже существует', async () => {
		// Добавляем пользователя в mockUsers
		mockUsers[mockData.contact] = {
			id: '1',
			name: mockData.name,
			contact: mockData.contact,
			password: mockData.password,
			role: 'client',
		};

		const result = await registerUser(mockData.contact, mockData.password, mockData);

		expect(result).toEqual({
			success: false,
			error: 'Пользователь с таким email или телефоном уже существует',
		});
	});

	it('обрабатывает ошибку при регистрации', async () => {
		// Симулируем ошибку, заменив Date.now на throw
		jest.spyOn(Date, 'now').mockImplementation(() => {
			throw new Error('Mock error');
		});

		const result = await registerUser(mockData.contact, mockData.password, mockData);

		expect(result).toEqual({
			success: false,
			error: 'Ошибка при регистрации',
		});

		// Восстанавливаем Date.now
		jest.spyOn(Date, 'now').mockRestore();
	});
});
