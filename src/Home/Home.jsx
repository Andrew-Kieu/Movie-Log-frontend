import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function HeroSection() {
    return (
        <div className="hero-section d-flex justify-content-center align-items-center text-center">
            <div>
                <h1>Welcome to Our Movie Database</h1>
                <p>Discover and explore an extensive collection of movies from all genres.</p>
                <a href="/movies" className="btn btn-primary">Browse Movies</a>
            </div>
        </div>
        
    );
}

export default HeroSection;
