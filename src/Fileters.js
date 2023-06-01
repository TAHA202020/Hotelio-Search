import "./css/filters.css"
import Checkinput from "./Checkinput";
import { Select } from "antd";

export default function Filters(props)
{
    return(<div className="filters">
        <div className="extras">
            <label className="label">Prices:</label>
            <input type="number" className="input-number min" placeholder="min"/>
            <input type="number" className="input-number max" placeholder="max"/>
        </div>
        <div className="extras">
            <label className="label">Extras:</label>
            <Checkinput changeValue={props.changePool}  label="Swimming Pool"/>
            <Checkinput changeValue={props.changeGym}  label="Gym"/>
            <Checkinput changeValue={props.changeParking}  label="Free Parking"/>
            <Checkinput changeValue={props.changeBreakfast}  label="Free Breakfast"/>
        </div>
        <div className="extras">
            <label className="label">Type d'Hebergement:</label>
            <Select style={{width:"200px"}} defaultValue={"All"} onChange={(value)=>
                {
                    props.setSelect(value)
                    if(value==="All")
                    {
                        props.setmarkers(props.markers)
                    }
                    else
                        props.setmarkers(props.markers.filter(item=> item.TypeEstab===value))
                }}>
                <Select.Option value="All">All</Select.Option>
                <Select.Option value="Hotel">Hotel</Select.Option>
                <Select.Option value="Appartement">Appartement</Select.Option>
                <Select.Option value="Riad">Riad</Select.Option>
                <Select.Option value="Carvane">Carvane</Select.Option>
                <Select.Option value="Villa">Villa</Select.Option>
                <Select.Option value="Hostel">Hostel</Select.Option>
                <Select.Option value="Castle">Castle</Select.Option>
                <Select.Option value="Cabane">Cabane</Select.Option>
                <Select.Option value="Others">Others</Select.Option>
            </Select>
        </div>
    </div>
);
}