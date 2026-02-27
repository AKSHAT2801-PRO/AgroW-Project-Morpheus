import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';

// Dummy publishable key for UI development
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_ZHVtbXlrZXk=";

function App() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    {/* Mock Feed Route to test redirects */}
                    <Route path="/feed" element={<div className="p-8 text-2xl font-bold text-green-700">Welcome to AgroW Feed!</div>} />
                </Routes>
            </Router>
        </ClerkProvider>
    )
}

export default App;
