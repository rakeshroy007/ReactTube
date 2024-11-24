import { createSlice } from '@reduxjs/toolkit'

// 👉 Some update in #05
const appSlice = createSlice({
    name: 'app', 
    initialState:{
        open:true,
        video:[],
        category:"All",
        active: "All",  // Add the 'active' field to the state
        searchSuggession: [] ,
        isLoading: "true"
        
    },
    reducers:{
        // action
        toggleSidebar:(state)=>{
            state.open = !state.open
        },
        setHomeVideo:(state,action) => {
            state.video = action.payload
        },
        setCategory:(state, action) => {
            state.category = action.payload
        },
        setActive: (state, action) => {  // New action to set 'active'
            state.active = action.payload;
        },
        setSearchSuggession: (state, action) => {
            state.searchSuggession = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload ;
        },
        resetVideos: (state) => { // Add this reducer
            state.video = [];
        },
    }
})

export const {toggleSidebar, setHomeVideo, setCategory, setActive, setIsLoading, resetVideos} = appSlice.actions
export default appSlice.reducer