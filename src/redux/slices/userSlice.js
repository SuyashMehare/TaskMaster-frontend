import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrganizationByUserEmail = createAsyncThunk('user/fetchOrganizations', async (email) => {
    const response = await axios.post(
        'http://localhost:5000/api/v1/organisationUser/login/loginOne',
        { email },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );

    console.log(response.data);
    
    return response.data;
});

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            _id: '',
            email: '',
        },
        organizations: {
            activeOrganizations: [],
            clientOrganizations: [],
            ownedOrganizations: []
        },
        isLoading: false,
        error: null
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.user.email = action.payload
        },
        toggleLoadingStatus: (state) => {
            state.isLoading = !state.isLoading;
        },
        setUserError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizationByUserEmail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchOrganizationByUserEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                
                if (!action.payload.success) {
                    state.error = action.payload.error
                    return;
                }

                console.log(action.payload);
                
                state.user = action.payload.data.user;
                state.organizations = { ...action.payload.data.organizations };
                
            })
            .addCase(fetchOrganizationByUserEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
            
    }
});

export const { setUserEmail, toggleLoadingStatus, setUserError } = UserSlice.actions;
export const userReducer = UserSlice.reducer;