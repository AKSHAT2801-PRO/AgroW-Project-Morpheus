import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../services/api';
import { ALL_COMMUNITIES, JOINED_COMMUNITIES } from '../data/mockData';

const UserDataContext = createContext(null);

export const useUserData = () => {
    const ctx = useContext(UserDataContext);
    if (!ctx) throw new Error('useUserData must be used within UserDataProvider');
    return ctx;
};

export const UserDataProvider = ({ children }) => {
    const { user, isSignedIn } = useUser();
    const [userData, setUserData] = useState(null);
    // Pre-seed with mock data so sidebar shows immediately
    const [joinedCommunities, setJoinedCommunities] = useState(JOINED_COMMUNITIES);
    const [allCommunities, setAllCommunities] = useState(ALL_COMMUNITIES);
    const [isLoading, setIsLoading] = useState(false);

    const refreshUser = useCallback(async () => {
        try {
            const email = user?.primaryEmailAddress?.emailAddress || '';
            const role = localStorage.getItem('userRole') || 'farmer';
            if (!email || !isSignedIn) { setIsLoading(false); return; }

            // Try fetching real user profile (non-blocking)
            try {
                const data = await api.getUser(email, role);
                setUserData(data);
            } catch (e) {
                console.warn('UserDataContext: getUser failed, using mock data', e);
            }

            // Try fetching real joined communities from backend
            let realJoinedIds = [];
            try {
                const ids = await api.getUserCommunity(email, role);
                console.log('[UserDataContext] getUserCommunity response:', ids);
                realJoinedIds = Array.isArray(ids) ? ids : [];
            } catch (e) {
                console.warn('UserDataContext: getUserCommunity failed, keeping mock communities', e);
            }

            // If backend returned real joined communities, resolve them
            if (realJoinedIds.length > 0) {
                try {
                    const allRes = await api.getAllCommunities();
                    const allComms = allRes.communities || allRes.data || allRes;
                    if (Array.isArray(allComms) && allComms.length > 0) {
                        setAllCommunities(allComms.map(c => ({
                            id: c._id || c.id,
                            name: c.name || c.communityName || '',
                            members: c.members ? c.members.length : (c.memberCount || 0),
                            isJoined: realJoinedIds.includes(c._id || c.id),
                            desc: c.description || '',
                            posts: 0,
                            tags: c.searchTags || [],
                            rules: c.rules || '',
                            about: c.description || '',
                        })));
                        const joined = allComms
                            .filter(c => realJoinedIds.includes(c._id || c.id))
                            .map(c => ({
                                id: c._id || c.id,
                                name: c.name || c.communityName || '',
                                members: c.members ? c.members.length : (c.memberCount || 0),
                            }));
                        if (joined.length > 0) {
                            setJoinedCommunities(joined);
                        }
                    }
                } catch (e) {
                    console.warn('UserDataContext: getAllCommunities failed, keeping mock data', e);
                }
            }
        } catch (err) {
            console.error('UserDataContext: refreshUser failed', err);
        } finally {
            setIsLoading(false);
        }
    }, [user, isSignedIn]);

    useEffect(() => {
        if (isSignedIn && user) refreshUser();
    }, [isSignedIn, user, refreshUser]);

    useEffect(() => {
        const handler = () => refreshUser();
        window.addEventListener('communityMembershipChanged', handler);
        window.addEventListener('userDataChanged', handler);
        return () => {
            window.removeEventListener('communityMembershipChanged', handler);
            window.removeEventListener('userDataChanged', handler);
        };
    }, [refreshUser]);

    return (
        <UserDataContext.Provider value={{
            userData,
            joinedCommunities,
            allCommunities,
            isLoading,
            refreshUser,
            setJoinedCommunities,
        }}>
            {children}
        </UserDataContext.Provider>
    );
};
