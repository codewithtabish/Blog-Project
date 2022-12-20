import React from 'react'
import { Link } from 'react-router-dom'
import { aa } from '../../Imagg'
import { subText } from '../../SubText'
import  './Popular.css'
const Popular = ({blogs}) => {
  return (
    <div className='pop-con'>
    {
        blogs.map((item,index)=>{
            return(
                <div key={index} className='pop-box'>
                <div>
                    {
                        item.imgUrl?<img src={item.imgUrl} alt="" />:
                        <img src={aa} alt="" />
                    }
                </div>
                <div className='pop-meta' style={{padding:'4px'}}>
                    <Link to={`detail/${item.id}`}>
                    <span style={{color:'black'}} className='pop-title'>{subText(item.title,20)}</span>
                    </Link>
                    <small>08/12/22</small>
                </div>

                </div>
            )
        })


    }
      
    </div>
  )
}

export default Popular
