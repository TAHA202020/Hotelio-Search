import { Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import MapHotel from "./MapHotel";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import "./css/search.css"
import Images from "./Images";
import Filters from "./Fileters";
import { Select } from "antd";                                                                                               
import { useParams } from "react-router-dom";
function Search() {
  let mapref=useRef()
  let center=[43.296398,5.370000]
  let [markers,setmarkers]=useState([])
  let [city,setCity]=useState();
  console.log("erndred")
  let [country,setCountry]=useState();
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
          html: "<h4>"+value.price+" $</h4>",
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
          html: "<h4>"+value.price+" $</h4>",
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
    fetch("http://localhost:8000/hotels",{method:"POST",body:JSON.stringify({bounds:bounds}),headers:{'Content-Type': 'application/json'}})
  }
  
  return (
    <>
      <Navbar setCity={setCity} setCountry={setCountry}/>
      <Filters />
      <div className="bodyContanier">
        <div className="images">
          <label className="label" style={{color:"black"}}>Filter By :</label>
          <Select style={{width:"150px"}} defaultValue="None" options={[{value:"prix-croissant",label:"Ascending Price"},{value:"decreasing-price",label:"Decreasing Price"},{value:"none",label:"None"}]}/>
          {markers.map((value,index)=><Images key={index} onMouseEnter={()=>{changeIconOfKey(value.id)}} onMouseLeave={()=>{resetIconKey(value.id)}} images={value.images} name={value.name} price={value.price} stars={value.rating} city={value.city}/>)}
        </div>
        <div className="map">
          <MapHotel mapref={mapref} getHotels={getHotels} center={center}>
            {markers.map((value,index)=><Marker key={index} position={value.cords} icon={value.iconUrl}>
              <Popup><h3>{value.name}</h3></Popup>
            </Marker>
            )}
          </MapHotel>
        </div>
      </div>
      </>
  );
}

export default Search;
