import { DatePicker } from "antd";
import moment from 'moment';
import "antd/dist/reset.css";
import "./css/datepicker.css";
export default function Test()
{
    function disabledDate(current) {
        return current && current < moment().startOf('day');
      }
        return (
        <>
        <DatePicker.RangePicker className="datepicker" placeholder={["Arrivée","Départ"]} disabledDate={disabledDate}/>
        </>
        
        )
}