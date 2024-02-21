import React from "react";
import buscar from "../../../images/icon-arrow.svg";
import "../Styles/header.css";
import Fondo from "../../../images/pattern-bg-desktop.png";
import useMapContext from "../Context/Hook";

const Header = () => {
  const { checkIpAddress, searchLocation } = useMapContext();


  const handleBuscar = (e) => {
    e.preventDefault();
    console.log("value ", e.target[0].value);
    const ipAd = e.target[0].value;

    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const domainPattern = /^(?:\*\.)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,6}$/

    if (ipv4Pattern.test(ipAd) === true) {
      searchLocation(ipAd, "ipv4")
    }else if(ipv6Pattern.test(ipAd) === true){
      searchLocation(ipAd, "ipv6")
    } else {
      alert("Please type a correct Ipv4 Address format")
    }
  };

  return (
    <div
      className="header attribution"
      style={{ backgroundImage: `url(${Fondo})` }}
    >
      <h1>IP Address tracker</h1>
      <form onSubmit={handleBuscar}>
        <div className="search">
          <input
            type="text"
            placeholder="Search for any IP address (e.g. 192.212.174.101)"
          />
          <button type="submit">
            <img src={buscar} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
