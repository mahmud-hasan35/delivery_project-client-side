import React from 'react'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router'

export default function ProfastLogo() {
  return (
   <Link to={"/"}>
    <div className='flex items-center'>
        <img className='mb-4' src={logo} alt="" />
        <p className='text-2xl -ml-2'>Profast</p>
    </div>
    </Link>
  )
}
