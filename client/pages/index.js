import React from 'react'
import Link from 'next/link'

const index = () => {


  return (
    //FULL outer div, gradinent bg 
    <div className='flex flex-col justify-center items-center w-screen bg-gradient-to-b from-emerald-50 via-cyan-200 via-rose-100 to-violet-200 overflow-x-hidden'>
      <img src="/assets/zotGuessr.png" className='z-10 animate-appear rounded-xl object-contain h-1/2 w-1/2' />

      {/* Play button */}
      <Link href="/play">
        <button className='transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125 duration-300
        text-4xl z-10 shadow-xl font-bold text-slate-50 px-12 py-4 rounded-full bg-sky-400 hover:bg-sky-500'>Play ZotGuessr!</button>
      </Link>
      
      {/* Horizontal split divider between leaderboard and about */}
      <div className='flex flex-row items-left translate-y-28'>
        <img src="/assets/horizontal_split.png" className='w-3/4 h-30 invert z-20'/>
      </div>
      
      <div className='relative'>
        <div className='w-screen h-[400px] absolute bg-white z-10 mt-[200px] -transform-x-96'/>
      </div>
      
      {/* Game description */}
      <div className='w-screen h-screen'>
        <div className='flex flex-col ml-40 justify-left items-left h-fill w-screen relative z-20'>
          <h1 className='font-bold text-6xl'>Welcome to ZotGuessr</h1>
          <h2 className='font-bold text-2xl'>Think you're a master of navigating the campus? Let's test your skills</h2>
          <p className='py-10 text-1xl w-1/2'>Using pictures from across the campus, try to locate on a map where exactly it is. 
            There are five rounds total, and each round is limited to a timer of 30 seconds.
          </p>

          {/* UCI picture number 1 */}
          <div className='flex flex-row'>
            <img src="/assets/eight.jpg" className='object-contain h-1/2 w-1/2 transition ease-in-out delay-75
            hover:-translate-y-2 hover:scale-110 duration-300 py-10 z-20 mr-20'/>
            <img src="/assets/shapes.png" className='z-20 object-contain h-1/4 w-1/4 invert items-right translate-x-20'/>
          </div>  

          {/* UCI picture number 2 */}
          <div className='flex flex-row'>
            <img src="/assets/shapes.png" className='z-20 object-contain h-1/4 w-1/4 invert items-left -translate-x-20'/>
            <img src="/assets/fourteen.jpg" className='object-contain h-1/2 w-1/2 relative right-1/8 transition ease-in-out delay-75
            hover:-translate-y-2 hover:scale-110 py-10 duration-300'/>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default index
