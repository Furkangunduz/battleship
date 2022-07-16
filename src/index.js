import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { ShipProvider } from "./ShipContext"
import { ToastContainer } from 'react-toastify';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShipProvider>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.StrictMode>
  </ShipProvider>
);

