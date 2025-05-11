import { type ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

export const withProviders = (children: ReactNode) => {
	return (
		<StoreProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</StoreProvider>
	);
};
