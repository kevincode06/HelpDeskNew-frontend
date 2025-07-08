import axios from 'axios';

const API_URL_ADMIN = '/api/tickets/admin/';

const getAuthHeaders = (token) => ({
    Headers: {
        Authorization: `Bearer ${token}`,
    },
});

// get all ticket (for admin) 
const getAllTickets = async (token) => {
    const response = await axios.get(API_URL_ADMIN, getAuthHeaders(token));
    return response.data
};

// update ticket status for admin 
const updateTicketStatus = async (ticketId, status, token) => {
    const response = await axios.put(
        `${API_URL_ADMIN}${ticketId}/status`,
        { status },
        getAuthHeaders(token)
    );
    return response.data;
};

const adminService = {getAllTickets, updateTicketStatus,}; 

export default adminService;