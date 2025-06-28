import React from 'react'
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router'

export default function ProfastLogo() {
  return (
<NavLink to="/" className="btn btn-ghost text-xl">
  <div className="flex items-center">
    <img className="mb-4" src={logo} alt="Profast Logo" />
    <p className="text-2xl -ml-2">Profast</p>
  </div>
</NavLink>
    
  )
}
