import { createSlice } from "@redux/toolkit"


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items : [],
    }
})
