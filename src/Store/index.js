import { configureStore } from "@reduxjs/toolkit";
import { user} from "./Slice/userSlice";
import { addAlbum } from "./Slice/albumSlice";
import { fetchUser } from "./Thunks/userThunks";
import { addUser } from "./Thunks/addUserThunks";
import { albumsApi } from "./Apis/AlbumsAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photosApi} from "./Apis/photosApi";


const store = configureStore({
   reducer:{
    user: user,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer
   },
   middleware: (getDefaultMiddleware) =>{
      return getDefaultMiddleware().concat(albumsApi.middleware, photosApi.middleware);
   }
});

window.store = store;

setupListeners(store.dispatch);

export {store, addAlbum, fetchUser, addUser}