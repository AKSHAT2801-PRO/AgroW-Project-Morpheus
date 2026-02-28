import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../services/api';

const UserDataContext = createContext(null);

export const useUserData = () => {
    const ctx = useContext(UserDataContext);
    if (!ctx) throw new Error('useUserData must be used within UserDataProvider');
    return ctx;
};

export const UserDataProvider = ({ children }) => {
    const { user, isSignedIn } = useUser();
    const [userData, setUserData] = useState(null);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [allCommunities, setAllCommunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const email = user?.primaryEmailAddress?.emailAddress || '';
            const role = localStorage.getItem('userRole') || 'farmer';
            if (!email || !isSignedIn) { setIsLoading(false); return; }

            // Fetch user profile
            const data = await api.getUser(email, role);
            setUserData(data);

            // Fetch all communities and resolve joined ones
            const allRes = await api.getAllCommunities();
            const allComms = allRes.communities || allRes.data || allRes;
            if (Array.isArray(allComms)) {
                setAllCommunities(allComms.map(c => ({
                    id: c._id || c.id,
                    name: c.name || c.communityName || '',
                    members: c.members ? c.members.length : (c.memberCount || 0)
                })));

                const joinedIds = data.communityJoined || [];
                if (joinedIds.length > 0) {
                    const joined = allComms
                        .filter(c => joinedIds.includes(c._id || c.id))
                        .map(c => ({
                            id: c._id || c.id,
                            name: c.name || c.communityName || '',
                            members: c.members ? c.members.length : (c.memberCount || 0)
                        }));
                    setJoinedCommunities(joined);
                } else {
                    setJoinedCommunities([]);
                }
            }
        } catch (err) {
            console.error('UserDataContext: Failed to fetch user data', err);
        } finally {
            setIsLoading(false);
        }
    }, [user, isSignedIn]);

    // Initial fetch
    useEffect(() => {
        if (isSignedIn && user) {
            refreshUser();
        }
    }, [isSignedIn, user, refreshUser]);

    // Listen for community membership changes
    useEffect(() => {
        const handler = () => refreshUser();
        window.addEventListener('communityMembershipChanged', handler);
        return () => window.removeEventListener('communityMembershipChanged', handler);
    }, [refreshUser]);

    // Listen for a generic userDataChanged event (dispatched after any API action)
    useEffect(() => {
        const handler = () => refreshUser();
        window.addEventListener('userDataChanged', handler);
        return () => window.removeEventListener('userDataChanged', handler);
    }, [refreshUser]);

    return (
        <UserDataContext.Provider value={{
            userData,
            joinedCommunities,
            allCommunities,
            isLoading,
            refreshUser
        }}>
            {children}
        </UserDataContext.Provider>
    );
};
