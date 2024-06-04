import Footer from "./Footer"
import Navbar from "./navbar";
import Home from "./Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Router, Routes } from 'react-router-dom';
import { Route } from "react-router-dom";
import React from "react";
import AboutPage from "./AboutPage/AboutPage";
import Movies from "./Movies";
import LoggingMovies from "./LoggingMovies";
import Registration from "./Registration";
import LoggingIn from "./LoggingIn";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Navbar />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/loggingMovie" element={<PrivateRoute />}>
            <Route path="/loggingMovie" element={<LoggingMovies />} />
            </Route>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<LoggingIn />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;