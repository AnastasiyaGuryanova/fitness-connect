import type { Config } from 'jest';

const config: Config = {
	rootDir: './',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.json',
			},
		],
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		// маппинг для алиасов
		'^app/(.*)$': '<rootDir>/src/app/$1',
		'^pages/(.*)$': '<rootDir>/src/pages/$1',
		'^widgets/(.*)$': '<rootDir>/src/widgets/$1',
		'^features/(.*)$': '<rootDir>/src/features/$1',
		'^entities/(.*)$': '<rootDir>/src/entities/$1',
		'^shared/(.*)$': '<rootDir>/src/shared/$1',
	},
};

export default config;
