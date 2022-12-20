import {useState,useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate, useNavigation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import AddEdit from './Pages/AddEdit/AddEdit';
import About from './Pages/About/About';
import Detail from './Pages/Detail/Detail';
import MyNavbar from './Components/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { myauth } from './Firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [active, setactive] = useState('Home')
  const [user, setuser] = useState(null);
 const navi=  useNavigate()
  useEffect(() => {
    myauth.onAuthStateChanged((author)=>{
      if(author){
        setuser(author)
        // alert(user.uid)
      }
    })
   
  }, [])
  const handleLogOut=async()=>{
    await signOut(myauth)
    .then(()=>{
      setuser(null)
      setactive("Auth")
      navi("/auth")

    })

  }
  
  return (
    <div className="">
    <MyNavbar active={active} setactive={setactive} user={user} handleLogOut={handleLogOut}/>
     <ToastContainer  position='top-center' />

    
  
    <Routes>
      <Route path='/' element={<Home active={active} setactive={setactive} user={user} />}  />
      <Route path='/auth' element={<Auth active={active} setactive={setactive}/>}  />
      <Route path='/add' element={user?.uid? <AddEdit active={active} setactive={setactive} user={user}/>:<Navigate to={'/'} /> } />
      <Route path='/update/:id' element={<AddEdit setactive={setactive}/>}  user={user} />
      <Route path='/detail/:id' element={<Detail setactive={setactive} />} />
      <Route path='/about' element={<About/>} />


    </Routes>
 
 
 
    </div>
  );
}

export default App;
