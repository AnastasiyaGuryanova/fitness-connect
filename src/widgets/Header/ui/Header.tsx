import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	padding: theme.spacing(0, 2),
	color: theme.palette.text.primary,
}));

const Logo = styled('img')(({ theme }) => ({
	height: '40px',
	marginRight: theme.spacing(2),
}));

export function Header() {
	return (
		<CustomAppBar position="static">
			<Toolbar>
				<Logo src="/fitness-connect.png" alt="Fitness Connect Logo" />
				<Typography variant="h6">Online Fitness Trainer</Typography>
			</Toolbar>
		</CustomAppBar>
	);
}
