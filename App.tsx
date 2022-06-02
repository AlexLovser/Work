import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainScreen from './main_screen';


export default function App() {
	return (
		<Provider store={store}>
			<MainScreen />
		</Provider>
	);
}

 