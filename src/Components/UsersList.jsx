/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addUser, fetchUser } from '../Store';
import SkeletonLoader from './SkeletonLoader';
import "../CSS/UserList.css";
import useThunk from '../Hooks/CustomHook';
import Spinner from './Spinner';
import User from './User';

export default function UsersList() {
 

  const [loadingUsersThunk, isLoadingUsers, isLoadingErrors] = useThunk(fetchUser);
  const [creatingUsersThunk, isCreatingUsers, isCreatingErrors] = useThunk(addUser);

  const dispatch = useDispatch();

  const handleUser = () =>{
          creatingUsersThunk();
  }

  useEffect(()=>{
      loadingUsersThunk();    
  }, []);

  const {isLoading, data, hasError} = useSelector((state)=>{
    return state.user;
  });

  let content;


  /* const handleDelete = (id)=>{
    dispatch(deleteUser(id));
  } */

 if(isLoadingErrors){
  content = <div>Error.....</div>
 }
 else if(isLoadingUsers){
  content =  <SkeletonLoader times={6}/>;
}
else{
  content = data.length > 0 ? data.map((user, i)=>{
      return <User key={i} user={user}/>
  }) : <p>No Users to display...</p>
 

  return (
    <div>
      <div className='add'>
        {isCreatingUsers && <Spinner />}
        {isCreatingErrors && <p>Error Creating user</p>}
        {!isCreatingUsers && <button  className='addButton' onClick={handleUser}>Add User</button>}
      </div> 
      <div className='list'>
        {content}
      </div>  
      <br/><br />
    </div>
    
  );
}
}