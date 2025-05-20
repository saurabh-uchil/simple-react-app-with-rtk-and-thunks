import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk("addUser", async ()=>{
    console.log("inside the create User thunk");
    const response = await axios.post("http://localhost:3005/user", {
        name: faker.person.fullName()
    });
    await pause(1000);
    return response.data;
});

const pause = (duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration)
    });
 }

export {addUser}