import { useState, createContext } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    ipAddress: "",
    location: "",
    country: "",
    timezona: "",
    isp: "",
  });

  const [coords, setCoords] = useState({
    lat: "",
    lon: "",
  });

  //API IP
  const apiKey = "0f2276446dbe4fb29657bb48bd9037c9";



  const checkIpAddress = (ip) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
  };

  const hours = (zonaHoraria) => {
    const offset = parseInt(zonaHoraria, 10);
    const signo = offset < 0 ? "-" : "+";

    const horas = Math.abs(offset);
    const minutos = (horas - Math.floor(horas)) * 60;

    const formatoZonaHoraria = `${signo}${String(horas).padStart(
      2,
      "0"
    )}:${String(minutos).padStart(2, "0")}`;

    return formatoZonaHoraria;
  };

  const agregarSaltosDeLinea = (cadena) => {
    let resultado = "";

    for (let i = 0; i < cadena.length; i += 15) {
      resultado += cadena.substring(i, i + 15) + "\n";
    }

    return resultado;
  };
  //FIN FORMATT

  //CURRENT LOCATION
  const currentLocation = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("response current ", JSON.parse(result));
        var infoData = JSON.parse(result);

        setDatos({
          ...datos,
          ipAddress: agregarSaltosDeLinea(infoData.ip),
          location: `${infoData.city}, ${infoData.country_code2}, ${infoData.zipcode}`,
          timezona: hours(infoData.time_zone.offset),
          isp: infoData.isp,
        });
        console.log("datos inicial ", datos);
        setCoords({
          ...coords,
          lat: infoData.latitude,
          lon: infoData.longitude,
        });
      })
      .catch((error) => console.log("error", error));
  };

  const searchLocation = async (data, type) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${data}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log("response ", JSON.parse(result));
        var infoData = JSON.parse(result);

        setDatos({
          ...datos,
          ipAddress: agregarSaltosDeLinea(infoData.ip),
          location: `${infoData.city}, ${infoData.country_code2}, ${infoData.zipcode}`,
          timezona: hours(infoData.time_zone.offset),
          isp: infoData.isp,
        });
        console.log("datos inicial ", datos);
        setCoords({
          ...coords,
          lat: infoData.latitude,
          lon: infoData.longitude,
        });
      })
      .catch((error) => console.log("error", error));
  };

  //FIN API IP

  //NOMINATIM /NO SE USÓ DE MOMENTO
  /*const NominatimIpAddress = async () => {
    console.log("datos nominatim ", datos);

    var nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      datos.region
    )},${encodeURIComponent(datos.country)}`;

    await fetch(nominatimUrl)
      .then((response) => response.json())
      .then((data) => {
        var lat = data[0].lat;
        var lon = data[0].lon;

        console.log("lat, lon ", lat, " ", lon);
        setCoords({ ...coords, lat: lat, lon: lon });
      })
      .catch((error) => console.error("Error:", error));
  };*/

  //FIN NOMINATIM

  const contextValue = {
    datos,
    currentLocation,
    coords,
  };

  console.log("Context in MapProvider:", contextValue);

  return (
    <MapContext.Provider
      value={{
        datos,
        searchLocation,
        currentLocation,
        coords,
        checkIpAddress,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider };

export default MapContext;
