import express from "express"
import dotenv from 'dotenv'
import mongoose, { mongo } from "mongoose"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const URI = process.env.MongoDburi
try {
    mongoose.connect(URI, {})
    console.log("Connected to mongodb")
} catch (error) {
    console.log("Error", error)
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
