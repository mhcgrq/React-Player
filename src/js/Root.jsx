import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const rootEl = document.getElementById('app');

const render = () => ReactDOM.render((
    <AppContainer>
        <App />
    </AppContainer>
), rootEl);
render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}
