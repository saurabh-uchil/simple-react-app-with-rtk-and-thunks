/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbums } from "../Thunks/fetchAlbumsThunks";


const albumSlice = createSlice({
    name: "album",
    initialState: [],
    reducers:{
        // eslint-disable-next-line no-unused-vars
        addAlbum(state, action){
            return [...state, action.payload]
        }
    },
    extraReducers(builder){
        builder.addCase("album/addAlbums", (state, action)=>{
            console.log("extra reducer from albums");
        });
        builder.addCase(fetchAlbums.pending, (state, action)=>{
            console.log("Pending...");
        });
        builder.addCase(fetchAlbums.fulfilled, (state, action)=>{
            console.log(action.payload);
        });
        builder.addCase(fetchAlbums.rejected, (state, action)=>{
            console.log("Failed....");
        });
    }
});

export const album = albumSlice.reducer;
export const {addAlbum} = albumSlice.actions;