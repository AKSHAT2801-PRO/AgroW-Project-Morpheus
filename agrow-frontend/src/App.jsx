import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.warn("Missing Clerk Publishable Key in environment variables");
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey || "pk_test_placeholder"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
