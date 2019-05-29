import React from 'react';
import ReactDOM from 'react-dom';
import './common/css/common.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
registerServiceWorker();
