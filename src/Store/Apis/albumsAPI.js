import { faker } from '@faker-js/faker';
import  {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const rawBaseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3005'});

const customBaseQuery = async (...args) => {
    await delay(3000); // ← Add 3s delay
    return rawBaseQuery(...args);
};


const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: customBaseQuery,
    endpoints(builder){
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, user)=>{
                    const tags = result.map((album)=>{
                        return {type: 'Albums', album_id:album.id}
                    });
                    tags.push({type:'Get Albums', id:user.id});
                    console.log(tags);
                    return tags;
                },
                query: (user) => {
                    return {
                     url:'/albums',
                     params: {
                        user_id: user.id
                     },
                     method: 'GET'   
                    }
                }
            }),
            addAlbums: builder.mutation(({
                invalidatesTags: (result, error, user)=>[{type:'Get Albums', id:user.id}],
                query: (user) =>{
                    return {
                        url: '/albums',
                        method: 'POST',
                        body:{
                            user_id: user.id,
                            album_name: faker.commerce.productName()
                        }
                    }
                }
            })),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album)=>[{type:'Albums', album_id:album.id}],
                query:(album)=>{
                    return {
                        url:`/albums/${album.id}`,
                        method: 'DELETE',
                    }
                }
            })
        }
    }
});

export const {useFetchAlbumsQuery, useAddAlbumsMutation, useRemoveAlbumMutation} = albumsApi
export {albumsApi}