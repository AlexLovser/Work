import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainScreen from './main_screen';

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<MainScreen />
		</Provider>
	);
}

 