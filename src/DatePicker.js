import { DatePicker } from "antd";
import moment from 'moment';
import "antd/dist/reset.css";
import "./css/datepicker.css";
export default function Test(props)
{
    function disabledDate(current) {
        return current && current < moment().startOf('day');
      }
        return (
        <>
        <DatePicker.RangePicker onChange={(value)=>{
          if(value===null)
          return;
          let from = `${value[0].$y}-${value[0].$M+1}-${value[0].$D}`
          let to=`${value[1].$y}-${value[1].$M+1}-${value[1].$D}`
          props.setDates([from,to])
          console.log([from,to])
          }} className="datepicker" placeholder={["Arrivée","Départ"]} disabledDate={disabledDate}/>
        </>
        
        )
}