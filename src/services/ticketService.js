// client/src/services/ticketService.js
import axios from 'axios';

const API_URL = '/api/tickets/';

// Set up authorized axios instance
const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// Create new ticket
const createTicket = async (ticketData, token) => {
    const response = await axios.post(API_URL, ticketData, getAuthHeaders(token));
    return response.data;
};

// Get user tickets
const getTickets = async (token) => {
    const response = await axios.get(API_URL, getAuthHeaders(token));
    return response.data;
};

// Get single ticket
const getTicket = async (ticketId, token) => {
    const response = await axios.get(API_URL + ticketId, getAuthHeaders(token));
    return response.data;
};

// Update ticket (e.g., close ticket by user)
const updateTicket = async (ticketId, ticketData, token) => {
    const response = await axios.put(API_URL + ticketId, ticketData, getAuthHeaders(token));
    return response.data;
};

// Add reply to ticket (for both user and admin)
const addReply = async (ticketId, replyData, token) => {
    const response = await axios.post(`${API_URL}${ticketId}/replies`, replyData, getAuthHeaders(token));
    return response.data;
};


const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    addReply,
};

export default ticketService;