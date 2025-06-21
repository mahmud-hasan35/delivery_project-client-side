import React from 'react'
import { Outlet } from 'react-router'
import ProfastLogo from '../pages/share/profastLogo/ProfastLogo'

export default function AuthLayout() {
  return (
    <div className=" p-12 ">
        <div>
            <ProfastLogo/>
        </div>
  <div className="hero-content flex-col lg:flex-row-reverse">
 <div className='flex-1'>
       <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-sm rounded-lg shadow-2xl"
    />
 </div>
    <div className='flex-1'>
      <Outlet></Outlet>
    </div>
  </div>
</div>
  )
}
