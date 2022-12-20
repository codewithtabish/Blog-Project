import { Alert } from 'bootstrap';
import React ,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation } from 'react-router-dom';
import { aa } from '../../Imagg';
import './Navbar.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
const MyNavbar = ({active,setactive,user,handleLogOut}) => {
  const uId=user?.uid;
  // alert(user?.displayName)

  
  const loci= useLocation()
  console.log(loci.pathname);
  useEffect(() => {
      // alert(user.uid)
      if(loci.pathname==="/"){
        setactive("Home")
      }else if(loci.pathname==="/add"){
        setactive("Add")
      }else if(loci.pathname==="/auth"){
        setactive("Auth")
      }
     
    }, [active])
    

  return (
    <>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='my-nav'>
      <Container>
        <Link to='/' >Blogs</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{gap:'1rem'}}>
          <Nav className=" ms-auto me-auto">
           <div  onClick={()=>setactive('Home')}
            className={`${active==='Home'?"active":""}`}
           >
           <Link to="/"
             
           

          
            >Home</Link>
           </div>
           <div onClick={()=>setactive('Add')}
            className={`${active==='Add'?"active":""}`}>

            <Link to={'/add'}>
            Create
            </Link>
           </div>
           <div onClick={()=>setactive('About')}
            className={`${active==='About'?"active":""}`}>

            <Link to={'/about'}>
            About
            </Link>
           </div>
          
          </Nav>
          {
            uId?(
              <>
          
         
       
          
          <Nav className='my-naii'>
          {/* <div className='lg-prop'> */}
          <img src={aa} alt="" srcset=""  className='my-prop' />
          <NavDropdown
              id="nav-dropdown-dark-example"
              title=""
              menuVariant="dark"
            >
              <NavDropdown.Item>{user?.displayName}</NavDropdown.Item>
             
              
              <NavDropdown.Divider />
              <NavDropdown.Item >
              <Link to={'/auth'} onClick={handleLogOut}>
              Logout

              </Link>
              
              </NavDropdown.Item>
            </NavDropdown>
         
          {/* </div> */}
        
        
          </Nav>

       
  

        
            
        
      
         
              </>
            ):(
         
              <>
              <Nav>
          <div onClick={()=>setactive('Auth')}
            className={`${active==='Auth'?"active":""}`}>

            <Link to="/auth">login</Link>
            </div>
        
         
          </Nav>

              </>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  )
}

export default MyNavbar
