import { useState,useRef } from "react";
import "./css/input.css";
import Date from "./DatePicker";
import { InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
export default function Inputs(props)
{
    let inputRef=useRef(null);
    let navigate=useNavigate()
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
    let [travelers,settravelers]=useState(1);
    let [dates,setDates]=useState([props.from,props.to]);
    return(
        <div className="inputsAll">
        <div className="globalinput" >
            <div className="input-container">
                <input type="text" ref={inputRef} onChange={getOptions} onFocus={handleFocus} onBlur={handleBlur} defaultValue={props.city+", "+props.country}  id="textinput" placeholder="City"/>
                {isVisible&&<div id="cityname" >
                    {Array.from(cities).map((value,index)=> <div onMouseDown={ChangeInputValue} key={index} className="options">{value}</div>)}
                </div>}
            </div>
            <Date setDates={setDates} dates={dates}/>
            <InputNumber className="traverlers-count" min={0} max={10} value={travelers} onChange={(value)=>{settravelers(value)}}/>
            <img src="./img/search.png" alt="search" className="searchbtn" onClick={()=>
                {
                    window.location.href="/search?city="+inputRef.current.value.split(",")[0]+"&country="+inputRef.current.value.split(",")[1].split(" ")[1]+"&from="+dates[0]+"&to="+dates[1]
                }}/>
        </div>
        </div>
    )
}