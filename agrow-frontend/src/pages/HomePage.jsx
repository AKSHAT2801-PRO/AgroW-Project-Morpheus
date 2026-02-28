import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import WhyAgroW from '../components/landing/WhyAgroW';
import Footer from '../components/landing/Footer';

const HomePage = () => {
    return (
        <div className="w-full flex flex-col font-sans bg-slate-50 overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-16"> {/* Add top padding for fixed navbar */}
                <HeroSection />
                <FeaturesGrid />
                <WhyAgroW />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
