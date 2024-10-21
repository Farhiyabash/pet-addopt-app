import React, { useState } from 'react';
import './LandingPage.css'; // Custom CSS for animations and styles
import 'bootstrap/dist/css/bootstrap.min.css';
import pet1 from '../assets/pet1.jpg';
import pet2 from '../assets/pet2.jpg';
import pet3 from '../assets/pet3.jpg';
import pet4 from '../assets/pet4.jpg';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import heroImage from '../assets/hero.jpg'; // Add your hero image
import { Modal, Button } from 'react-bootstrap';

const LandingPage = () => {
    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAdoptNow = () => {
        window.location.href = '/signup';
    };

    const handleAdoptMe = () => {
        window.location.href = '/signup';
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log('Subscribed with email:', email);
    };

    return (
        <div className="landing-page">
            {/* 3D Welcome Pop-up */}
            <Modal show={showPopup} onHide={handleClosePopup} centered>
                <div className="popup-card bg-white shadow-lg p-4 rounded text-center animate__animated animate__fadeInUp">
                    <h2 className="text-pink">Welcome to Pawsitive Connection!</h2>
                    <p className="popup-text">
                        🎉 You're on the best platform for pets! 🐾
                    </p>
                    <Button className="btn btn-pink" onClick={handleClosePopup}>
                        Get Started
                    </Button>
                </div>
            </Modal>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
                <div className="container">
                    <a className="navbar-brand" href="/" style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#ff69b4' }}>
                        Pawsitive Connection
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#about">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#pets">Our Pets</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#partners">Partners</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#newsletter">Subscribe</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-pink text-white" href="/signup">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-outline-pink ms-2" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section text-center bg-pink-gradient">
                <img src={heroImage} alt="Hero" className="hero-image" />
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="animated-text display-4 text-white">Find Your New Best Friend</h1>
                        <p className="animated-subtext text-white">Adopt the perfect companion today!</p>
                        <button onClick={handleAdoptNow} className="btn btn-white btn-lg mt-3 shadow btn-pink">Adopt Now</button>
                    </div>
                </div>
            </header>

            {/* About Us Section */}
            <section id="about" className="about-section text-center py-5">
                <div className="container">
                    <h2 className="section-title text-pink">About Us</h2>
                    <p className="section-subtitle">
                        We are dedicated to helping pets find loving homes. Our mission is to provide a safe haven for animals and connect them with families.
                    </p>
                </div>
            </section>

            {/* Pets Grid Section */}
            <section id="pets" className="pets-section py-5 bg-light">
                <div className="container">
                    <h2 className="section-title text-center text-pink">Our Pets</h2>
                    <div className="row">
                        {[
                            { name: 'Bella', img: pet1 },
                            { name: 'Charlie', img: pet2 },
                            { name: 'Luna', img: pet3 },
                            { name: 'Max', img: pet4 }
                        ].map((pet, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card shadow-lg hover-zoom border-pink-3d">
                                    <img src={pet.img} loading="lazy" alt={pet.name} className="card-img-top pet-image" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-pink">{pet.name}</h5>
                                        <p className="card-text">Friendly, playful, and ready to find a home!</p>
                                        <button onClick={handleAdoptMe} className="btn btn-pink text-white">Adopt Me</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services-section py-5">
                <div className="container">
                    <h2 className="section-title text-center text-pink">Our Services</h2>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="fas fa-heart fa-3x text-pink"></i>
                            <h5 className="mt-3">Pet Adoption</h5>
                            <p>We help match pets with loving families.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-paw fa-3x text-pink"></i>
                            <h5 className="mt-3">Veterinary Care</h5>
                            <p>Ensuring the health of your new companion.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-bone fa-3x text-pink"></i>
                            <h5 className="mt-3">Pet Supplies</h5>
                            <p>Everything you need for your pet’s happiness.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section id="partners" className="partners-section py-5 bg-light">
                <div className="container text-center">
                    <h2 className="section-title text-pink">Our Partners</h2>
                    <div className="logos-container d-flex justify-content-around align-items-center">
                        {[logo1, logo2, logo3, logo4].map((logo, index) => (
                            <img key={index} src={logo} alt={`Company Logo ${index + 1}`} className="company-logo shadow-lg" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section id="newsletter" className="newsletter-section text-center py-5">
                <div className="container">
                    <h2 className="section-title text-pink">Stay Updated</h2>
                    <p>Subscribe to our newsletter for the latest updates and pet adoption news!</p>
                    <form className="newsletter-form d-flex justify-content-center" onSubmit={handleSubscribe}>
                        <input type="email" name="email" className="form-control rounded-pill shadow-lg" placeholder="Enter your email" required />
                        <button type="submit" className="btn btn-pink text-white ml-2 shadow">Subscribe</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-section text-white py-5 bg-pink-gradient">
                <div className="container text-center">
                    <h2 className="footer-title">Connect with Us</h2>
                    <ul className="social-icons d-flex justify-content-center my-3">
                        <li><a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#" className="text-white"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#" className="text-white"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#" className="text-white"><i className="fab fa-linkedin"></i></a></li>
                    </ul>
                    <p>&copy; 2024 Pawsitive Connection. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
