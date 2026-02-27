import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <h1>Home Page</h1>
                <p>Landing page content will go here.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
