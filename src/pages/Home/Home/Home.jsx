import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../services/Services'
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee'
import Benefits from '../Benefits/BeneFits'
import BeMerchant from '../BeMerchant/BeMerchant'


export default function Home() {
  return (
    <div>
      <Banner/>
      <Services/>
      <ClientLogosMarquee/>
      <Benefits/>
      <BeMerchant/>
    </div>
  )
}
