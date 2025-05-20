import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAlbums = createAsyncThunk("fetch/albums", async(user)=>{
    const response = await axios.get(`http://localhost:3005/albums?user_id=${user.id}`);
    await pause (3000);
    return response.data;
});

const pause =  (duration) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration);
    })
}
export {fetchAlbums}