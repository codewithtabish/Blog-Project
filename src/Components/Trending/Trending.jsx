import React from 'react'
import ReactOwlCarousel from 'react-owl-carousel'
// import 'react-owl-carousel2/style.css'; 
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Trending.css'
import { Link } from 'react-router-dom';
import { subText } from '../../SubText';








const Trending = ({blogs}) => {
    const options={
        loop:true,
        margin:10,
        autoplay: true,
        dots: true,
        duration:1000,
        animateOut: 'fadeOut',

        // autoPlay:true,
        new:true,
        responsive:{
            0:{
                items:1
            },
            400:{
                items:2

            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    }
  return (
    <div>
    <ReactOwlCarousel className='owl-theme' {...options}>
    {/* <div> */}

    {blogs? blogs.map((item,index)=>(
            <>
            <div className="trend-box" key={index}>
                <div className="img-overlay">
                <div className="trend-img-con">
                <img src={item.imgUrl} alt="" />

                </div>
                </div>
                <div className="trend-data">
             <Link to={`detail/${item.id}`}>
             <p className='trend-title text-black'>{subText(item.title,30)}</p>
             </Link>
                    {/* <span>12-11-22</span> */}
                </div>
            </div>

            </>
        )

        ):<h1>No Blogs here</h1>
       
    }
    {/* </div> */}

    </ReactOwlCarousel>



   
    
    
   
    
      
    </div>
  )
}

export default Trending

