import { type ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

interface CardProps {
	title: string;
	children: ReactNode;
}

const CustomCard = styled(MuiCard)(({ theme }) => ({
	margin: '0 0 20px 0',
	borderRadius: 12,
	backgroundColor: theme.palette.background.paper,
}));

export function Card({ title, children }: CardProps) {
	return (
		<CustomCard>
			<CardContent>
				<Typography variant="h6">{title}</Typography>
				{children}
			</CardContent>
		</CustomCard>
	);
}
