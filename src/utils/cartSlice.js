import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        totalItems: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
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
        },
    },
});

//export the actions
export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

//This is the way to export all reducers into a single reducer
export default cartSlice.reducer;
