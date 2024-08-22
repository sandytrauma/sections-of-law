import { ActSection } from '@/constants/types';
import BriefCard from '@/components/BriefCard'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='container md:flex md:flex-col-2 lg:flex-col-2 p-4 h-screen mt-10 items-center justify-center mx-auto'>
    <Image
    src="/snowboarder.png"
    alt="homepage_image"   
    width={100}
    height={100}   
    layout="responsive"
    className="relative w-[400px] h-[400px] inset-0"
    />
      <h1 className="text-center md:text-justify text-teal-900 text-wrap md:text-3xl ">
      <p className="text-amber-100">IPC, CRPC and other sections with description for general information</p>
      </h1>
     
    </div>

    
  )
}

export default page
