import { createSlice } from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items : [],
    },
    reducers: {
        // reducers wil contain mapping of action and reducer function 
        //in add item reducer function state is the initial state and action is the data which is coming in
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items.pop(); //implement  your own logic how you are deleting
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

//export the actions
export const {  addItem, removeItem, clearCart } = cartSlice.actions;

//This is the way to export all reducers into a single reducer
export default cartSlice.reducer;
