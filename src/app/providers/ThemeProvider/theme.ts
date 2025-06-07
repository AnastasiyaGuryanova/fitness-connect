import { createTheme, type ThemeOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
	interface TypeBackground {
		page: string;
	}

	interface Palette {
		background: TypeBackground;
	}
	interface PaletteOptions {
		background?: Partial<TypeBackground>;
	}
}

const theme: ThemeOptions = createTheme({
	palette: {
		primary: {
			main: '#2A3C50',
		},
		secondary: {
			main: '#1c3139',
		},
		success: {
			main: '#2E7D32',
		},
		error: {
			main: '#D32F2F',
		},
		background: {
			default: '#e3e6dc',
			paper: '#eaece4',
			page: '#1c3139',
		} as const,
		text: {
			primary: '#1c3139',
			secondary: '#e3e6dc',
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
		h1: {
			fontSize: '2rem',
			fontWeight: 600,
			color: '#1c3139',
		},
		h2: {
			fontSize: '1.75rem',
			fontWeight: 600,
			color: '#1c3139',
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 500,
			color: '#1c3139',
		},
		h4: {
			fontSize: '1.25rem',
			fontWeight: 500,
			color: '#1c3139',
		},
		h5: {
			fontSize: '1.125rem',
			fontWeight: 500,
			color: '#1c3139',
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 500,
			color: '#1c3139',
		},
		body1: {
			fontSize: '1rem',
			color: '#1c3139',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
	},
});

export default theme;
