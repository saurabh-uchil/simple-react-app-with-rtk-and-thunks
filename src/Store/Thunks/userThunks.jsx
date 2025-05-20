import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const fetchUser = createAsyncThunk("users/fetch", async()=>{
    const response =  await axios.get("http://localhost:3005/user");
    await pause(2000);
    return response.data;
 });

 const pause = (duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration)
    });
 }
export {fetchUser};