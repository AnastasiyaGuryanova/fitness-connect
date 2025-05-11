import * as React from 'react';
import { type ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box, type BoxProps } from '@mui/material';

interface FormProps extends BoxProps {
	children: ReactNode;
	onSubmit: (e: React.FormEvent) => void;
}

const CustomForm = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	margin: '20px 0',
	gap: theme.spacing(2),
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
	borderRadius: 8,
})) as typeof Box;

export const Form = ({ children, onSubmit }: FormProps) => {
	return (
		<CustomForm component="form" onSubmit={onSubmit}>
			{children}
		</CustomForm>
	);
};
