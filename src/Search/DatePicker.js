import { DatePicker } from "antd";
import moment from 'moment';
import "antd/dist/reset.css";
import "./css/datepicker.css";
import dayjs from "dayjs";
export default function Date(props)
{
  console.log(props.dates)
    function disabledDate(current) {
        return current && current < moment().startOf('day');
      }
        return (
        <>
        <DatePicker.RangePicker defaultValue={[dayjs(props.dates[0],"YYYY-MM-DD"),dayjs(props.dates[1],"YYYY-MM-DD")]} onChange={(value)=>{
          if(value===null)
          return;
          console.log(value[0])
          let from = `${value[0].$y}-${(value[0].$M+1)>=10?value[0].$M+1:"0"+(value[0].$M+1)}-${value[0].$D>=10?value[0].$D:"0"+value[0].$D}`
          let to=`${value[1].$y}-${(value[1].$M+1)>10?value[1].$M+1:"0"+(value[1].$M+1)}-${value[1].$D>=10?value[1].$D:"0"+value[1].$D}`
          props.setDates([from,to])
          console.log([from,to])
          }} className="datepicker" placeholder={["Arrivée","Départ"]} disabledDate={disabledDate}/>
        </>
        
        )
}