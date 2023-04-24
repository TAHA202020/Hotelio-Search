import { MapContainer,TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import MarkerClusterGroup from "react-leaflet-cluster";
const MapHotel=(props)=>
{
    return(
        <MapContainer center={[43.296398,5.370000]} zoom={13}>
            <TileLayer attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'/>
            <MarkerClusterGroup disableClusteringAtZoom={13}>
                {props.children}
            </MarkerClusterGroup>
        </MapContainer>
    )
};
export default MapHotel;