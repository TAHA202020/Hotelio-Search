import { Marker, Popup } from "react-leaflet";
import { DivIcon, map } from "leaflet";
import MapHotel from "./MapHotel";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import "./css/search.css";
import Filters from "./Fileters";
import ReactLoadind from "react-loading"
import Images from "./Images";
import { useLocation } from "react-router-dom";
function Search() {
  let mapref=useRef()
  let location =useLocation()
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city');
  const country = queryParams.get('country');
  const [loading,setLoading]=useState(false);
  const [prixmin,setPrixmin]=useState(null);
  const [prixmax,setPrixMax]=useState(null);
  let center=[43.296398,5.370000]
  let [markers,setmarkers]=useState([])
  let [fullMarkers,setFullMarkers]=useState();
  let [select,setSelect]=useState("All");
  
  useEffect(()=>
  {
    setLoading(true)
    fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&limit=1` ,{method:"GET"}).then(res=>res.json()).then(
    (data)=>
    {
      let lat=parseFloat(data[0].lat) ;
      let lon=parseFloat(data[0].lon) ;
      console.log(lat)
      mapref.current.Center([lat,lon])
      console.log(mapref.current.getBounds())
      //getHotels(mapref.current.getBounds())
      setLoading(false)
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
  const Filter=(data,select,prixmin,prixmax)=>
  {console.log("filter called")
    if(select!=="All")
    {
      data=data.filter(item=> item.TypeEstab===select)
    }
    console.log(data)
    if(prixmin!==null && prixmin!=="")
    {
      data=data.filter(item=>item.Price>=prixmin)
    }
    console.log(data)
    if(prixmax!==null && prixmax!=="")
    {
      data=data.filter(item=>item.Price<=prixmax)
    }
    console.log(data)
    setmarkers(data)
  }
  const getHotels=(bounds)=>
  {
    setLoading(true)
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
        setFullMarkers(data)
        Filter(data,select,prixmin,prixmax)
        setLoading(false)
    })
  }
  return (
    <>
      <Navbar/>
      <Filters prixmin={prixmin} prixmax={prixmax} select={select} filter={Filter} setPrixMax={setPrixMax} setPrixmin={setPrixmin} setSelect={setSelect} markers={fullMarkers} setmarkers={setmarkers}/>
      <div className="bodyContanier">
        <div className="images">
          {loading?<ReactLoadind type="spinningBubbles" color="black" />:markers.map((value,index)=><Images key={index} onMouseEnter={()=>{changeIconOfKey(value.id)}} onMouseLeave={()=>{resetIconKey(value.id)}} images={value.Images} name={value.estabname+index} price={value.Price} city={city} />)}
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
