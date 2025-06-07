import { Box } from '@mui/material';
import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { FileUpload, Input } from 'shared/ui';
import { type SignupFormData } from 'entities/user';

interface SignupFormFieldsProps {
	register: UseFormRegister<SignupFormData>;
	errors: FieldErrors<SignupFormData>;
	setValue: (name: keyof SignupFormData, value: any, options?: any) => void;
	trigger: (name?: keyof SignupFormData) => Promise<boolean>;
}

export const SignupFormFields = ({
	register,
	errors,
	setValue,
	trigger,
}: SignupFormFieldsProps) => {
	return (
		<Box>
			{/* Личные данные */}
			<Input
				label="Имя"
				{...register('name')}
				error={!!errors.name}
				helperText={errors.name?.message}
			/>
			<Input
				label="Email или телефон"
				{...register('contact')}
				error={!!errors.contact}
				helperText={errors.contact?.message}
			/>
			<Input
				label="Возраст"
				type="number"
				{...register('age', { valueAsNumber: true })}
				error={!!errors.age}
				helperText={errors.age?.message}
			/>

			{/* Параметры тела */}
			<Input
				label="Вес (кг)"
				type="number"
				{...register('weight', { valueAsNumber: true })}
				error={!!errors.weight}
				helperText={errors.weight?.message}
			/>
			<Input
				label="Рост (см)"
				type="number"
				{...register('height', { valueAsNumber: true })}
				error={!!errors.height}
				helperText={errors.height?.message}
			/>
			<Input
				label="Обхват талии (см)"
				type="number"
				{...register('waist', { valueAsNumber: true })}
				error={!!errors.waist}
				helperText={errors.waist?.message}
			/>
			<Input
				label="Обхват груди (см)"
				type="number"
				{...register('chest', { valueAsNumber: true })}
				error={!!errors.chest}
				helperText={errors.chest?.message}
			/>
			<Input
				label="Обхват бедер (см)"
				type="number"
				{...register('hips', { valueAsNumber: true })}
				error={!!errors.hips}
				helperText={errors.hips?.message}
			/>
			<Input
				label="Обхват руки (см)"
				type="number"
				{...register('arm', { valueAsNumber: true })}
				error={!!errors.arm}
				helperText={errors.arm?.message}
			/>
			<Input
				label="Обхват ноги (см)"
				type="number"
				{...register('leg', { valueAsNumber: true })}
				error={!!errors.leg}
				helperText={errors.leg?.message}
			/>

			{/* Цели и ограничения */}
			<Input
				label="Цель и ожидаемый результат"
				{...register('goal')}
				error={!!errors.goal}
				helperText={errors.goal?.message}
				multiline
			/>
			<Input
				label="Противопоказания, заболевания и ограничения"
				{...register('restrictions')}
				error={!!errors.restrictions}
				helperText={errors.restrictions?.message}
				multiline
			/>
			<Input
				label="Опыт тренировок"
				{...register('trainingExperience')}
				error={!!errors.trainingExperience}
				helperText={errors.trainingExperience?.message}
				multiline
			/>
			<Input
				label="Текущий рацион питания"
				{...register('diet')}
				error={!!errors.diet}
				helperText={errors.diet?.message}
				multiline
			/>

			{/* Загрузка фотографий */}
			<FileUpload
				label="Добавьте фотографии (3 шт: спереди, сбоку, со спины)"
				onChange={(files) => {
					setValue('photos', files, { shouldValidate: true });
					trigger('photos');
				}}
				error={errors.photos?.message}
				maxFiles={3}
				accept="image/*"
			/>

			{/* Пароль */}
			<Input
				label="Пароль"
				type="password"
				{...register('password')}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>
			<Input
				label="Повторить пароль"
				type="password"
				{...register('confirmPassword')}
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword?.message}
			/>
		</Box>
	);
};
