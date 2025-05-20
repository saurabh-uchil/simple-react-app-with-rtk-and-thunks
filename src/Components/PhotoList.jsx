import "../CSS/PhotoList.css";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../Store/Apis/photosApi";
import Photo from "./Photo";
import SkeletonLoader from "./SkeletonLoader";

import Spinner from "./Spinner";

export default function PhotoList({album}) {
const {data, isLoading, error} = useFetchPhotosQuery(album);
const [addPhoto, results] = useAddPhotoMutation();

 const photo = data && data.length > 0 ? data.map((p, i)=>{
    return <Photo key={i} photo={p}/> 
 }): <p>{album.album_name} has no photos</p>;

 const handleAddPhoto = () =>{
    addPhoto(album);
 }

 let photosData;
 if(isLoading){
    console.log("Is Loading photos")
    photosData = <SkeletonLoader times={3}/>
 }else if(error){
    photosData = <div>Error Loading Photos...</div>
 }else{
    photosData = photo;
 }
 console.log(photosData);
  return (
    <div className="photoListDiv">
        <div className="photoDivHeader">
            <p>Photos in {album.album_name} Album</p>
            {results.isLoading && <Spinner />}
            {results.isError && <div>Error Adding Photos..</div>}
            <button className="btn btn-primary addPhoto" onClick={handleAddPhoto}>Add photos</button>
        </div>
        <div className="photosDataDiv">
            {photosData}
        </div>
    </div>
  )
}
