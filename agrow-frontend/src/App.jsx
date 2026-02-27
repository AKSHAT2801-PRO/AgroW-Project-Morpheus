import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import FeedPage from './pages/FeedPage';
import DashboardLayout from './components/Layout/DashboardLayout';

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

                    {/* Authenticated Routes with Dashboard Layout */}
                    <Route element={<DashboardLayout />}>
                        <Route path="/feed" element={<FeedPage />} />
                    </Route>
                </Routes>
            </Router>
        </ClerkProvider>
    )
}

export default App;
