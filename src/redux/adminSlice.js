// client/src/redux/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../services/adminService'; // Create this service

const initialState = {
    adminTickets: [],
    adminTicket: {}, // For viewing a single ticket in admin view
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Get all tickets for admin
export const getAllTicketsForAdmin = createAsyncThunk(
    'admin/getAllTickets',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await adminService.getAllTickets(token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update ticket status by admin
export const updateTicketStatusByAdmin = createAsyncThunk(
    'admin/updateTicketStatus',
    async ({ ticketId, status }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await adminService.updateTicketStatus(ticketId, status, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTicketsForAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTicketsForAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.adminTickets = action.payload;
            })
            .addCase(getAllTicketsForAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTicketStatusByAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTicketStatusByAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.adminTickets = state.adminTickets.map((ticket) =>
                    ticket._id === action.payload._id ? action.payload : ticket
                );
                // Also update if adminTicket is currently being viewed
                if (state.adminTicket._id === action.payload._id) {
                    state.adminTicket = action.payload;
                }
            })
            .addCase(updateTicketStatusByAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;