import React from 'react'
import { Outlet } from 'react-router'
import ProfastLogo from '../pages/share/profastLogo/ProfastLogo'
import AuthImage from '../pages/share/authImage/AuthImage'

export default function AuthLayout() {
  return (
    <div className=" p-12 ">
        <div>
            <ProfastLogo/>
        </div>
  <div className="hero-content flex-col lg:flex-row-reverse">
 <div className='flex-1'>
<AuthImage></AuthImage>
 </div>
    <div className='flex-1'>
      <Outlet></Outlet>
    </div>
  </div>
</div>
  )
}
