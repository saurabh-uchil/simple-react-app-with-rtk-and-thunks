import { RiDeleteBin5Line } from "react-icons/ri"
import "../CSS/Photo.css";
import { useRemovePhotoMutation } from "../Store/Apis/photosApi";
import Spinner from "./Spinner";

export default function Photo({photo}) {
    const [removePhoto, results] = useRemovePhotoMutation();
    const handleDelete = () =>{
        removePhoto(photo);
    }

  return (
    <div className="imageDiv">
        <img src={photo.photo} alt={photo.photo} />
        <button className='btn btn-danger' onClick={handleDelete}>Delete<RiDeleteBin5Line /></button>
        {results.isLoading && <Spinner />}
    </div>
  )
}
