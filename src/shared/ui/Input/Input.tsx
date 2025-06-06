import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import { alpha } from '@mui/material';

type InputProps = TextFieldProps & {
	label: string;
	inputRef?: React.Ref<HTMLInputElement>;
};

const CustomInput = styled(MuiTextField)(({ theme }) => ({
	marginBottom: '15px',

	'& .MuiOutlinedInput-root': {
		borderRadius: 8,
		'&:hover fieldset': {
			borderColor: theme.palette.primary.main,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.palette.primary.main,
		},
		'&.Mui-error fieldset': {
			borderColor: theme.palette.error.main,
		},
	},
	'& .MuiInputLabel-root': {
		color: alpha(theme.palette.primary.main, 0.4),
		'&.Mui-focused': {
			color: theme.palette.primary.main,
		},
		'&.Mui-error': {
			color: theme.palette.error.main,
		},
	},
	'& .MuiFormHelperText-root': {
		color: theme.palette.error.main,
	},
}));

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, helperText, ...props }, ref) => {
		return (
			<CustomInput
				label={label}
				variant="outlined"
				fullWidth
				error={error}
				helperText={helperText}
				{...props}
				inputRef={ref}
			/>
		);
	},
);
