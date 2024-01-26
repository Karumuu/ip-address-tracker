import { useContext } from 'react'
import MapContext from './Provider'


const useMapContext = () => {
return useContext(MapContext)
}

export default useMapContext