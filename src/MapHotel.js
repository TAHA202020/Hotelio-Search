import { MapContainer,TileLayer ,useMap,useMapEvents} from "react-leaflet";
import { forwardRef,useImperativeHandle } from "react";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import MarkerClusterGroup from "react-leaflet-cluster";
function Dragging(props) {
    const map = useMapEvents({dragend:() => {
      props.getHotels(map.getBounds());
    },zoomend:() => {
        props.getHotels(map.getBounds());
      },moveend:()=>
      {
        props.getHotels(map.getBounds());
      }});
    return null;
  }
const MapHotel=(props)=>
{
    return(
        <MapContainer center={props.center} zoom={13}>
          <Dragging getHotels={props.getHotels}/>
          <Child ref={props.mapref}/>
          <TileLayer attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'/>
          <MarkerClusterGroup disableClusteringAtZoom={14}>
            {props.children} 
          </MarkerClusterGroup>    
        </MapContainer>
    )
};
const Child = forwardRef((props, ref) => {
  let map=useMap();
  useImperativeHandle(ref, () => ({
    Center(center) {
      map.setView(center,13)
    },getBounds(){return map.getBounds();}
  }));

  return <h1>Child</h1>;
});
export default MapHotel;