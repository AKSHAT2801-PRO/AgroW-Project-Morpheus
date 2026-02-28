import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Check user role from localStorage, used for theming
    const userRole = localStorage.getItem('userRole') || 'farmer';
    const isProvider = userRole === 'provider';

    // authMode from URL, default to sign-up
    const initialMode = searchParams.get('mode') === 'sign-in' ? 'sign-in' : 'sign-up';
    const [authMode, setAuthMode] = useState(initialMode);

    // Sync state with URL changes
    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'sign-in' || mode === 'sign-up') {
            setAuthMode(mode);
        }
    }, [searchParams]);

    const handleBackToHome = () => {
        // If user wants to change role, go back to hero page
        if (authMode === 'sign-up') {
            localStorage.removeItem('userRole');
        }
        navigate('/');
    };

    const toggleAuthMode = () => {
        const newMode = authMode === 'sign-in' ? 'sign-up' : 'sign-in';
        setAuthMode(newMode);
        navigate(`/auth?mode=${newMode}`, { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4">

            {/* Animated Background Blobs - Role Specific Themes */}
            {isProvider ? (
                // Provider Theme Blobs (#ff8300 orange hues)
                <>
                    <div className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob z-0" style={{ backgroundColor: '#ff8300' }}></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000 z-0"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000 z-0" style={{ backgroundColor: '#e65100' }}></div>
                </>
            ) : (
                // Default / Farmer Theme Blobs
                <>
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob z-0"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000 z-0"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000 z-0"></div>
                </>
            )}

            <div className="relative z-10 w-full max-w-md flex flex-col items-center">

                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-lg text-white"
                        style={{ backgroundColor: isProvider ? '#ff8300' : '#16a34a' }}
                    >
                        <Leaf size={24} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                        {authMode === 'sign-in' ? 'Welcome Back' : 'Create Your Account'}
                    </h1>
                    <p className="text-slate-600">
                        {authMode === 'sign-in'
                            ? 'Sign in to access your feeds and communities.'
                            : 'Complete your registration to get started.'}
                    </p>
                </div>

                {/* Clerk Auth Form */}
                <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center">

                    <button
                        onClick={handleBackToHome}
                        className="self-start flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
                    >
                        <ArrowLeft size={16} />
                        {authMode === 'sign-up' ? 'Back to role selection' : 'Back to home'}
                    </button>

                    <div className="w-full">
                        {authMode === 'sign-in' ? (
                            <SignIn
                                routing="hash"
                                fallbackRedirectUrl="/feed"
                                signUpUrl="/auth?mode=sign-up"
                                appearance={{
                                    elements: {
                                        formButtonPrimary: isProvider
                                            ? { backgroundColor: '#ff8300', '&:hover': { backgroundColor: '#e65100' } }
                                            : { backgroundColor: '#16a34a', '&:hover': { backgroundColor: '#15803d' } }
                                    }
                                }}
                            />
                        ) : (
                            <SignUp
                                routing="hash"
                                fallbackRedirectUrl="/onboarding"
                                signInUrl="/auth?mode=sign-in"
                                appearance={{
                                    elements: {
                                        formButtonPrimary: isProvider
                                            ? { backgroundColor: '#ff8300', '&:hover': { backgroundColor: '#e65100' } }
                                            : { backgroundColor: '#16a34a', '&:hover': { backgroundColor: '#15803d' } }
                                    }
                                }}
                            />
                        )}
                    </div>

                    {/* Toggle link */}
                    <div className="mt-6 text-sm text-slate-500 text-center border-t border-slate-100 pt-4 w-full">
                        {authMode === 'sign-in' ? (
                            <p>Don't have an account? <button onClick={toggleAuthMode} className="font-semibold hover:underline" style={{ color: isProvider ? '#ff8300' : '#16a34a' }}>Sign Up</button></p>
                        ) : (
                            <p>Already have an account? <button onClick={toggleAuthMode} className="font-semibold hover:underline" style={{ color: isProvider ? '#ff8300' : '#16a34a' }}>Sign In</button></p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthPage;
