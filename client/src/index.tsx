import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import App from './components/App';
import i18n from "./i18n/i18n"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);