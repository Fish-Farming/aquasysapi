const { MongoClient, ObjectId } = require("mongodb")
const mongoAuth = require('../auth/db.config.js')
const jwt = require("jsonwebtoken")

const mongo_username = mongoAuth.configDB.user
const mongo_password = mongoAuth.configDB.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.configDB.host}`
const DATABASE_NAME = mongoAuth.configDB.dbname

const grange = {
  addGrange(req, res) {
    
  },
  addPond(req, res) {
    
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
    
  },
  updateGrange (req, res) {
    
  }, 
  updatePond (req, res) {
    
  }
}

module.exports = grange