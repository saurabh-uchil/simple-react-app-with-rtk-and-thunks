import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useThunk = (thunk) =>{
     const [isLoading, setIsLoading] = useState(false);
     const [hasErrors, setHasErrors] = useState(null);

     const dispatch = useDispatch();
    
     
     const runThunk = useCallback((args)=>{
        setIsLoading(true);
        dispatch(thunk(args))
        .unwrap()
        .catch((err)=>setHasErrors(err))
        .finally(()=>setIsLoading(false))
    }, [dispatch, thunk]);

     return [runThunk, isLoading, hasErrors];
}

export default useThunk;