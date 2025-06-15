import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductDetails = createAsyncThunk('product/fetchProductDetails', async (organizationId, productId) => {    
    
    const response = await axios.post(
        'http://localhost:5000/api/v1/organisations/details',
        { organizationId },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
    
    return response.data;
});

export const createProduct = createAsyncThunk('product/createProduct', async (productData) => {    
    console.log('product data', productData);
    // const response = await axios.post(
    //     'http://localhost:5000/api/v1/product/create',
    //     { productData },
    //     {
    //         headers: { 'Content-Type': 'application/json' }
    //     }
    // );
    
    // console.log('product data', response.data);
    return "response.data";
});
    
const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        buildProduct: {
            organisationId: null,
            handleBy: null,
            authRole: null,
            name: null,
            description: null,
            expectedOutcome: null,
            label: null, 
            sprint: null,
            sprintDuration: null,
            startDate: null,
            endDate: null,
            stories: [],
            epics: [],
        },
        products: [],
        isLoading: false,
        error: ''
    },
    reducers: {
        saveProduct: (state, action) => {
            state.buildProduct.name = action.payload.organizationId || state.buildProduct.organizationId;

            state.buildProduct.name = action.payload.name || state.buildProduct.name;
            state.buildProduct.description = action.payload.description || state.buildProduct.description;
            state.buildProduct.expectedOutcome = action.payload.expectedOutcome || state.buildProduct.expectedOutcome;
            state.buildProduct.label = action.payload.label || state.buildProduct.label;

            state.buildProduct.organisationId = action.payload.organisationId || state.buildProduct.organisationId;
            state.buildProduct.handleBy = action.payload.handleBy || state.buildProduct.handleBy;
            state.buildProduct.authRole = action.payload.authRole || state.buildProduct.authRole;
            
            state.buildProduct.stories = Array.from(new Set([...state.buildProduct.stories,action.payload.stories]));
            state.buildProduct.epics = Array.from(new Set([...state.buildProduct.epics,action.payload.epics]));
            
            state.buildProduct.sprint = action.payload.sprint || state.buildProduct.sprint;
            state.buildProduct.sprintDuration = action.payload.sprintDuration || state.buildProduct.sprintDuration;
            
            state.buildProduct.startDate = action.payload.startDate || state.buildProduct.startDate;
            state.buildProduct.endDate = action.payload.endDate || state.buildProduct.endDate;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
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
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
            
            .addCase(createProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;

                if (!action.payload.success) {
                    state.error = action.payload.error
                    return;
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
            
    }
});

export const { saveProduct } = ProductSlice.actions;
export const productReducer = ProductSlice.reducer;