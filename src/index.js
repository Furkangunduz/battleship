import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ShipProvider } from "./ShipContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShipProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ShipProvider>
);

