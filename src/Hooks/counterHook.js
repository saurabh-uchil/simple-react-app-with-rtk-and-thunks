import { useState } from "react"

const useCounterHook = (initialValue) =>{
    const [count, setCount] = useState(initialValue);
    
    const increment = () =>{
        setCount(count=> count+1);
    }

    const decrement = () =>{
        setCount(count=> count-1);
    }

    return [count, increment, decrement];
}

export {useCounterHook}