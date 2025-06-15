import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSelectedOrganization = createAsyncThunk('organization/fetchSelectedOrganization', async (organizationId) => {    
    const response = await axios.post(
        'http://localhost:5000/api/v1/organisations/details',
        { organizationId },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
    
    return response.data;
});

const OrganizationSlice = createSlice({
    name: 'organization',
    initialState: {
        _id: '',
        name:  '',
        description: '',
        superAdmin: '',
        assignees: [],
        waitingList: [],
        teams: [],
        plan:'',
        planValidity: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSelectedOrganization.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchSelectedOrganization.fulfilled, (state, action) => {
                state.isLoading = false;

                if (!action.payload.success) {
                    state.error = action.payload.error
                    return;
                }
                
                state._id =action.payload.data._id;
                state.name=action.payload.data.name;
                state.description=action.payload.data.description;
                state.superAdmin=action.payload.data.superAdmin;
                state.assignees=action.payload.data.assignees;
                state.teams=action.payload.data.teams;
                state.waitingList=action.payload.data.waitingList;
                state.plan=action.payload.data.plan;
                state.planValidity=action.payload.data.planValidity;

            })
            .addCase(fetchSelectedOrganization.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
            
    }
});

export const organizationReducer = OrganizationSlice.reducer;