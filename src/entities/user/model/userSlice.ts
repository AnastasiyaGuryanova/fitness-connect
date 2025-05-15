import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
	id: string;
	name: string;
	email: string;
	age?: number;
	weight?: number;
	height?: number;
	waistCircumference?: number;
	chestCircumference?: number;
	hipCircumference?: number;
	armCircumference?: number;
	legCircumference?: number;
	goal?: string;
	restrictions?: string;
	trainingExperience?: string;
	diet?: string;
	photos?: string;
}

export interface UserState {
	user: User | null;
	isAuthenticated: boolean;
}

const initialState: UserState = {
	user: null,
	isAuthenticated: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
