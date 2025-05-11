import { styled } from '@mui/material/styles';
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { alpha } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
	label: string;
}

const CustomButton = styled(MuiButton)(({ theme }) => ({
	padding: theme.spacing(1, 2),
	textTransform: 'none',
	backgroundColor: alpha(theme.palette.primary.main, 1),
	color: alpha(theme.palette.text.secondary, 1),

	'&:hover': {
		backgroundColor: alpha(theme.palette.primary.main, 0.8),
	},

	'&.MuiButton-containedSecondary': {
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: alpha(theme.palette.secondary.main, 0.8),
		},
	},

	'&.MuiButton-outlined': {
		borderColor: theme.palette.primary.main,
		color: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: alpha(theme.palette.primary.main, 0.04),
		},
	},
}));

export const Button = ({ label, ...props }: ButtonProps) => {
	return <CustomButton {...props}>{label}</CustomButton>;
};
