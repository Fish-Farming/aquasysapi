const express = require('express')
const cors = require ('cors')
const route = require('./routes/v1.route')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/v1', route)


const listener = app.listen(process.env.PORT || 18888, ()=> {
  console.log(`Server is ready at ${listener.address().port}`)
})

