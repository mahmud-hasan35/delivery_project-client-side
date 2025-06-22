import React from 'react'
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';


function Coverage() {
    const serviceCenters = useLoaderData()
    
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Map */}
      <BangladeshMap serviceCenters={serviceCenters}></BangladeshMap>
    </div>
  );
}

export default Coverage;

