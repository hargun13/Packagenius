import React from 'react'
import img1 from './Assets/1.png'
import img2 from './Assets/2.png'
import img3 from './Assets/3.png'
import img4 from './Assets/4.png'
import img5 from './Assets/5.png'
import img6 from './Assets/6.png'


const Card = ({image}) => {
  return(
    <div class="max-w-72 my-3 mx-3 text-sm bg-[#262626] border border-[#4e4e4e] rounded-lg">
      <img class="rounded-t-lg" src={image} alt={`img ${1}`} height="100%" width="100%" />
      <div class="p-5">
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              View Design
          </a>
      </div>
    </div>
  )
}


const Mural = () => {
  return (
    <div className='p-3 '>

      <h1 className='px-4 py-2 text-2xl'>Featured Designs</h1>
      
      <div className='flex flex-wrap items-center justify-around'>
        <Card image={img1}/>
        <Card image={img2}/>
        <Card image={img3}/>
        <Card image={img4}/>
        <Card image={img5}/>
        <Card image={img6}/>
      </div>
        
    </div>
  )
}

export default Mural