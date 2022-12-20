import React from 'react'
import { Row,Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { aa } from '../../Imagg'
import { subText } from '../../SubText'
import './Blog.css'
const Blogs = ({blogs,user,handleDelete}) => {
    const navi=useNavigate()
    const userId=user?.uid
    // alert(user?.uid)
  return (
    <div className='main-box'>
    {
        blogs.map((blog,index)=>{
           return(
            <div key={index} className='blog-box py-3'>
               <div style={{flex:'1'}} className='first-flex'>
             {
                blog.imgUrl?
                <img src={blog.imgUrl} alt="img"  style={{width:'100%',height:'260px'}}  className='img-fluid'/>:
                
                <img src={`${aa}`}  style={{width:'100%',height:'260px'}} className='img-fluid' />

             }
               </div>
               <div style={{flex:'2'}} className='second-flex'>
               <span class="badge text-bg-primary my-badge">
                {blog.category}
               </span>
          
                <h4 className='tit'>{subText(blog.title,20)}</h4>
                <div>
                <span>{blog?.author}</span>
                &nbsp;  &nbsp;
                &nbsp;<span>12-22-22</span>

                </div>
                <p className='blog-desc'>{subText(blog.description,120)}</p>
                <div className='btn-icons'>
                    <div>
                    <Link to={`detail/${blog.id}`}>
                    <Button className='read-more' 
                     
                      
                     >Read More</Button>
                    </Link>

                    </div>
                   {
                    user?.uid &&blog.uerrId ===user.uid &&(
                      <div className='icons-div'>
                       <Link>
                       <FontAwesome
                        onClick={()=>handleDelete(blog?.id)}
                        name='trash' style={{cursor:'pointer'}}/>
                       </Link>
                        <Link to={`/update/${blog.id}`}>
                        <FontAwesome
                        style={{cursor:'pointer'}}
                        name='edit'/>
                        </Link>
                    </div>
                    )
                   }
                </div>
               </div>



            </div>
           
           )
            
        })
    }
    
  

      
    </div>
  )
}

export default Blogs
