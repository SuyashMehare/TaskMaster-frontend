import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import { userReducer } from '../slices/userSlice.js';
import { organizationReducer } from '../slices/organizationSlice.js';
import { productReducer } from '../slices/product/productSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    organization: organizationReducer,
    product: productReducer
  },
});

export default store;