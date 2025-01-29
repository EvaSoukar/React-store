import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";
import shoppingCartSlice from "./features/shoppingCart/shoppingCartSlice";
import contactSlice from "./features/forms/contactSlice"
import authSlice from "./features/auth/authSlice"
import ordersSlice from "./features/orders/ordersSlice"

export const store = configureStore({
  reducer: {
    productList: productsSlice,
    shoppingCart: shoppingCartSlice,
    contact: contactSlice,
    auth: authSlice,
    orders: ordersSlice
  }
})