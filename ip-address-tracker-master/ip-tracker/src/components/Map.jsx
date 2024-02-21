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
    iconSize:     [38, 45], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76] 
});


 
  

    useEffect(() => {


    var lengthText = document.querySelector(".search input");
    lengthText.setAttribute('size', lengthText.getAttribute('placeholder').length);
  
  
    // Crea el mapa y el marcador
    var map = L.map('map').setView([coords.lat, coords.lon], 16);
    L.marker([coords.lat, coords.lon], { icon: customMarker }).addTo(map);
    
  
    // estilo del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Control.include({
      _refocusOnMap: L.Util.falseFn // Pa que no se cambie de tamaño el mapa
    });
  
    // Limpiar el mapa cada que se actualiza
    return () => {
      map.remove();
    };



            
      }, [coords]); // se ejecuta cada que cambien las coordenadas

      

  return (
    <div>
    <div id="map"></div>
    </div>
  )
}

export default Map