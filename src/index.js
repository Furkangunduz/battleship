import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"

import './style/home.css';
import './style/board.css';
import "./style/battle.css"
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ShipProvider } from "./ShipContext"
import { SocketProvider } from "./SocketContext"
import { UserProvider } from './UserContext';

import { ToastContainer } from 'react-toastify';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>

    <ShipProvider>
      <BrowserRouter>
        <SocketProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </SocketProvider>
      </BrowserRouter>
    </ShipProvider>
  </UserProvider>
);

