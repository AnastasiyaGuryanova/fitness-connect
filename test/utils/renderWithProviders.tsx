import React, { type PropsWithChildren } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { configureStore, type Reducer } from '@reduxjs/toolkit';
import { type RootState } from 'app/store';
import userReducer from 'entities/user/model/userSlice';

const defaultReducers: Record<string, Reducer<any, any, any>> = {
	user: userReducer,
};

type ReducerMap = Record<string, Reducer>;

interface RenderWithProvidersOptions extends RenderOptions {
	preloadedState?: Partial<RootState>;
	reducers?: ReducerMap;
	routerProps?: MemoryRouterProps;
}

export const renderWithProviders = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		reducers = {},
		routerProps = { initialEntries: ['/'] },
		...renderOptions
	}: RenderWithProvidersOptions = {},
) => {
	const store = configureStore({
		reducer: {
			...defaultReducers,
			...reducers,
		},
		preloadedState,
	});

	const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
		<Provider store={store}>
			<MemoryRouter {...routerProps}>{children}</MemoryRouter>
		</Provider>
	);

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
