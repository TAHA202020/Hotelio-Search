import Inputs from "./Inputs"
import "./css/navbar.css"
export default function Navbar(props)
{
    
    return(<div className="navbar">
        <img src="" id="logo" alt="logo"/>
        <div className="inputs">
            <Inputs setFrom={props.setFrom} setTo={props.setTo} city={props.city} country={props.country} getHotels={props.getHotels} navigate={props.navigate} mapref={props.mapref} from={props.from} to={props.to}/>
        </div>
        <button className="login">Login</button>
        </div>)
}