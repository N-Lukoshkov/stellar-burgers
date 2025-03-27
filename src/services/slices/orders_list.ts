import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
export const getOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export interface TOrdersState {
  orders: Array<TOrder>;
  loading: boolean;
}

export const initialState: TOrdersState = {
  orders: [],
  loading: true
};

export const userOrders = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { listOfOrders } = userOrders.selectors;

export default userOrders;
