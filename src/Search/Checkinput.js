import "./css/inputcheck.css";
export default function Checkinput(props)
{
    return(
        <div className="taha-all" onClick={props.changeValue}>
            <input type="checkbox" className="taha-checkbox"/>
            <div className="taha-filter">
                <p className="taha-text">{props.label}</p>
            </div>
        </div>
    
    );
}