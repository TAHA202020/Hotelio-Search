import { Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import MapHotel from "./MapHotel";
import Navbar from "./Navbar";
import { useState } from "react";
import "./css/search.css"
import Images from "./Images";
import Filters from "./Fileters";
function App() {
let [markers,setmarkers]=useState([
    {
      id: 1,
      name: "Grand Hotel Marseille Grand Hotel Marseille Grand Hotel Marseille Grand Hotel Marseille",
      price: 120,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 4,
      cords: [43.288325, 5.370763],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4 >50 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 2,
      name: "Hotel du Vieux Port",
      price: 85,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 3,
      cords: [43.297591, 5.377835],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>85 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 3,
      name: "Hotel la Residence du Vieux-Port",
      price: 175,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 5,
      cords: [43.294250, 5.372868],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>15 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 4,
      name: "Radisson Blu Hotel",
      price: 140,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 4,
      cords: [43.303505, 5.362715],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>15 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 5,
      name: "Sofitel Marseille Vieux-Port",
      price: 225,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 5,
      cords: [43.292066, 5.369482],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>15 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 6,
      name: "New Hotel Vieux-Port",
      price: 95,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 3,
      cords: [43.296860, 5.372120],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>15 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 7,
      name: "InterContinental Marseille - Hotel Dieu",
      price: 295,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 5,
      cords: [43.296051, 5.368618],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>15 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 8,
      name: "Pullman Marseille Palm Beach",
      price: 170,
      images: ["./img/hotel1.jpg", "./img/hotel2.jpg", "./img/hotel3.jpg"],
      rating: 4,
      cords: [43.271698, 5.363635],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<h4>15 $</h4>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    }])
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
    console.log(bounds["_northEast"].lat)
    console.log(bounds["_northEast"].lng)
  }
  return (
    <>
      <Navbar />
      <Filters />
      <div className="bodyContanier">
        <div className="images">
          {markers.map((value,index)=><Images key={index} onMouseEnter={()=>{changeIconOfKey(value.id)}} onMouseLeave={()=>{resetIconKey(value.id)}} images={value.images} name={value.name} price={value.price} stars={value.rating} city={"Marseille"}/>)}
        </div>
        <div className="map">
          <MapHotel getHotels={getHotels}>
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

export default App;
