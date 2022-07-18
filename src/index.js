import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"

import './style/home.css';
import './style/board.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ShipProvider } from "./ShipContext"
import { ToastContainer } from 'react-toastify';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShipProvider>
    <BrowserRouter>
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
    </BrowserRouter>
  </ShipProvider>
);

