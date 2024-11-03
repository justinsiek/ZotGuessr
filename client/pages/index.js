import React from 'react'
import Link from 'next/link'

const index = () => {


  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen relative bg-gradient-to-b from-slate-50 to-sky-200'>
      <img src="/assets/zotGuessr.png" className='z-10 rounded-xl object-contain h-1/2 w-1/2'>
      </img>
      
      <Link href="/play">
        <button className='text-4xl z-10 border-2 border-solid border-black font-sans font-family:ui-sans-serif font-bold
        text-slate-50 px-12 py-4 rounded-xl hover:text-slate-200 bg-sky-400 hover:bg-sky-500'>Play ZotGuessr!</button>
      </Link>


      
    </div>
  )
}

export default index
