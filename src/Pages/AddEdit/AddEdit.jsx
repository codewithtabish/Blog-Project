import React ,{useState,useEffect} from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row,Container } from 'react-bootstrap';
import './AddEdit.css'
import { TagsInput } from "react-tag-input-component";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { db, mystorage } from '../../Firebase';
import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { async } from '@firebase/util';
import { useNavigate, useParams } from 'react-router-dom';
import GrowExample from '../../Components/Spinner';
// import ReactTagInput from '@pathofdev/react-tag-input'
const AddEdit = ({user,setactive}) => {
  const [progress, setProgress] = useState(null)
  const navi=useNavigate()
  const [loading, setloading] = useState(false)
  const {id}= useParams()
  const initalState={
    title:"",
    tags:[],
    trending:"no",
    category:"",
    description:""
  }
  const categoryOptions=[
    "Fashion",
    "Technology",
    "Food",
    "Politics",
    "Sports",
    "Business"

  ]
  const [state, setstate] = useState(initalState)
  const [file, setfile] = useState(null)
  const {title,description,tags,category,trending}=state
  useEffect(() => {
    const uploadFile=()=>{
      const storageRef= ref(mystorage,file.name)
      const uploadTask=uploadBytesResumable(storageRef,file)
      uploadTask.on("state_changed",(snapshot)=>{
        const prog=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(prog)
        switch(snapshot.state){
         case  "paused":
          console.log("upload is paused ...")
          break;

          case "running":
            console.log("upload is running ...");
            break
            default:
              break;
        }

      },(error)=>{
        
        // toast.error(error.serverResponse)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setstate((prev)=>({
            ...prev,
            imgUrl:downloadUrl
          }))
        })
      })
    }
    file && uploadFile()
  
  }, [file])
  useEffect(() => {
    id && getBlogDetails()
   
  }, [id])
  const getBlogDetails=async()=>{
    const mydoc=doc(db,"blogs",id)
    const snap= await getDoc(mydoc)
    if(snap.exists()){
      setstate({...snap.data()})
    }
    setactive(null)

  }
  
  

  const handleTags=(tags)=>{
    setstate({...state,tags})

  }
  const handleTrending=(e)=>{
    setstate({...state,trending: e.target.value})

  }
  const categoryChanged=(e)=>{
    setstate({...state,category:e.target.value})

  }
  const handleChange=(e)=>{
    setstate({...state,[e.target.name]:e.target.value})

  }
  // Thia ia me Talha 
  const handleForm=async(e)=>{
    e.preventDefault();
    // alert(file)
    // alert(tags.length)
   if(user!==null){
    if(title&&description&&file&&category&&tags&&trending){
    if(file!==null &&!id){
      try{
        setloading(false)
        const collec=collection(db,"blogs")
        await addDoc(collec,{
          ...state,
          timeStamp:new Date().getTime(),
       
          author:user?.displayName,
          uerrId:user?.uid

        })
        setloading(true)
        navi("/")
        // console.log(state)
        toast.success("Blog added Successfully ....")

      }catch(e){
        if(e){
          toast.error("something went wrong ...")
        }
        // alert(e)


      }
    }
    else {
    if(id){
      try{
        // alert(id)
        setloading(false)
       
        // const collec=collection(db,"blogs")
        // const myDoc=doc(db,"blogs",id)
        await updateDoc(doc(db,"blogs",id),{
          ...state,
          // timeStamp:new Date().getTime(),
       
          // author:user?.displayName,
          // uerrId:user?.uid

        })
        setloading(true)
        navi("/")
        // console.log(state)
        toast.success("Blog Updated Successfully Successfully ....")

      }catch(e){
        if(e){
          alert(e)
          // toast.error("something went wrong  in updation...")
        }
        // alert(e)


      }
    }else{
      alert('id is not')
    }

    }
   

    }
    else{
      toast.warning("All fields are mandatory ....")
      // alert

    }
    
   }else{

  
   }
   


  }
  return (
    
    <>
    <Row>
      <Container className='text-center mt-5 pb-4'>
        <h3>{id?"Update Blog":"Create Blog"}</h3>
      </Container>
    </Row>
    <Container>
    <Row>
    <div className='col-md-6 col-sm-12 ms-md-auto me-md-auto'>
    <Form onSubmit={handleForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
       
        <Form.Control type="text" placeholder="title"
        value={title}
        name='title'
        onChange={handleChange}
         />
       
      </Form.Group>

      <Form.Group className="mb-3 py-3" controlId="formBasicPassword">
      <TagsInput
        value={tags}
        onChange={handleTags}
        name="tags"
        placeHolder="enter tags"
      />
      </Form.Group>
   <Form.Group>
   <div className="form-check" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1.9rem',alignContent:'center'}}>
  <div>
  <p style={{marginTop:'1rem',marginRight:'1rem'}}>Is it trending Blog ?</p>
  </div>

   <div>
   <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="yes" checked={trending==="yes"} 
 onChange={handleTrending}

   />
  <label className="form-check-label" htmlFor="exampleRadios1">
    Yes
  </label>
   </div>
   <div>
   <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="no" checked={trending==="no"} 
   onChange={handleTrending}
   />
  <label className="form-check-label" htmlFor="exampleRadios2">
    No
  </label>
   </div>
 
    </div>
   </Form.Group>
   <Form.Group  className="mb-3 py-3" controlId="formBasicPassword">
   <select className="form-select" aria-label="Default select example" 
   onChange={categoryChanged} 
   value={category}
   >
  <option >Open this select menu</option>
  {categoryOptions.map((items,index)=>{
    return(
      <option  value={items || " "} key={index}>{items}</option>
    )
  })}
  
</select>
   </Form.Group>
   <Form.Group className="mb-3 py-3">
   <div className="form-floating">
  <textarea className="form-control" placeholder="write description here .." id="floatingTextarea" style={{height: '100px'}}
  value={description}
  name='description'
  onChange={handleChange}
  ></textarea>
  <label htmlFor="floatingTextarea">Description here </label>
</div>
   </Form.Group>
<Form.Group>
<div  className="mb-3 py-3">
 
  <input className="form-control" type="file" id="formFile" 
 
    onChange={(e)=>setfile(e.target.files[0])}
  />
</div>
</Form.Group>

     
        
     
    <div className='text-center'>
    {
      !loading?  <Button variant="primary" type="submit" className='mb-3 ms-auto me-auto display-block'
    disabled={progress!==null&&progress< 100}
    >
     {id?"Update":"   Submit"}
      </Button>:<GrowExample/>
    }
  
    </div>
    </Form>
    </div>
  
    </Row>

    </Container>
   

    </>
  )
}

export default AddEdit
