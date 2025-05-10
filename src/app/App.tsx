import { withProviders } from './providers';
import { TestComponent } from './TestComponent';

export const App = () => {
	return withProviders(<TestComponent />);
};
