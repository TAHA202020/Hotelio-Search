import "./css/filters.css"
import { useState } from "react";
import Checkinput from "./Checkinput";
import StarRatingComponent from "react-star-rating-component";
import { Select } from "antd";

export default function Filters(props)
{
    let [stars,setstars]=useState(1);
    let [oldstars,setoldstars]=useState(1);
    const setStars=(value)=>
    {
        setstars(value);
        setoldstars(value);
    }
    const hoverStar=(nextval)=>
    {
        setstars(nextval);
    }    
    const resetStar=()=>
    {
        setstars(oldstars);
    } 

    return(<div className="filters">
        <div className="extras">
            <label className="label">Prices:</label>
            <input type="number" className="input-number min" placeholder="min"/>
            <input type="number" className="input-number max" placeholder="max"/>
        </div>
        <div className="extras">
            <label className="label">Stars:</label>
            <div className="stars">
                <StarRatingComponent name="stars" value={stars} onStarHover={hoverStar} onStarHoverOut={resetStar} onStarClick={setStars}/>
            </div>
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
            <div>
                <input type="checkbox" className="type-hebergement-checkbox"/>
                <label className="type-hebergement"> Hotel</label>
            </div>
            <div>
            <input type="checkbox" className="type-hebergement-checkbox"/>
            <label className="type-hebergement"> Appartemment</label>
            </div>
            <div>
                <input type="checkbox" className="type-hebergement-checkbox"/>
                <label className="type-hebergement"> Villa</label>
            </div>
            <div>
                <input type="checkbox" className="type-hebergement-checkbox"/>
                <label className="type-hebergement"> Séjours chez l'habitant</label>
            </div>
        </div>
    </div>
);
}