import "./css/images.css"
import { useState } from "react";
export default function Images(props)
{
    const [currentIndex, setCurrentIndex] = useState(0);
    const myArray=props.images;
    const cycleR=()=>
    {
        setCurrentIndex((currentIndex + 1) % myArray.length);
    }
    const cycleL=()=>
    {
        if(currentIndex==0)
            setCurrentIndex(myArray.length-1)
        else
            setCurrentIndex((currentIndex - 1) % myArray.length);
    }
  
return(
<div className="card" onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
    <img src={myArray[currentIndex]} alt="not found"/>
    <button className="right change" onClick={cycleR}><img src="./img/next.png" alt="back" className="icon" /></button>
    <button className="left change" onClick={cycleL}><img src="./img/back.png" alt="back" className="icon" /></button>
    <h3 className="title">{props.name}</h3>
    <div className="info">
        <div className="people">
        <img src="./img/group.png" className="icon"/>
            <p>-5</p>
        </div>
        <div>
            {Array.from({length:props.stars},(_, index) => index).map((index)=><img key={index} src="./img/star.png" className="icon"/>)}
        </div>
    </div>
    <div className="info margin">
        <h5 className="city">{props.city}</h5>
        <h5 className="city">À partir de {props.price}$</h5>
    </div>
    <button  className="book">Reserver</button>
</div>)
}