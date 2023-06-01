import { Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import MapHotel from "./MapHotel";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import "./css/search.css";
import Filters from "./Fileters";
import { Select } from "antd";
import Images from "./Images";
import { useLocation } from "react-router-dom";
function Search() {
  let mapref=useRef()
  let location =useLocation()
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get('Type');
  console.log(paramValue)
  let center=[43.296398,5.370000]
  let [markers,setmarkers]=useState([])
  let [fullMarkers,setFullMarkers]=useState();
  let [city,setCity]=useState();
  let [country,setCountry]=useState();
  let [select,setSelect]=useState("All");
  
  useEffect(()=>
  {
    fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&limit=1` ,{method:"GET"}).then(res=>res.json()).then(
    (data)=>
    {
      let lat=parseFloat(data[0].lat) ;
      let lon=parseFloat(data[0].lon) ;
      console.log(lat)
      mapref.current.Center([lat,lon])
    })
  },[city])
  const changeIconOfKey=(key)=>
  {
    let newmarkers=[...markers];
    newmarkers.map((value)=>
    {
      if (key===value.id)
      {
        value.iconUrl=new DivIcon({
          className: 'custom-div-icon-hovered',
          html: "<div><h4>"+value.Price+" $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          });
      }
    })
    setmarkers(newmarkers);
  }
  const resetIconKey=(key)=>
  {
    let newmarkers=[...markers];
    newmarkers.map((value)=>
    {
      if (key===value.id)
      {
        value.iconUrl=new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>"+value.Price+" $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          });
      }
    })
    setmarkers(newmarkers);
  }
  const getHotels=(bounds)=>
  {
    fetch("http://localhost:8000/hotels",{method:"POST",body:JSON.stringify({bounds:bounds}),headers:{'Content-Type': 'application/json'}}).then((res)=>res.json()).then((data)=>{
      data.map((value,index)=>{value.iconUrl=new DivIcon({
        className: 'custom-div-icon',
        html: "<h4>"+value.Price+" $</h4>",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
        })
        value.id=index;
      }
        )  
        console.log(data)
        setFullMarkers(data)
        if(select==="All")
        {
          setmarkers(data)
        }
        else
        setmarkers(data.filter(item=> item.TypeEstab===select))
    })
  }
  return (
    <>
      <Navbar setCity={setCity} setCountry={setCountry}/>
      <Filters setSelect={setSelect} markers={fullMarkers} setmarkers={setmarkers}/>
      <div className="bodyContanier">
        <div className="images">
          {markers.map((value,index)=><Images key={index} onMouseEnter={()=>{changeIconOfKey(value.id)}} onMouseLeave={()=>{resetIconKey(value.id)}} images={value.Images} name={value.estabname+index} price={value.Price} city={city} />)}
        </div>
        <div className="map">
          <MapHotel mapref={mapref} getHotels={getHotels} center={center}>
            {markers.map((value,index)=><Marker eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout:(event)=>event.target.closePopup()
              }} key={index} position={[value.Latitude,value.Longitude]} icon={value.iconUrl}>
              <Popup><h3>{value.estabname+index}</h3></Popup>
            </Marker>
            )}
          </MapHotel>
        </div>
      </div>
      </>
  );
}

export default Search;
