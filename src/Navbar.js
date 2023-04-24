import Inputs from "./Inputs"
import "./css/navbar.css"
export default function Navbar()
{
    return(<div className="navbar">
        <img src="./img/Logo.png" id="logo" alt="logo"/>
        <div className="inputs">
            <Inputs />
        </div>
        <button className="login">Login</button>
        </div>)
}