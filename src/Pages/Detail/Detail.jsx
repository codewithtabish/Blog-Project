import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import React ,{useState,useEffect} from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Popular from '../../Components/Popular/Popular'
import Tags from '../../Components/Tag/Tags'
import { db } from '../../Firebase'
import { aa } from '../../Imagg'
import { subText } from '../../SubText'
import './Detail.css'

const Detail = ({setactive}) => {
  const {id}=useParams()
  const [state, setState] = useState(null)
  const [blogs, setblogs] = useState([])
  const [tags, settags] = useState([])
  useEffect(() => {
    const getBlogData=async()=>{
      // const docRef=collection(db,"blogs")
      // const blogs=await getDocs(docRef)
      // setblogs(blogs.docs.map((doc)=>({id:doc.id,...doc.data()})))
      // let myTags=[]
      // blogs.doc.map((pp)=>myTags.push(...pp.get("tags")))
      // alert(tags.length)
      // const uniqueTags=[...new Set(myTags)]
      // settags(uniqueTags)
      // // alert()
      // alert(myTags.length)

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
          // setloading(false)

        },(error)=>{
          // toast.error('error occured in fetching')
        }
      )
      return ()=>{
        unSub()

      }

    }
    getBlogData();
    // alert(blogs.length)
    // alert(tags.length)
   
  }, [])
  
  useEffect(() => {
    id&&getDetails();
  
  }, [id])
  const getDetails=async()=>{
    const docRef=doc(db,"blogs",id)
    const blog=await getDoc(docRef)
    setState(blog.data())
    setactive(null)

  }
  
  return (
    <>
   
     <Container className='py-1 cons' >
     <div className='img-title'>
      <div className="overlay">

      {
        state?.imgUrl? <img src={state.imgUrl} alt="blog-img" className='img-fluid'/>:
        <img src={aa} alt="blog-img" className='img-fluid'  />
      }
    
      </div>
      </div>
     </Container>
     <Container className='py-5'>
     <div className="single-title1">
     <Row>
      <div className='col-md-8'>
      <span className='detail-date1'>12-11-2021</span>
      <br />
      <small>{`written by :- `}</small>
      &nbsp;     &nbsp;     &nbsp;
   
      <small>{state?.author}</small>

<h3 className='detail-title1'>
{state?.title}
{/* {subText(state?.title,30)} */}

</h3>
  <hr />
      </div>
      <div className='col-md-4 py-5'>
      
   


      </div>
     </Row>
     

      </div>
     </Container>
   
    
    
      <Container className='py-2'>
      
      <Row>
        <div className='col-md-8'>
        <p className='single-desc'>{state?.description}</p>

        </div>
        <div className='col-md-4'>
        <h3 className='text-center mb-3'>Tags</h3>
        <Tags tagss={tags}/>
        <Popular blogs={blogs}/>
          </div>
      </Row>


      </Container>
    
   
     
    </>
  )
}

export default Detail
