// Mock API service for local dev/build

export const api = {
    getAllCommunities: async () => {
        return [
            { _id: 'c1', communityName: 'Maharashtra Cotton Farmers', memberCount: 1200 },
            { _id: 'c2', communityName: 'Pune Dairy Tech', memberCount: 850 },
            { _id: 'c3', communityName: 'Nashik Grape Growers', memberCount: 3400 },
            { _id: 'c4', communityName: 'Organic Farming Hub', memberCount: 5600 },
            { _id: 'c5', communityName: 'Tractor Owners Association', memberCount: 920 }
        ];
    },
    createFarmer: async (payload) => {
        console.log('Mock createFarmer', payload);
        return { success: true };
    },
    createServiceProvider: async (payload) => {
        console.log('Mock createServiceProvider', payload);
        return { success: true };
    },
    addMemberToCommunity: async (communityId, role, userId) => {
        console.log('Mock addMemberToCommunity', communityId, role, userId);
        return { success: true };
    },
    createContent: async (payload) => {
        console.log('Mock createContent', payload);
        return { success: true };
    },
    shareContent: async (contentId, communityId) => {
        console.log('Mock shareContent', contentId, communityId);
        return { success: true };
    }
};
