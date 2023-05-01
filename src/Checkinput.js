import "./css/inputcheck.css";
export default function Checkinput(props)
{
    return(
        <div className="all" onClick={props.changeValue}>
            <input type="checkbox" className="checkbox"/>
            <div className="filter">
                <p className="text">{props.label}</p>
            </div>
        </div>
    
    );
}