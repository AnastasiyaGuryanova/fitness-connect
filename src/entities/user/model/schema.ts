import { z } from 'zod';

export const signupSchema = z
	.object({
		name: z
			.string()
			.min(2, 'Имя должно содержать минимум 2 символа')
			.nonempty('Имя обязательно'),
		contact: z
			.string()
			.nonempty('Необходимо указать email или телефон')
			.refine(
				(val) =>
					/^[\w-]+@([\w-]+\.)+[\w-]+$/.test(val) || /^\+?\d{10,15}$/.test(val),
				{
					message: 'Введите корректный email или телефон (+XXXXXXXXXXX)',
				},
			),
		age: z
			.number()
			.min(18, 'Возраст должен быть не менее 18')
			.max(120, 'Нереалистичный возраст'),
		weight: z
			.number()
			.min(30, 'Вес должен быть не менее 30 кг')
			.max(300, 'Нереалистичный вес'),
		height: z
			.number()
			.min(100, 'Рост должен быть не менее 100 см')
			.max(250, 'Нереалистичный рост'),
		waist: z
			.number()
			.min(40, 'Обхват талии должен быть не менее 40 см')
			.max(200, 'Нереалистичный обхват'),
		chest: z
			.number()
			.min(50, 'Обхват груди должен быть не менее 50 см')
			.max(200, 'Нереалистичный обхват'),
		hips: z
			.number()
			.min(50, 'Обхват бедер должен быть не менее 50 см')
			.max(200, 'Нереалистичный обхват'),
		arm: z
			.number()
			.min(20, 'Обхват руки должен быть не менее 20 см')
			.max(100, 'Нереалистичный обхват'),
		leg: z
			.number()
			.min(30, 'Обхват ноги должен быть не менее 30 см')
			.max(150, 'Нереалистичный обхват'),
		goal: z.string().nonempty('Цель обязательна'),
		restrictions: z.string().optional(),
		trainingExperience: z.string().nonempty('Опыт тренировок обязателен'),
		diet: z.string().nonempty('Рацион питания обязателен'),
		photos: z
			.array(z.instanceof(File))
			.min(3, 'Загрузите ровно 3 фотографии (спереди, сбоку, со спины)')
			.max(3, 'Максимум 3 фотографии'),
		password: z
			.string()
			.min(6, 'Пароль должен быть не менее 6 символов')
			.nonempty('Пароль обязателен'),
		confirmPassword: z.string().nonempty('Подтверждение пароля обязательно'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли должны совпадать',
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	contact: z
		.string()
		.nonempty('Необходимо указать email или телефон')
		.refine(
			(val) => /^[\w-]+@([\w-]+\.)+[\w-]+$/.test(val) || /^\+?\d{10,15}$/.test(val),
			{
				message: 'Введите корректный email или телефон (+XXXXXXXXXXX)',
			},
		),
	password: z
		.string()
		.min(6, 'Пароль должен быть не менее 6 символов')
		.nonempty('Пароль обязателен'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
