import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { AppProvider } from "./store/Context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <div className="font-body min-h-screen" >

        <Router>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>

        
      </div>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);