import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { ChevronRight, ArrowLeft, Check, Leaf } from 'lucide-react';
// import { State, District } from 'india-state-district'; // Will handle if actual data needed, providing static fallback

const INTERESTS_LIST = [
    "Organic Farming", "Crop Disease", "Government Schemes", "Market Prices",
    "Modern Farming", "Water Management", "Soil Testing", "Seed Selection",
    "Livestock", "Weather Updates", "Pest Control", "Tractor Trading"
];

const MOCK_COMMUNITIES = [
    { id: 'c1', name: 'Maharashtra Cotton Farmers', members: 1200 },
    { id: 'c2', name: 'Pune Dairy Tech', members: 850 },
    { id: 'c3', name: 'Nashik Grape Growers', members: 3400 },
    { id: 'c4', name: 'Organic Farming Hub', members: 5600 },
    { id: 'c5', name: 'Tractor Owners Association', members: 920 }
];

const IndianStates = [
    "Maharashtra", "Gujarat", "Karnataka", "Punjab", "Haryana",
    "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"
];

const StateDistricts = {
    "Maharashtra": ["Pune", "Nashik", "Mumbai", "Solapur", "Latur", "Nagpur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
};

const OnboardingPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // Auth context mock fallback
    const mockEmail = user?.primaryEmailAddress?.emailAddress || "user@example.com";
    const userRole = localStorage.getItem('userRole') || 'farmer';

    const [step, setStep] = useState(1);

    // Step 1: Profile
    const [profile, setProfile] = useState({ username: '', firstName: '', lastName: '', gender: '' });

    // Step 2: Location
    const [location, setLocation] = useState({ state: '', district: '', taluka: '', village: '' });
    const availableDistricts = location.state ? (StateDistricts[location.state] || ["Other District"]) : [];

    // Step 3: Role Details (Crops or Services)
    const [roleDetails, setRoleDetails] = useState('');

    // Step 4: Interests
    const [interests, setInterests] = useState([]);

    // Step 5: Communities
    const [communities, setCommunities] = useState([]);

    // UI states
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate current step
    const validateStep = () => {
        setError('');
        if (step === 1) {
            if (!profile.username || !profile.firstName || !profile.lastName || !profile.gender) {
                setError("Please fill in all required profile fields.");
                return false;
            }
        }
        if (step === 2) {
            if (!location.state || !location.district || !location.taluka || !location.village) {
                setError("Please fill in all location details.");
                return false;
            }
        }
        if (step === 3) {
            if (!roleDetails.trim()) {
                setError(`Please list your ${userRole === 'farmer' ? 'crops' : 'services'}.`);
                return false;
            }
        }
        if (step === 5) {
            if (communities.length < 3) {
                setError("Please select at least 3 communities to join.");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(prev => Math.min(prev + 1, 5));
        }
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1));
        setError('');
    };

    const toggleInterest = (interest) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter(i => i !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    const toggleCommunity = (id) => {
        if (communities.includes(id)) {
            setCommunities(communities.filter(c => c !== id));
        } else {
            setCommunities([...communities, id]);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsSubmitting(true);
        // Mock API call simulation
        setTimeout(() => {
            setIsSubmitting(false);
            // Show toast visually (could use Sonner or similar in real app)
            alert("Account setup complete! Welcome to AgroW.");
            navigate('/feed');
        }, 1500);
    };

    // Calculate Progress (1 to 5)
    const progressPercent = (step / 5) * 100;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">

            {/* Left Panel - Illustration & Branding */}
            <div className="hidden md:flex md:w-1/3 lg:w-2/5 bg-gradient-to-br from-green-600 to-green-800 text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-16">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center">
                            <span className="text-green-600 font-bold text-2xl">A</span>
                        </div>
                        <span className="text-3xl font-extrabold tracking-tight">AgroW</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                        Grow your network, <br />
                        <span className="text-green-300">grow your farm.</span>
                    </h1>
                    <p className="text-green-50 text-lg max-w-sm">
                        Complete your profile to connect with thousands of local farmers and experts in your region.
                    </p>
                </div>

                <div className="relative z-10 mt-12 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-green-700"></div>
                            <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-green-700"></div>
                            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-green-700"></div>
                        </div>
                        <span className="text-sm font-semibold">Join 50k+ Members</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Wizard content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-xl mx-auto px-6 py-12 lg:px-12 w-full min-h-full flex flex-col">

                    {/* Progress Bar */}
                    <div className="w-full mb-8">
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                            <span>Step {step} of 5</span>
                            <span>{Math.round(progressPercent)}% completed</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Error Box */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 flex items-start gap-2">
                            <span className="mt-0.5">⚠️</span> {error}
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="flex-grow">

                        {/* STEP 1: Basic Profile */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Basic Profile</h2>
                                    <p className="text-slate-500 text-sm">Tell us a bit about yourself.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-slate-400">(from login)</span></label>
                                        <input
                                            type="email"
                                            value={mockEmail}
                                            disabled
                                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed form-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Username *</label>
                                        <input
                                            type="text"
                                            value={profile.username}
                                            onChange={e => setProfile({ ...profile, username: e.target.value })}
                                            placeholder="e.g. kisan_ramesh"
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                                            <input
                                                type="text"
                                                value={profile.firstName}
                                                onChange={e => setProfile({ ...profile, firstName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                                            <input
                                                type="text"
                                                value={profile.lastName}
                                                onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                                        <select
                                            value={profile.gender}
                                            onChange={e => setProfile({ ...profile, gender: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Location */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Your Location</h2>
                                    <p className="text-slate-500 text-sm">Where is your farm or business located?</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
                                        <select
                                            value={location.state}
                                            onChange={e => setLocation({ ...location, state: e.target.value, district: '' })}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select State</option>
                                            {IndianStates.map(st => <option key={st} value={st}>{st}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">District *</label>
                                        <select
                                            value={location.district}
                                            onChange={e => setLocation({ ...location, district: e.target.value })}
                                            disabled={!location.state}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all appearance-none disabled:bg-slate-50 disabled:text-slate-400"
                                        >
                                            <option value="">Select District</option>
                                            {availableDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Taluka / Tehsil *</label>
                                        <input
                                            type="text"
                                            value={location.taluka}
                                            onChange={e => setLocation({ ...location, taluka: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Village *</label>
                                        <input
                                            type="text"
                                            value={location.village}
                                            onChange={e => setLocation({ ...location, village: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Role Details */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                                        {userRole === 'farmer' ? "Farm Details" : "Service Details"}
                                    </h2>
                                    <p className="text-slate-500 text-sm">
                                        {userRole === 'farmer'
                                            ? "What crops are you currently growing?"
                                            : "What tractor or services do you offer?"}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        {userRole === 'farmer' ? "Crops Grown (comma-separated) *" : "Services Provided (comma-separated) *"}
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={roleDetails}
                                        onChange={e => setRoleDetails(e.target.value)}
                                        placeholder={userRole === 'farmer' ? "e.g. Wheat, Soyabean, Cotton, Tomatoes" : "e.g. Tractor 40HP, Rotavator, Spraying Machine, Labor"}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div className="bg-green-50 p-4 border border-green-100 rounded-xl flex items-start gap-3">
                                    <Leaf className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                                    <p className="text-sm text-green-800">
                                        This helps us match you with relevant communities and experts who specialize in your specific fields.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Interests */}
                        {step === 4 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Your Interests</h2>
                                    <p className="text-slate-500 text-sm">Select topics you want to learn more about.</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {INTERESTS_LIST.map(interest => {
                                        const isSelected = interests.includes(interest);
                                        return (
                                            <button
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                                                    ? 'bg-green-100 text-green-800 border-green-300 shadow-inner'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-green-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {interest} {isSelected && '✓'}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* STEP 5: Communities */}
                        {step === 5 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Join Communities</h2>
                                    <p className="text-slate-500 text-sm">Select at least 3 local groups to get started.</p>
                                    <p className="text-xs text-slate-400 mt-1 font-bold">SELECTED: {communities.length}/3 MINIMUM</p>
                                </div>

                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 pb-4">
                                    {MOCK_COMMUNITIES.map(comm => {
                                        const isSelected = communities.includes(comm.id);
                                        return (
                                            <div
                                                key={comm.id}
                                                onClick={() => toggleCommunity(comm.id)}
                                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${isSelected
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-slate-100 bg-white hover:border-green-200 hover:shadow-sm'
                                                    }`}
                                            >
                                                <div>
                                                    <h4 className="font-bold text-slate-800">{comm.name}</h4>
                                                    <p className="text-xs text-slate-500 mt-1">{comm.members.toLocaleString()} members</p>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-300'
                                                    }`}>
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-slate-500 font-medium hover:text-slate-800 transition-colors px-4 py-2"
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {step < 5 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-sm"
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex items-center gap-2 text-white font-semibold rounded-xl px-8 py-3 transition-all shadow-md ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                    }`}
                            >
                                {isSubmitting ? 'Finishing...' : 'Complete Setup'}
                                {!isSubmitting && <Check size={18} />}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
