import {useEffect} from 'react'
import '../Styles/info.css'
import useMapContext from '../Context/Hook';


const Info = () => {
  const {datos} = useMapContext();

  useEffect(() => {
    console.log("datos ", datos)
  }, [])
  

  return (
    <div className="dataSearch">

    <div className="infoData" id="ipAd">
      <p className="titleInfo">IP ADDRESS</p>
      <p className="data">{datos.ipAddress}</p>
    </div>

    <div className="infoData" id="location">
      <p className="titleInfo">LOCATION</p>
      <p className="data">{datos.location}</p>
    </div>

    <div className="infoData" id="timeZone">
      <p className="titleInfo">TIME ZONE</p>
      <p className="data">{'UTC' + datos.timezona}</p>
    </div>

    <div className="infoData" id="isp">
      <p className="titleInfo">ISP</p>
      <p className="data">{datos.isp}</p>
    </div>



    </div>
  )
}

export default Info