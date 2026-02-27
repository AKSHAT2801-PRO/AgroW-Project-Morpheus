import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Sprout, Tractor, ArrowLeft, CheckCircle2, Leaf } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Check local storage for existing role
    const [selectedRole, setSelectedRole] = useState(localStorage.getItem('userRole') || null);

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

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        localStorage.setItem('userRole', role);
    };

    const handleBackToRoles = () => {
        setSelectedRole(null);
        localStorage.removeItem('userRole');
    };

    const toggleAuthMode = () => {
        const newMode = authMode === 'sign-in' ? 'sign-up' : 'sign-in';
        setAuthMode(newMode);
        navigate(`/auth?mode=${newMode}`, { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob z-0"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000 z-0"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000 z-0"></div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">

                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-4 shadow-lg">
                        <Leaf className="text-white" size={24} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Welcome to AgroW</h1>
                    <p className="text-slate-600">
                        {!selectedRole
                            ? 'Select how you want to use the platform to continue.'
                            : 'Complete your authentication to get started.'}
                    </p>
                </div>

                {/* Phase 1: Role Selection */}
                {!selectedRole ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">

                        {/* Farmer Card */}
                        <div
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col border border-slate-100 cursor-pointer"
                            onClick={() => handleRoleSelect('farmer')}
                        >
                            <div className="h-4 w-full bg-gradient-to-r from-[#2E7D32] to-[#43A047]"></div>
                            <div className="p-8 flex flex-col flex-grow items-center text-center">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                                    <Sprout size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Farmer</h3>
                                <p className="text-slate-500 mb-6 text-sm">
                                    Join communities, ask experts, and find nearby services for your farm.
                                </p>

                                <ul className="text-left space-y-3 mb-8 w-full text-sm text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Ask questions & get expert answers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Find local tractors & labor</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Learn about government schemes</span>
                                    </li>
                                </ul>

                                <button className="mt-auto w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                                    Continue as Farmer
                                </button>
                            </div>
                        </div>

                        {/* Service Provider Card */}
                        <div
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col border border-slate-100 cursor-pointer"
                            onClick={() => handleRoleSelect('provider')}
                        >
                            <div className="h-4 w-full bg-gradient-to-r from-[#E65100] to-[#FF6D00]"></div>
                            <div className="p-8 flex flex-col flex-grow items-center text-center">
                                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4">
                                    <Tractor size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Service Provider</h3>
                                <p className="text-slate-500 mb-6 text-sm">
                                    Offer your machinery, tools, or expert services to local farmers.
                                </p>

                                <ul className="text-left space-y-3 mb-8 w-full text-sm text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                        <span>List your tractors and equipment</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                        <span>Get booking requests directly</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                        <span>Build your reputation locally</span>
                                    </li>
                                </ul>

                                <button className="mt-auto w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors">
                                    Continue as Service Provider
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                    /* Phase 2: Clerk Auth */
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center">

                        <button
                            onClick={handleBackToRoles}
                            className="self-start flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
                        >
                            <ArrowLeft size={16} />
                            Back to role selection
                        </button>

                        <div className="w-full">
                            {authMode === 'sign-in' ? (
                                <SignIn
                                    routing="hash"
                                    fallbackRedirectUrl="/feed"
                                    signUpUrl="/auth?mode=sign-up"
                                />
                            ) : (
                                <SignUp
                                    routing="hash"
                                    fallbackRedirectUrl="/onboarding"
                                    signInUrl="/auth?mode=sign-in"
                                />
                            )}
                        </div>

                        {/* Toggle link fallback if Clerk doesn't render its own footer properly in hash mode, 
                            but Clerk usually handles the toggle if we provide signUpUrl/signInUrl. 
                            We provide a manual toggle just in case the user needs it styled. */}
                        <div className="mt-6 text-sm text-slate-500 text-center border-t border-slate-100 pt-4 w-full">
                            {authMode === 'sign-in' ? (
                                <p>Don't have an account? <button onClick={toggleAuthMode} className="text-green-600 font-semibold hover:underline">Sign Up</button></p>
                            ) : (
                                <p>Already have an account? <button onClick={toggleAuthMode} className="text-green-600 font-semibold hover:underline">Sign In</button></p>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
