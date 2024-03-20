import React from 'react'
import TopBar from './TopBar'
import MainSearch from './MainSearch'

const Explore = () => {
  return (
    <div className='h-full overflow-y-scroll scrollbar-hide'>
        <TopBar />
        <MainSearch />
    </div>
  )
}

export default Explore