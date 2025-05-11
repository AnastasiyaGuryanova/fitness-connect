import { Typography } from '@mui/material';
import { useState } from 'react';
import { Button, Input, Form, Modal, Card, AppWrapper } from 'shared/ui';
import { Header } from 'widgets/Header';

export const TestComponent = () => {
	const [open, setOpen] = useState(false);
	//const [page, setPage] = useState(1);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted');
	};

	return (
		<>
			<Header />
			<AppWrapper>
				<Card title="Test Card">
					<Typography>Test content in card</Typography>
				</Card>

				<Form onSubmit={handleSubmit}>
					<Input label="Name" />
					<Input label="Password" type="password" />

					<Button label="Submit" type="submit" />
				</Form>

				<Card title="">
					<Button label="Open Modal" onClick={() => setOpen(true)} />
				</Card>

				<Modal
					open={open}
					onClose={() => setOpen(false)}
					title="Test Modal"
					onSubmit={() => {
						console.log('Modal submitted');
						setOpen(false);
					}}
				>
					<Typography>Modal content</Typography>
				</Modal>
			</AppWrapper>
		</>
	);
};
