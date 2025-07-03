import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-blue-950 w-full text-center py-2 text-white'>
      <div className='flex justify-around gap-2 items-center'>
        <div className='flex items-center text-xl font-bold cursor-pointer'>
          <span>
            <img src="./Lock.gif" className='pb-2' width={35} alt="" />
          </span>

          <div className='pb-2 text-white'>
            <span>&lt;</span>
            Pass
            <span className='text-blue-400 text-2xl'>Op/&gt;</span>
          </div>
        </div>

        <ul className='flex items-center gap-5 text-white'>
          <a href="https://github.com/surajsingh9389"><li className='w-25 px-1 border border-slate-400 bg-[#335C81] py-1 rounded-full flex justify-between items-center pr-2'><img src="./Github.png" className='rounded-full' width={32} alt="" />Github</li></a>
          <a href="https://www.linkedin.com/in/suraj-singh-2a6b00270/"><li className='w-25 px-1 border border-slate-400 bg-[#335C81] py-1 rounded-full flex justify-between items-center pr-2 '><img src="./Linkdin.png" className='rounded-full' width={32} alt="" />Linkdin</li></a>
         </ul>
      </div>
    </div>
  )
}

export default Navbar
