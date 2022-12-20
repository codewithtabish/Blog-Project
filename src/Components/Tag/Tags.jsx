import React from 'react'
import './Tag.css'

const Tags = ({tagss}) => {
  return (
    <div className='tags-con'>
    {
        tagss.map((tag,index)=>{
           return(
            <>
            <div key={index} className='tag-box'>
         
            <small>{tag}</small>


            </div>
            </>
           )
        })

    }
      
    </div>
  )
}

export default Tags
