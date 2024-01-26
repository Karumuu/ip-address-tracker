import { useState } from 'react'
import Principal from './components/Principal'
import { MapProvider } from './Context/Provider';

function App() {
  
  return (
    <>
   <MapProvider>
      <Principal />
    </MapProvider>
    </>
  )
}

export default App
