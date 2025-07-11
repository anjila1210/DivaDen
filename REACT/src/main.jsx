import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import {CartProvider} from './Frontend/Cart.jsx'
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
        <App />
    </CartProvider>
    </BrowserRouter>
    </React.StrictMode>
);
