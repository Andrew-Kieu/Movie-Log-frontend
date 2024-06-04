import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './Home/Home.jsx'
import AboutPage from './AboutPage/AboutPage.jsx'
import { Route } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
    
    <App /> 
    </AuthProvider>
  </React.StrictMode>,
)
