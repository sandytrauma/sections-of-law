

import ChatBot from '@/components/ChatBot'
import Tooltip from '@/components/Tooltip'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <section className=' w-full h-full'>
      <div className="container md:flex md:flex-col-2 lg:flex-col-2 p-4 h-screen mt-10 items-center justify-center mx-auto">
      <Image
        src="/snowboarder.png"
        alt="homepage_image"
        width={100}
        height={100}
        priority
        className="relative w-[400px] h-[400px] inset-0"
      />
      <h1 className="text-center md:text-justify text-teal-900 text-wrap md:text-3xl ">
        <p className="text-amber-100">IPC, CRPC and other sections with description for general information</p>
      </h1>
      </div>
      <div className="items-center justify-center">
      
        <ChatBot/>
      </div>
    </section>



  )
}

export default page
