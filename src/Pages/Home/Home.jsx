import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React,{useEffect,useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Blogs from '../../Components/Blogs/Blogs';
import Popular from '../../Components/Popular/Popular';
import GrowExample from '../../Components/Spinner';
import Tags from '../../Components/Tag/Tags';
import Trending from '../../Components/Trending/Trending';
import { db } from '../../Firebase';

const Home = ({active,setactive,user}) => {
  // useLocation
  const loci= useLocation()
  const [loading, setloading] = useState(true)
  const [blogs, setblogs] = useState([])
  const [tags, settags] = useState([])
  const [trendBlogs, settrendBlogs] = useState([])
  const getTrendingBlogs=async()=>{
    const blogRef=collection(db,"blogs")
    const trendingQuery=query(blogRef,where("trending","==","yes"));
    const querySnap=await getDocs(trendingQuery)
    let trendingBlog=[]
    querySnap.forEach((item)=>{
      trendingBlog.push({id:item.id,...item.data()})

    })
    settrendBlogs(trendingBlog)
    // alert(trendBlogs.length)
  }
  console.log(loci.pathname);
  useEffect(() => {
    getTrendingBlogs()
    // alert(trendBlogs.length)
      // alert(user.uid)
      if(loci.pathname==="/"){
        setactive("Home")
      }else if(loci.pathname==="/add"){
        setactive("Add")
      }else if(loci.pathname==="/auth"){
        setactive("Auth")
      }
      const unSub=onSnapshot(
        collection(db,"blogs"),(snapShot)=>{
          let list=[]
          let mytags=[]
          snapShot.docs.forEach((doc)=>{
            mytags.push(...doc.get('tags'))
            
            
            list.push({id:doc.id,...doc.data()})
          })
          const uniqueTags=[...new Set(mytags)]
          settags(uniqueTags)
          // alert(tags.length)
          setblogs(list)
          setloading(false)

        },(error)=>{
          toast.error('error occured in fetching')
        }
      )
      return ()=>{
        unSub()
        getTrendingBlogs()

      }
     
    }, [])

    const handleDelete=async(mid)=>{
      if(window.confirm("Are You want to delete this Blog ? ....")){
        try{
          setloading(true)
          await deleteDoc(doc(db,"blogs",mid))
          setloading(false)
          toast.success("Blog deleted Successfully ...")

        }catch(e){
          alert(e)
        }

      }


    }
   
   
    // console.log(blogs);
  return (
   <>
   {
    loading?<Container>
    <div className='spi'>
   
    <GrowExample/>
    </div>
    


    </Container>:  <Container>
   
   <Row>
   <div className='text-center pt-4 pb-3'>
   <h2>Trending</h2>
   </div>
   <div className='col-md-12'>
   <Trending blogs={trendBlogs} />

   </div>

   </Row>
   <Row>
     <div className='col-md-8 py-3'>
     <span>Daily Blogs</span>
     
     <hr />
   
     <Blogs blogs={blogs}  handleDelete={handleDelete}  user={user}/>

     </div>
     <div className='col-md-3 py-3'>
     <div>
      <h5 className='text-center'>Tags</h5>
     </div>
     <hr />
     <Tags tagss={tags} />
     <div className='text-center py-3'>
      <h5>Most Popular</h5>
      <hr />

     </div>
     <Popular blogs={blogs}/>

   

     </div>
   </Row>

   
 </Container>
   }
  

   </>
  )
}

export default Home
