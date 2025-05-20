import React from 'react';
import "../CSS/SkeletonLoader.css";

export default function SkeletonLoader({times}) {
   const box  = Array(times)
   .fill(0)
   .map((element, i)=>{
    return <div key={i} className='outerClass'>
      <div className='innerClass'></div>
    </div>
    });

    return (
    <div>
      {box}
    </div>
  )
}
