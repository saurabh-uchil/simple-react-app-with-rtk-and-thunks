import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteUser = createAsyncThunk('users/delete', async(user)=>{
    console.log("Called the delete user thunk"+user);
    await pause(3000);
    await axios.delete(`http://localhost:3005/user/${user.id}`);
    return user;
});

const pause = (duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration)
    });
 }

export  {deleteUser};