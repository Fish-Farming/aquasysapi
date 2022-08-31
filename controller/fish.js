const { MongoClient, ObjectId } = require("mongodb")
const mongoAuth = require('../auth/db.config.js')

const mongo_username = mongoAuth.configDB.user
const mongo_password = mongoAuth.configDB.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.configDB.host}`
const DATABASE_NAME = mongoAuth.configDB.dbname

const fish = {
  add(req, res) {
    console.log("New fish born")
    MongoClient.connect(CONNECTION_URI)
      .then((db)=>{
        db.db(DATABASE_NAME).collection("fish").insertOne(req.body, (err) => {
          if(err) {
            res.status(500).send({"status":500, "description":err})
          } else {
            res.status(201).send({"status":201, "description": "Data insert successfully"})
          }
        })
      })
      .catch((err)=> {
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      })
  }, 
  list(req,res) {
    console.log("List a fish")
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {
        const askfrom = { _id: ObjectId(req.params.id) }
        db.db(DATABASE_NAME).collection("fish").findOne(askfrom).then((fish) => {
         
            console.log(fish)
            res.send(fish)
          
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
  },
  listAll(req, res) {
    console.log("List fish")
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {
        const askfrom = {}
        db.db(DATABASE_NAME).collection("fish").find(askfrom).toArray((err, fish) => {
          if(err) {
            res.status(500).send({"status": 500, "desc": err})
          } else {
            console.log(fish)
            res.send(fish)
          }
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
  },
  update(req, res) {
    //  id: {string} 
    //  u: {object}
    //
    console.log("Update fish")
    const update = {  $set: req.body.u } 
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {
        const askfrom = {}
        db.db(DATABASE_NAME).collection("fish").updateOne({_id: ObjectId(req.body.id)}, update, {}).then((result) => {
          
          if(result.modifiedCount>=1) {
            res.status(201).send({"code": 201, "desc": "update successfully"})
          } else {
            res.status(400).send({"code": 400, "desc": "No document updated"})
          }
        }).catch((err)=> {
          res.status(500).send({"code": 500, "desc": err})
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
  }
}

module.exports = fish