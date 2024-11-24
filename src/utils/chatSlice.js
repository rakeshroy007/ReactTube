import {createSlice} from "@reduxjs/toolkit"

const chatSlice = createSlice({
    name:"chat",
    initialState: {
        message: []      // [{name:"Patel Programmer", message:"input"}]
    },
    reducers:{
        setMessage:(state, action) => {
            // Remove the first message if array length exceeds 8
            if (state.message.length >= 10) {
                state.message.shift();
            }
            state.message.push(action.payload)
        }
    }
})
export const {setMessage} = chatSlice.actions
export default chatSlice.reducer