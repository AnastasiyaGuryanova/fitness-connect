import { styled } from '@mui/material/styles';
import { type ReactNode } from 'react';

document.body.style.margin = '0';

const Wrapper = styled('div')(({ theme }) => ({
	minHeight: '100vh',
	margin: '0',
	padding: '15px 30px',
	backgroundColor: theme.palette.background.page || '#1c3139',
	color: theme.palette.text.secondary,
}));

interface AppWrapperProps {
	children: ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
	return <Wrapper>{children}</Wrapper>;
};
