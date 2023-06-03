const express=require("express")
const cors=require("cors")
const mysql=require("mysql")
const bodyParser = require('body-parser');
const app =express()
app.use(bodyParser.json())
app.use("/images",express.static(__dirname+"/public"))
const connection =mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"hotelio"
    })
connection.connect(()=>
{
    console.log("connection established to mysql server")
})
app.use(cors())

function getHotelsinBounds(bounds,from ,to )
{

    console.log(from)
    console.log(to)
    console.log(bounds)
    let sw=bounds["_southWest"];
    let ne=bounds["_northEast"];
    return new Promise((res,rej)=>
    {
        connection.query(`SELECT * from establishment where ( EstabId in (SELECT EstabId from reservation where (ArrivalDate >'${to}' or DeparatureDate < '${from}')) or (EstabId not in (SELECT EstabId from reservation))) and latitude >= ${sw.lat} AND latitude <= ${ne.lat} AND longitude >= ${sw.lng} AND longitude <=${ne.lng}`,(err,result)=>
    {
        if(err)
            throw err
        else{
            result.map((value)=>
            {
                value.Images=value.Images.split(",")
            })
            console.log(result)
            res(result)
        }
    })
    })
}

app.post("/hotels",async (req,res)=>
{
    let from = req.body.from
    let to=req.body.to
    let bounds=req.body.bounds
    let response= await getHotelsinBounds(bounds,from,to)
    res.send(response);
})


app.get("/",(req,res)=>
{
    console.log(req.ip)
    console.log(req.headers)
    res.sendFile(__dirname+"/public/back.png")
})
app.listen(8000,()=>
{
    console.log("server listening on port 8000")
})