import React from 'react'
import logo from '../../../assets/logo.png'

export default function ProfastLogo() {
  return (
    <div className='flex items-center'>
        <img className='mb-4' src={logo} alt="" />
        <p className='text-2xl -ml-2'>Profast</p>
    </div>
  )
}
