import { useState } from 'react'
import { useAddAlbumsMutation, useFetchAlbumsQuery } from '../Store/Apis/AlbumsAPI'
import Spinner from './Spinner';
/* import { FaMinus, FaPlus } from 'react-icons/fa'; */
import Albums from './Albums';
import "../CSS/AlbumsList.css";
import SkeletonLoader from './SkeletonLoader';

export default function AlbumsList({user}) {
    const {data, isLoading, error} = useFetchAlbumsQuery(user);
    const [addAlbums, results] = useAddAlbumsMutation();


    const albumsData = data && data.length > 0 ? data.map((album, i) =>{
      return <Albums key={i} album={album}/>
    }): <p>{user.name} has no albums</p>; 

    const [isOpen, setIsOpen] = useState(false);
    console.log(data, isLoading, error);
    
    const handleToggle = () =>{
      setIsOpen(isOpen => !isOpen);
    }

    const handleAddAlbums = () =>{
      addAlbums(user);
    }
    
    /* let accordionButton = isOpen ? <FaMinus /> : <FaPlus /> */
    let albumsContent;

     if(isLoading){
          albumsContent = <div style={{padding:"5px"}}><SkeletonLoader times={3}/></div>
        }else if(error){
          albumsContent = <p>Error Loading Albums...</p>
        }else{
          console.log(data);
          albumsContent = <div className='albums'>
            <div className='divHeader'>
              <p>Albums by {user.name}</p>
              <div style={{display:"flex"}}>
                {results.isLoading && <div style={{ margin:"2px"}}><Spinner /></div>}
                <button className="btn btn-primary addAlbums" onClick={handleAddAlbums}>Add Albums</button>
              </div>
            </div>
            <br/>
            <div className='albumsPanel'>
              {albumsData}
             </div> 
          </div>
        }
  return (
    <>
     {/*  {albumsContent} */}
      <div>{albumsContent}</div>
    </>
  )
}
