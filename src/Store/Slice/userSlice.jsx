/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../Thunks/userThunks";
import { addUser } from "../Thunks/addUserThunks";
import {deleteUser} from "../Thunks/deleteUserThunks";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data:[],
        isLoading: false,
        hasError: null
    },
    reducers:{
        /* deleteUser(state,action){
            const newArray = state.data.filter(user => user.id!==action.payload);
            state.data = newArray;
        } */
    },
    extraReducers(builder){
        //Request just started
        builder.addCase(fetchUser.pending, (state, action)=>{

            //Since redux uses Immer library we can directly update the state object
            state.isLoading =  true;
        });

        //Request Fulfilled
        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });

        //Request Rejected
        builder.addCase(fetchUser.rejected, (state, action)=>{
            state.isLoading = false;
            //If there is error then it would be added to the action.error
            state.hasError = action.error;
        });

        builder.addCase(addUser.pending, (state, action) =>{
            state.isLoading = true;
        });

        builder.addCase(addUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.data = [...state.data, action.payload];
        });

        builder.addCase(addUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.hasError = action.error;
        });

        builder.addCase(deleteUser.pending, (state, action) =>{
            state.isLoading = true;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            console.log("Delete Fulfilled "+action.payload);
            const newArray = state.data.filter(user => user.id!==action.payload.id);
            state.data = newArray;
        });

        builder.addCase(deleteUser.rejected, (state, action) =>{
            state.isLoading = false;
            console.log("Delete Rejected "+action.payload);
            state.hasError = action.error;
        });
    }
});

export const user = userSlice.reducer;
/* export const {deleteUser} = userSlice.actions; */