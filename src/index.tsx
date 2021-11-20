import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AppProvider } from "./store/Context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <div className="font-body" >
        <App />
      </div>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);