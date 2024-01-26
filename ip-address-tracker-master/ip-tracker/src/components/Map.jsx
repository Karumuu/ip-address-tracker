import React, { useEffect } from 'react';
import '../Styles/map.css'
import Fondo from '../../../images/icon-location.svg';
import useMapContext from '../Context/Hook';

const Map = () => {
  const {coords, datos, currentLocation} = useMapContext();

  useEffect(() => {

    currentLocation()
    console.log("map ",  currentLocation())
  }, [])

useEffect(() => {
  console.log("coords map ", coords)
}, [coords])


  var customMarker = L.icon({
    iconUrl: Fondo,
    

    iconSize:     [38, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


 
  

    useEffect(() => {


    var lengthText = document.querySelector(".search input");
    lengthText.setAttribute('size', lengthText.getAttribute('placeholder').length);
  
  
    // Crea el mapa y el marcador
    var map = L.map('map').setView([coords.lat, coords.lon], 16);
    L.marker([coords.lat, coords.lon], { icon: customMarker }).addTo(map);
  
    // Agrega la capa de azulejos del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Devuelve una función de limpieza que se ejecutará cuando el componente se desmonte
    return () => {
      map.remove();
    };


    
            return () => {
              map.remove();
            };

            
      }, [coords]); // Empty dependency array ensures the useEffect runs only once on mount

      

  return (
    <div>
    <div id="map"></div>
    </div>
  )
}

export default Map