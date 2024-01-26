import React from 'react'
import Mapping from './Map'
import Header from './Header'
import Info from './Info'
import '../Styles/principal.css'
import { MapProvider } from '../Context/Provider';

const Principal = () => {

  
  return (
    <MapProvider>
    <div>
      
      <Header/>
      <Info/>
        <Mapping/>
       
    </div>
    </MapProvider>
  )
}

export default Principal