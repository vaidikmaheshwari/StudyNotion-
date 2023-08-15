import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import {ACCOUNT_TYPE } from '../../../utils/constants'

function CourseDetailsCard({course,setConfirmationModal,handleBuyCourse}){

    const {user}= useSelector((state)=>state.profile);
    const {token}= useSelector((state)=>state.auth);
    const navigate= useNavigate();
    const dispatch= useDispatch(); 
    const {
        thumbnail:ThumbnailImage,
        price: CurrentPrice,
    } = course;

 
    const handleAddToCart=()=>{
        if(user && user?.accountType=== ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor , you can't buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"please login to add to cart",
            btn1:"Login",
            btn2:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }

    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }


    return(
        <div>
            <img 
                src={ThumbnailImage}
                alt='Thumbnail image'
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl '
            />
            <div> 
                Rs. {CurrentPrice}
            </div>
            <div className='flex flex-col gap-y-6'>
                <button
                className='bg-yellow-50 w-fit text-richblack-900'
                 onClick={
                    user && course?.studentsEnrolled.includes(user?._id) ?
                    ()=>navigate("/dashboard/enrolled-courses") :
                    handleBuyCourse
                 }
                >
                    {
                        user && course?.studentsEnrolled.includes(user?._id)? "Go to Course":
                        "Buy Now"
                    }
                </button>
                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}
                        className='bg-yellow-50 text-richblack-900 w-fit'>
                            Add to Cart
                        </button>
                    )
                }
            </div>
            <div>
                <p>
                    30-day Money-Back Gurantee
                </p>
                <p>
                    This Course Includes:
                </p>
                <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions?.map((item ,index)=>(
                        <p key={index} className='flex gap-2'>
                           <span>{item}</span>
                        </p>
                    ))
                }
                </div>
            </div>
            <div>
                <button
                onClick={handleShare}
                className='flex mx-auto items-center gap-2 p-6 text-yellow-5'>
                    Share
                </button>
            </div>
        </div>
    )
}
export default CourseDetailsCard