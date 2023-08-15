import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import Home from '../../../pages/Home';
import HIghlightText from './HIghlightText';
import CourseCard from './CourseCard';
const tabsName= [
    "Free",
    "How to coding",
    "Most popular",
    "Skill paths",
    "Career Paths",
];

const ExploreMore = () => {

    const [currentTab,setCurrentTab]= useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] =useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrentCard(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div>
     {/* explore more section */}
      <div className='text-4xl font-semibold text-center my-10 '>
        Unlock the <HIghlightText text={"Power of Code"}/>
      </div>  
     
      <p className='text-center text-richblack-300 text-lg font-semibold mt-1 '>
        Learn to build anything you can imagine
      </p>
      
      <div className='hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
        {
            tabsName.map((element,index) =>{
                return(
                      <div 
                      className={`text-[16px] flex flex-row items-center gap-2
                      ${currentTab === element ?  "bg-richblack-900 text-richblack-5 font-medium ": "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer 
                      hover:bg-richblack-900 hover:text-richblack-5  px-7 py-[7px]`}
                      key={index} 
                      onClick = {()=>setMyCards(element)}>
                          {element}
                    </div>
                )
            })
        }
      </div>

      <div className='hidden lg:block lg:h-[200px]'>
        {/* course card ka grp */}
       <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:translate-x-[-20%] mx-auto lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3 '>
        {
            courses.map((element,index)=>{
                return(
                    <CourseCard
                    key ={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard= {setCurrentCard}
                    />
                )
            })
        }
       </div>
      </div>
    </div>
  )
}

export default ExploreMore