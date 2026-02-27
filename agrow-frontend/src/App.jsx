import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import FeedPage from './pages/FeedPage';
import DashboardLayout from './components/Layout/DashboardLayout';
import CommunityPage from './pages/CommunityPage';
import CommunitiesListPage from './pages/CommunitiesListPage';
import CreateCommunityPage from './pages/CreateCommunityPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ServicePage from './pages/ServicePage';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage';
import NotificationsPage from './pages/NotificationsPage';

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
                        <Route path="/c/:communityId" element={<CommunityPage />} />
                        <Route path="/c/communities" element={<CommunitiesListPage />} />
                        <Route path="/communities" element={<CommunitiesListPage />} /> {/* Fallback alias */}
                        <Route path="/create-community" element={<CreateCommunityPage />} />

                        {/* New Core Pages */}
                        <Route path="/submit" element={<CreatePostPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<SettingsPage />} />

                        {/* Explore & Info Pages */}
                        <Route path="/services" element={<ServicePage />} />
                        <Route path="/schemes" element={<GovernmentSchemesPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                    </Route>
                </Routes>
            </Router>
        </ClerkProvider>
    )
}

export default App;
