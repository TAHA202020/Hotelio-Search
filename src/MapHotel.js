import { MapContainer,TileLayer ,useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import MarkerClusterGroup from "react-leaflet-cluster";
function Dragging(props) {
    const map = useMapEvents({dragend:() => {
      console.log(map.getBounds())
      props.getHotels(map.getBounds());
    },zoomend:() => {
        console.log(map.getBounds())
        props.getHotels(map.getBounds());
      }});
    return null;
  }
const MapHotel=(props)=>
{
    return(
        <MapContainer center={[43.296398,5.370000]} zoom={13}>
          <Dragging getHotels={props.getHotels}/>
          <TileLayer attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'/>
          <MarkerClusterGroup disableClusteringAtZoom={14}>
            {props.children} 
          </MarkerClusterGroup>    
        </MapContainer>
    )
};
export default MapHotel;