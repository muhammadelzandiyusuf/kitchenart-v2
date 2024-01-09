import { React, ReactDOM, Provider, BrowserRouter, Sentry, Integrations } from 'libraries';
import { store } from 'modules'
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'assets/scss/global.scss';
import 'assets/scss/layout.scss';
import 'assets/scss/responsive.scss';

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_ENV,
    release: "ka-web-ecommerce@" + process.env.npm_package_version,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();