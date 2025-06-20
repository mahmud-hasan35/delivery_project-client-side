import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/share/navbar/Navbar'
import Footer from '../pages/share/footer/Footer'

export default function RootLayout() {
  return (
    <div>
      <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
