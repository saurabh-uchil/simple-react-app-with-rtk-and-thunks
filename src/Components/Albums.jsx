/* import { useFetchPhotosQuery } from "../Store/Apis/photosApi" */
import "../CSS/Albums.css"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRemoveAlbumMutation } from "../Store/Apis/AlbumsAPI";
import Spinner from "./Spinner";
import PhotoList from "./PhotoList";

export default function Albums({album}) {
    /* const {data, loading, error} =  useFetchPhotosQuery(album);
     */
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const [isOpen, setIsOpen] = useState(false);

    let accordionButton = isOpen ? <FaMinus /> : <FaPlus />

    const handleToggle = () =>{
      setIsOpen(isOpen => !isOpen);
    }

    const handleDelete = () =>{
      console.log(album)
      removeAlbum(album);
    }

  return (
    <>
      <div className="albumsDiv">
        {results.isLoading && <Spinner />}
        {results.isError && <div>Error Deleting...</div>}
        <button className='btn btn-danger' onClick={handleDelete}><RiDeleteBin5Line /></button>
        <p>{album.album_name}</p>
        <button className="btn btn-warning" onClick={handleToggle}>{accordionButton}</button>
      </div>
      {isOpen && <div className="photoList"><PhotoList album={album}/></div>}
    </>
    
  )
}
