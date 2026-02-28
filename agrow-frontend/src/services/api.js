import axios from 'axios';

// Create a configured axios instance
// In dev, requests to /api/* are proxied by Vite to the ngrok backend (see vite.config.js)
// The proxy injects the ngrok-skip-browser-warning header server-side, avoiding CORS issues
const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

export const api = {
    // ------------------------------------------------------------------------
    // USER ROUTES
    // ------------------------------------------------------------------------

    // GET /api/user/get?email&&role
    getUser: async (email, role) => {
        const response = await apiClient.get(`/api/user/get?email=${encodeURIComponent(email)}&&role=${encodeURIComponent(role)}`);
        return response.data;
    },

    // POST /api/user/set
    setUser: async (payload) => {
        const response = await apiClient.post('/api/user/set', payload);
        return response.data;
    },

    // ------------------------------------------------------------------------
    // DASHBOARD / DISCOVERY ROUTES
    // ------------------------------------------------------------------------

    // GET /api/dashboard/get?query
    searchCommunities: async (query) => {
        const response = await apiClient.get(`/api/dashboard/get?query=${encodeURIComponent(query)}`);
        return response.data;
    },

    // GET /api/dashboard/getall
    getAllCommunities: async () => {
        const response = await apiClient.get('/api/dashboard/getall');
        return response.data;
    },

    // GET /api/dashboard/useCommunity?role&&email — returns array of joined community IDs
    getUserCommunity: async (email, role) => {
        const response = await apiClient.get(`/api/dashboard/useCommunity?role=${encodeURIComponent(role)}&&email=${encodeURIComponent(email)}`);
        return response.data;
    },

    // ------------------------------------------------------------------------
    // COMMUNITY MANAGEMENT ROUTES
    // ------------------------------------------------------------------------

    // POST /api/community/set?role&&email
    createCommunity: async (role, email, payload) => {
        const response = await apiClient.post(`/api/community/set?role=${encodeURIComponent(role)}&&email=${encodeURIComponent(email)}`, payload);
        return response.data;
    },

    // GET /api/community/join?email&&role&&communityId
    joinCommunity: async (email, role, communityId) => {
        const response = await apiClient.get(`/api/community/join?email=${encodeURIComponent(email)}&&role=${encodeURIComponent(role)}&&communityId=${encodeURIComponent(communityId)}`);
        return response.data;
    },

    // GET /api/community/leave?email&&role&&communityId
    leaveCommunity: async (email, role, communityId) => {
        const response = await apiClient.get(`/api/community/leave?email=${encodeURIComponent(email)}&&role=${encodeURIComponent(role)}&&communityId=${encodeURIComponent(communityId)}`);
        return response.data;
    },

    // GET /api/community/members?communityId
    getCommunityMembers: async (communityId) => {
        const response = await apiClient.get(`/api/community/members?communityId=${encodeURIComponent(communityId)}`);
        return response.data;
    },

    // GET /api/community/content?communityId
    getCommunityContent: async (communityId) => {
        const response = await apiClient.get(`/api/community/content?communityId=${encodeURIComponent(communityId)}`);
        return response.data;
    },

    // POST /api/community/createContent
    createContent: async (payload) => {
        const response = await apiClient.post('/api/community/createContent', payload);
        return response.data;
    },

    // ------------------------------------------------------------------------
    // CONTENT INTERACTION ROUTES
    // ------------------------------------------------------------------------

    // GET /api/content/like?email&&role&&contentId
    likeContent: async (email, role, contentId) => {
        const response = await apiClient.get(`/api/content/like?email=${encodeURIComponent(email)}&&role=${encodeURIComponent(role)}&&contentId=${encodeURIComponent(contentId)}`);
        return response.data;
    },

    // GET /api/content/removeLike?email&&role&&contentId
    removeLikeFromContent: async (email, role, contentId) => {
        const response = await apiClient.get(`/api/content/removeLike?email=${encodeURIComponent(email)}&&role=${encodeURIComponent(role)}&&contentId=${encodeURIComponent(contentId)}`);
        return response.data;
    },

    // GET /api/content/dislike?email&role&&contentId  (Note: exact casing & '&' usage from JSON)
    dislikeContent: async (email, role, contentId) => {
        const response = await apiClient.get(`/api/content/dislike?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}&&contentId=${encodeURIComponent(contentId)}`);
        return response.data;
    },

    // GET /api/content/removeDislike?email&role&&contentId
    removeDislikeFromContent: async (email, role, contentId) => {
        const response = await apiClient.get(`/api/content/removeDislike?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}&&contentId=${encodeURIComponent(contentId)}`);
        return response.data;
    },

    // GET /api/content/remove?contentId
    removeContent: async (contentId) => {
        const response = await apiClient.get(`/api/content/remove?contentId=${encodeURIComponent(contentId)}`);
        return response.data;
    },

    // ------------------------------------------------------------------------
    // COMMENT INTERACTION ROUTES
    // ------------------------------------------------------------------------

    // POST /api/content/comment
    commentOnContent: async (payload) => {
        const response = await apiClient.post('/api/content/comment', payload);
        return response.data;
    },

    // GET /api/content/removecomment?contentId&&commentId
    removeCommentFromContent: async (contentId, commentId) => {
        const response = await apiClient.get(`/api/content/removecomment?contentId=${encodeURIComponent(contentId)}&&commentId=${encodeURIComponent(commentId)}`);
        return response.data;
    },

    // GET /api/content/likecomment?email&&commentId
    likeComment: async (email, commentId) => {
        const response = await apiClient.get(`/api/content/likecomment?email=${encodeURIComponent(email)}&&commentId=${encodeURIComponent(commentId)}`);
        return response.data;
    },

    // GET /api/content/removeLikeComment?email&&commentId
    removeLikeFromComment: async (email, commentId) => {
        const response = await apiClient.get(`/api/content/removeLikeComment?email=${encodeURIComponent(email)}&&commentId=${encodeURIComponent(commentId)}`);
        return response.data;
    }
};
