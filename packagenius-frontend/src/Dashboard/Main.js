import React from 'react'
import { usePageContext } from './Context/PageContext'
import Sidebar from './Sidebar'
import Explore from './Explore/Explore'
import Design from './Design/Design'
import Visualize from './Visualize/Visualize'
import Compliance from './Compliance/Compliance'

const Main = () => {

    const { pageId } = usePageContext()

    console.log(pageId)

    let content;
    if (pageId === 2) {
        content = <Design />
    } else if (pageId === 3) {
        content = <Visualize />
    } else if (pageId === 4) {
        content = <Compliance />
    } 
    // else if (pageId === 5) {
    //     content = <Compliance />
    // } else if (pageId === 6) {
    //     content = <Compliance />
    // } else if (pageId === 7) {
    //     content = <Compliance />
    // }
    else{
        content = <Explore />
    }

  return (
    <div className='lg:flex-row flex lg:items-center lg:justify-center flex-col w-full h-screen'>
        <Sidebar />

        <div className='lg:w-[94.15%] w-full h-full'>
            {content}
        </div>
    </div>
  )
}

export default Main