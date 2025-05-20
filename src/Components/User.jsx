import React, { useState } from 'react'
import useThunk from '../Hooks/CustomHook'
import { deleteUser } from '../Store/Thunks/deleteUserThunks'
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa";
import Spinner from './Spinner';
/* import { fetchAlbums } from '../Store/Thunks/fetchAlbumsThunks'; */
import AlbumsList from './AlbumsList';


export default function User({user}) {

    const [userDelete, isDeletingUser, hasDeletingError] = useThunk(deleteUser);
    const [isOpen, setIsOpen] = useState(false);

    /* const [albums, isLoading, hasError] = useThunk(fetchAlbums); */

    const handleToggle = () =>{

        setIsOpen(isOpen => !isOpen);
        /* if(!isOpen){
          albums(user);
        } */
    }
    const handleDelete = () =>{
        console.log("Handle Delete "+JSON.stringify(user));
        userDelete(user);
    }

    let albumsContent = <AlbumsList user={user}/>;
  
    const accordionButton = isOpen ? <FaMinus /> : <FaPlus />
  return (
    <>
    <div className="user" >
            {isDeletingUser && <Spinner/>}
            {hasDeletingError && <p>Errro Deleting User...</p>}
            <button className="btn btn-danger" onClick={()=>{handleDelete()}}><RiDeleteBin5Line /></button>
            <p>Name: {user.name}</p> 
            <button className="btn btn-warning" onClick={handleToggle}>{accordionButton}</button>
    </div>
     {isOpen && <div>
        {albumsContent}
    </div>}
    </>
    
  )
}
