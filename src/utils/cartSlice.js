import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        totalItems: 0,
        restaurantId: null,
    },
    reducers: {
        addItem: (state, action) => {
            const { item, restaurantId } = action.payload;
            const newItem = item || action.payload; // Support both new format {item, restaurantId} and old format (just item)
            const resId = restaurantId || action.payload.restaurantId;
            
            // If cart has items from different restaurant, clear the cart first
            if (state.restaurantId && resId && state.restaurantId !== resId) {
                state.items = [];
                state.totalAmount = 0;
                state.totalItems = 0;
            }
            
            // Set restaurant ID if provided
            if (resId) {
                state.restaurantId = resId;
            }
            
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price || newItem.defaultPrice
                });
            }
            
            // Update totals
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity -= 1;
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                }
            }
            
            // Update totals
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            
            // Update totals
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalItems = 0;
            state.restaurantId = null;
        },
    },
});

//export the actions
export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

//This is the way to export all reducers into a single reducer
export default cartSlice.reducer;
