import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientSlice } from './slices/ingredient';
import { constructorSlice } from './slices/constructor';
import { userSlice } from './slices/user';
import { feedSlice } from './slices/feed';
import { newOrderSlice } from './slices/new_order';
import { userOrders } from './slices/orders_list';

const rootReducer = combineSlices(
  ingredientSlice,
  constructorSlice,
  userSlice,
  feedSlice,
  newOrderSlice,
  userOrders
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
