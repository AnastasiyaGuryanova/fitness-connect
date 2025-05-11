import { type ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '../Button';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	submitLabel?: string;
	onSubmit?: () => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		borderRadius: 12,
		padding: theme.spacing(2),
		minWidth: 300,
	},
}));

export const Modal = ({
	open,
	onClose,
	title,
	children,
	onSubmit,
	submitLabel = 'Отправить',
}: ModalProps) => {
	return (
		<CustomDialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button label="Отмена" onClick={onClose}></Button>
				{onSubmit && <Button label={submitLabel} onClick={onSubmit}></Button>}
			</DialogActions>
		</CustomDialog>
	);
};
