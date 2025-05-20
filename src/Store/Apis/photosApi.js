import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const rawBaseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3005'});

const customBaseQuery = async (...args) => {
    await delay(3000); // ← Add 3s delay
    return rawBaseQuery(...args);
};



const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: customBaseQuery,
    endpoints(builder){
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) =>{
                    const tags = result.map((pic)=>{
                        return {type:'photo', id:pic.id}
                    });
                    tags.push({type:'get photos', id:album.id});
                    return tags;
                },
                query: (album) => {
                    return {
                     url:'/photos',
                     params: {
                        album_id: album.id
                     },
                     method: 'GET'   
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => [{type:'get photos', id:album.id}],
                query: (album)=>{
                    return {
                        url: '/photos',
                        method: 'POST',
                        body:{
                            album_id: album.id,
                            photo: faker.image.avatar()
                        }
                    }
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (results, error, photo) => [{type:'photo', id:photo.id}],
                query: (photo)=>{
                    return{
                        url:`/photos/${photo.id}`,
                        method:'DELETE'
                    }
                }
            })
        }
    }
});

export const {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi
export {photosApi}