import Inputs from "./Inputs"
import "./css/navbar.css"
export default function Navbar({setCity,setCountry})
{
    return(<div className="navbar">
        <img src="" id="logo" alt="logo"/>
        <div className="inputs">
            <Inputs setCity={setCity} setCountry={setCountry}/>
        </div>
        <button className="login">Login</button>
        </div>)
}