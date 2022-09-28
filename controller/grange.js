const { MongoClient, ObjectId } = require("mongodb");
const mongoAuth = require('../auth/db.config.js');
const jwt = require("jsonwebtoken");
//const fetch = require("node-fetch");
const request = require("request")

const mongo_username = mongoAuth.configDB.user
const mongo_password = mongoAuth.configDB.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.configDB.host}`
const DATABASE_NAME = mongoAuth.configDB.dbname

const aquaapiUrl = "https://aquagropsensors-iot-uoffmbfytz.cn-hongkong.fcapp.run/sg"

const grange = {
  addGrange(req, res) {
    res.send({"status": 501, "desc": "NExt Phase"});
  },
  addPond(req, res) {
    res.send({"status": 501, "desc": "NExt Phase"});
  },
  manage(req, res) {
    console.log("fish pond management")
    const user = jwt.decode(req.body.token)
    console.log(user)
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {        
        db.db(DATABASE_NAME).collection("grange").aggregate([{"$match":{"pond.manage": ObjectId(user._id)}}]).toArray((err, grange) => {
          if(err) {
            res.status(500).send({"status": 500, "desc": err})
          } else {
            console.log(grange)
            res.send(grange)
          }
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
  },
  owner (req, res) {
    console.log("gain ownership information")
    const user = jwt.decode(req.body.token)
    console.log(user)
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {        
        db.db(DATABASE_NAME).collection("grange").find({contact: ObjectId(user._id)}).toArray((err, grange) => {
          if(err) {
            res.status(500).send({"status": 500, "desc": err})
          } else {
            console.log(grange)
            res.send(grange)
          }
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
  },
  pondSensors (req, res) {
    const sensorID = req.params.id
    const dateonly = req.params.date
    const yyyy = dateonly.substring(0, 4)
    const mm = dateonly.substring(4, 6)
    const dd = dateonly.substring(6)    

    console.log(`pond sensor group ${sensorID} retrieve from ${yyyy}.${mm}.${dd} `)
    const connectURL = `${aquaapiUrl}/${sensorID}/${yyyy}/${mm}/${dd}`
    //console.log(connectURL)
    request(connectURL, (error, response, body) =>{
      if(error) {
        res.status(500).send({"status": 500, "desc": error});
      }
      console.log(response.statusCode);
      const content = JSON.parse(body);
      if(content.data.length>0) {
        res.send(content.data);
      } else {
        res.send([]);    
      }
    })
    /*fetch(connectURL)
      .then((response)=> response.json())
      .then((data)=>{
        console.log(data)
        //if(data.data.length>0)
          res.send(data.data)
        //else 
        //  res.status(404).send({"status":404, "desc": "No data found"})
      })*/
  },
  updateGrange (req, res) {
    res.send({"status": 501, "desc": "NExt Phase"});
  }, 
  updatePond (req, res) {
    res.send({"status": 501, "desc": "NExt Phase"});
  }
}

module.exports = grange