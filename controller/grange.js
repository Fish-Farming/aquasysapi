const { MongoClient, ObjectId } = require("mongodb")
const mongoAuth = require('../auth/db.config.js')

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
    
  },
  owner (req, res) {
    console.log("gain ownership information")
    const user = req.body.token
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {        
        db.db(DATABASE_NAME).collection("grange").find({contact: ObjectId(user)}).toArray((err, grange) => {
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