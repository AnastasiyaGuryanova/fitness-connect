import { type ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';

export const withProviders = (children: ReactNode) => {
	return <StoreProvider>{children}</StoreProvider>;
};
