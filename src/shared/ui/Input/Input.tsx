import { styled } from '@mui/material/styles';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import { alpha } from '@mui/material';

type InputProps = TextFieldProps & {
	label: string;
};

const CustomInput = styled(MuiTextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		borderRadius: 8,
		'&:hover fieldset': {
			borderColor: theme.palette.primary.main,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.palette.primary.main,
		},
	},
	'& .MuiInputLabel-root': {
		color: alpha(theme.palette.primary.main, 0.4),
		'&.Mui-focused': {
			color: theme.palette.primary.main,
		},
	},
}));

export const Input = ({ label, ...props }: InputProps) => {
	return <CustomInput label={label} variant="outlined" fullWidth {...props} />;
};
