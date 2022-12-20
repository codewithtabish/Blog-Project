import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import React ,{useState} from 'react'
import { Row, Toast} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer, useToast } from 'react-toastify';

import './Auth.css';
import { myauth } from '../../Firebase';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const Auth = ({active,setactive}) => {

  const initlialState={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  }
  const [state, setstate] = useState(initlialState)
  const [signUp, setsignUp] = useState(false)
  const navii= useNavigate()
  const {firstName,lastName, email,password,confirmPassword}=state
  const handleInput=(e)=>{

    setstate({...state,[e.target.name]:e.target.value})
  }
  const  handleAuth=async(e)=>{
    e.preventDefault();
    if(!signUp){
      if(email&&password){
        const {user}=await signInWithEmailAndPassword(myauth, email,password)
        if(user){
          navii("/")
          setactive("Home")
          return toast.success("login Succssfully ...")
        }else{
          return toast.error("Some error has been occured...")
        }
       
      }else{
       return toast.error("All fields are mandatory...")
      }


    }else{
      if(password!==confirmPassword){
        return toast.error("please enter the same password here ....")
 
      }
      if(firstName&&lastName&&email&&password&&confirmPassword){
      
   
        const {user}=await createUserWithEmailAndPassword(myauth,email,password,confirmPassword);
        await updateProfile(user,{displayName:`${firstName} ${lastName}`})
        setactive("Home")
        navii("/")
      
      return  toast.success("account created Sucessfully ...")
        // alert(user.displayName)


      }else{
        return toast.error("All fields are mandatory ....")
      }
      
    }
  
    
    


  }
  return (
   <>
   <ToastContainer/>
   <div className="container mt-4">
    <div className='text-center yx-md-5' style={{fontSize:'22px',fontStyle:'bold'}}>
     {
      signUp&&(
        <>
        <h2 className='text-primary'> {!signUp?"SigIn":"Sign Up"}</h2>
        </>
      )
     }
     {
      !signUp&&(
        <>
        <h2 className='text-black'> {!signUp?"SigIn":"Sign Up"}</h2>
        </>
      )
     }

    </div>
 <div  className='col-lg-6 ms-auto me-auto'>
 <Form onSubmit={handleAuth}>
 {
  signUp&& (
    <>
    <Row>
    <div className='col-md-6'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name"
        name='firstName'
        value={firstName}
        onChange={handleInput}
         />
      
      </Form.Group>
   

    </div>
    <div className='col-md-6'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="last Name"
        name='lastName'
        value={lastName}
         onChange={handleInput}
         />
      
      </Form.Group>
   

    </div>
    <div className='col-md-12'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Email"
        name='email'
         value={email}
         onChange={handleInput}
         />
      
      </Form.Group>
   

    </div>
    <div className='col-md-12'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
         value={password}
         name='password'
         onChange={handleInput}

        />
      
      </Form.Group>
   

    </div>
    <div className='col-md-12'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm Password" 
         value={confirmPassword}
         name='confirmPassword'
         onChange={handleInput}

        />
      
      </Form.Group>
   

    </div>

  

    </Row>

    </>
  )
 }
     {
      !signUp &&(
        <>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
          value={email}
          name='email'
          onChange={handleInput}
        />
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
           value={password}
          onChange={handleInput}
          name='password'
         />
      </Form.Group>
        </>
      )
     }
     
      <Button variant="primary" type="submit"
      className={`f-btn  ${!signUp?"btn-signIn":"btn-signUp"}`}
      >
      {!signUp?"Sign In":"sign Up"}
      </Button>
    </Form>
 </div>
   {!signUp?
   <>
   <div className='dont'>
      <small>Dont have an account ?</small>
      <span className='link-danger ms-2 up-link' onClick={()=>setsignUp(true)}>Sign Up</span>
    </div>
   </>
   :
   <>
   <div className='yes'>
      <small>Already have an account ?</small>
      <span className='link-primary in-link ms-2'
       onClick={()=>setsignUp(false)}
      >Sign In</span>
    </div>


   </>
   }
   </div>

   </>
  )
}

export default Auth
