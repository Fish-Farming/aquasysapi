const { MongoClient, ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoAuth = require('../auth/db.config.js')

const mongo_username = mongoAuth.configDB.user
const mongo_password = mongoAuth.configDB.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.configDB.host}`
const DATABASE_NAME = mongoAuth.configDB.dbname

const user = {
  userAuth(req, res) {
    console.log(`User Auth `)
    MongoClient.connect(CONNECTION_URI)
      .then((db) => {
        const askfrom = { email: req.body.aid }
        db.db(DATABASE_NAME).collection("users").findOne(askfrom).then((user) => {
          if (!user) 
            res.status(403).send({ "code": 403, "desc": "Login failed" })
          else {
            bcrypt.compare(req.body.code, user.password).then((validPass) => {
              if (!validPass) res.status(403).send({ "code": 403, "desc": "login failed" })
              else {
                const token = jwt.sign({_id: user._id }, process.env.TOKEN_SECRET)
                res.header("auth-token").send({ "token": token })
              }
            })
          }
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
  },
  userInfo(req, res) {
    console.log(`User get information`)
    const i = jwt.decode(req.body.token)
    MongoClient.connect(CONNECTION_URI)
      .then((db)=>{
        db.db(DATABASE_NAME).collection("users").findOne({_id: ObjectId(i._id)}).then((user) => {
          const refine = {
            firstname: user.firstname,
            lastname: user.lastname,
            nickname: user.nickname,
            phone: user.phone,
            email: user.email,
            management: user.management
          }
          res.status(200).send(refine)
        })  
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).send({ "code": 500, "desc": err })
      })
   
  },
  userUpdate(req, res) {
    //  token: {string} 
    //  u: {object}
    //
    console.log(`User Info Update`)
    const token = jwt.decode(req.body.token)
    const u = req.body.u
    if(u.hasOwnProperty("password")) {
      bcrypt.hash(u.password, 10).then((result) => {
        u.password = result
      })
    }
    const update = {  $set: u }    
    MongoClient.connect(CONNECTION_URI)
      .then((db)=>{
        db.db(DATABASE_NAME).collection("users").updateOne({_id: ObjectId(token._id)}, update, {}).then((result) => {
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

module.exports = user