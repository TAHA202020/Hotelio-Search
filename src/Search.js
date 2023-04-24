import { Marker, Popup } from "react-leaflet";
import { DivIcon, Icon } from "leaflet";
import MapHotel from "./MapHotel";
import Navbar from "./Navbar";
import { useState } from "react";
import "./css/search.css"
import Images from "./Images";
function App() {
let [markers,setmarkers]=useState([
    {
      id: 1,
      name: "Grand Hotel Marseille",
      price: 120,
      images: ["image1.jpg", "image2.jpg", "image3.jpg"],
      rating: 4,
      cords: [43.288325, 5.370763],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 2,
      name: "Hotel du Vieux Port",
      price: 85,
      images: ["image4.jpg", "image5.jpg", "image6.jpg"],
      rating: 3,
      cords: [43.297591, 5.377835],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>85 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 3,
      name: "Hotel la Residence du Vieux-Port",
      price: 175,
      images: ["image7.jpg", "image8.jpg", "image9.jpg"],
      rating: 5,
      cords: [43.294250, 5.372868],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 4,
      name: "Radisson Blu Hotel",
      price: 140,
      images: ["image10.jpg", "image11.jpg", "image12.jpg"],
      rating: 4,
      cords: [43.303505, 5.362715],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 5,
      name: "Sofitel Marseille Vieux-Port",
      price: 225,
      images: ["image13.jpg", "image14.jpg", "image15.jpg"],
      rating: 5,
      cords: [43.292066, 5.369482],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 6,
      name: "New Hotel Vieux-Port",
      price: 95,
      images: ["image16.jpg", "image17.jpg", "image18.jpg"],
      rating: 3,
      cords: [43.296860, 5.372120],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 7,
      name: "InterContinental Marseille - Hotel Dieu",
      price: 295,
      images: ["image19.jpg", "image20.jpg", "image21.jpg"],
      rating: 5,
      cords: [43.296051, 5.368618],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 8,
      name: "Pullman Marseille Palm Beach",
      price: 170,
      images: ["image22.jpg", "image23.jpg", "image24.jpg"],
      rating: 4,
      cords: [43.271698, 5.363635],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          })
    },
    {
      id: 9,
      name: "Le Petit Nice Passedat",
      price: 315,
      images: ["image25.jpg", "image26.jpg", "image27.jpg"],
      rating: 5,
      cords: [43.268661, 5.353176],
      iconUrl: new DivIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>15 $</h4></div>",
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
          className: 'custom-div-icon',
          html: "<div style='background-color: black; color: white; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>"+value.price+" $</h4></div>",
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
          html: "<div style='background-color: white; color: black; border-radius: 30px; width: 35px; height: 20px; display: flex; justify-content: center; align-items: center;'><h4>"+value.price+" $</h4></div>",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          });
      }
    })
    setmarkers(newmarkers);
  }
  return (
    <>
      <Navbar />
      <div className="bodyContanier">
        <div className="images">
          {markers.map((value,index)=><Images key={index} onMouseEnter={()=>{changeIconOfKey(value.id)}} onMouseLeave={()=>{resetIconKey(value.id)}} images={value.images} name={value.name} price={value.price} stars={value.rating} city={"Marseille"}/>)}
        </div>
        <div className="map">
          <MapHotel>
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
