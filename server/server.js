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


app.post("/hotels",(req,res)=>
{
    let sw=req.body.bounds["_southWest"]
    let ne=req.body.bounds["_northEast"]
    connection.query(`SELECT * FROM establishment WHERE latitude >= ${sw.lat} AND latitude <= ${ne.lat} AND longitude >= ${sw.lng} AND longitude <=${ne.lng}`,(err,result)=>
    {
        if(err)
            throw err
        else
            console.log(result)
    })
    res.send("done")
})


app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/public/back.png")
})
app.listen(8000,()=>
{
    console.log("server listening on port 8000")
})