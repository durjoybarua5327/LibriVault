import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const URI = process.env.MongoDburi

app.get('/', (req, res) => {
  res.send('ha ha!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
