import { useState,useRef } from "react";
import "./css/input.css";
import DatePicker from "./DatePicker";
import StarRatingComponent from 'react-star-rating-component';
export default function Inputs()
{
    let inputRef=useRef(null);
    let maxmin=useRef();
    let min=useRef();
    let max=useRef();
    
    let [isVisible, setIsVisible] = useState(false);
    let [cities,setcities]=useState(new Set())
    const getOptions= async(e)=>
    {
        let response=await fetch(`https://api.teleport.org/api/cities/?search=${e.target.value}&limit=7`)
        let data= await response.json();
        let newcities=new Set();
        data._embedded["city:search-results"].map((value)=>
        {
            let values=value.matching_full_name.split(",");
            newcities.add(values[0]+","+values[2]);
        })
        setcities(newcities);
    }
    const handleFocus = () => {
        setIsVisible(true);
      };
    
      const handleBlur = () => {
        setIsVisible(false);
      };
    const ChangeInputValue=(e)=>
    {
        inputRef.current.value=e.target.innerHTML;
    }
    const checkMin=()=>
    {
        console.log("i am here")
        if(min.current.value && max.current.value && min.current.value > max.current.value)
        {
            maxmin.current.style.setProperty('border-color', 'red', 'before');
        }
        else
        {
            maxmin.current.style.setProperty('border-color', 'rgb(155, 155, 155)', 'before');
        }
    }
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
    let [freeBreakfast,setfreeBreakfast]=useState(false);
    const changefreeBreakfast=()=>
    {
        setfreeBreakfast(!freeBreakfast)
    }
    let [freeParking,setfreeParking]=useState(false);
    const changefreeParking=()=>
    {
        setfreeParking(!freeParking)
    }
    let [travelers,settravelers]=useState(0);
    const addTraveler=()=>
    {
        let count= travelers+1;
        if(travelers<10)
            settravelers(count);
    }
    const removeTraveler=()=>
    {
        let count= travelers-1;
        if(travelers>0)
            settravelers(count);
    }
    let [gym,setgym]=useState(false)
    let [pool,setpool]=useState(false)
    const changegym=()=>
    {
        setgym(!gym);
    }
    const changepool=()=>
    {
        setpool(!pool);
    }
    return(
        <div className="inputsAll">
        <div className="globalinput" >
            <div className="input-container">
                <input type="text" ref={inputRef} onChange={getOptions} onFocus={handleFocus} onBlur={handleBlur}  id="textinput" placeholder="City"/>
                {isVisible&&<div id="cityname" className="cityname" >
                    {Array.from(cities).map((value,index)=> <div onMouseDown={ChangeInputValue} key={index} className="options">{value}</div>)}
                </div>}
            </div>
            <DatePicker />
            <img src="./img/search.png" alt="search" className="searchbtn"/>
        </div>
        <div className="filters">
            <div className="maxmin" ref={maxmin}>
                <h4 className="tag">Price:</h4>
                <input className="min" type="number" ref={min} onBlur={checkMin} placeholder="min" />
                <input className="max" type="number" ref={max} onBlur={checkMin} placeholder="max"/>
            </div>
            <div className="stars-container">
                <h4 className="tag rating">Rating:</h4>
                <div className="stars">
                <StarRatingComponent name="stars" value={stars} onStarHover={hoverStar} onStarHoverOut={resetStar} onStarClick={setStars}/>
                </div>
            </div>
            <div className="stars-container">
                <h4 className="tag freebies">Extras:</h4>
                <div className="check-freebies">
                    <input type="checkbox"/>
                    <label className="label" onClick={changefreeBreakfast}>Free Breakfast</label>
                    <input type="checkbox"/>
                    <label className="label" onClick={changefreeParking}>Free Parking</label>
                    <input type="checkbox"/>
                    <label className="label" onClick={changegym}>Gym</label>
                    <input type="checkbox"/>
                    <label className="label" onClick={changepool}>Swimming Pool</label>
                </div>
            </div>
            <div className="stars-container">
                <h4 className="tag freebies">Travelers:</h4>
                <div className="check-freebies">
                    <div className="counter" >
                        <div className="btn" onClick={removeTraveler}>-</div>
                        <div className="count">{travelers}</div>
                        <div className="btn" onClick={addTraveler}>+</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}