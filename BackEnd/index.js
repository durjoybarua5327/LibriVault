import express from "express"
import dotenv from 'dotenv'
import mongoose, { mongo } from "mongoose"
import bookRoute from "./Route/book_route.js"
import cors from 'cors';
dotenv.config()

const app = express()
app.use(cors());
const port = process.env.PORT || 3001
const URI = process.env.MongoDburi
try {
    mongoose.connect(URI, {
      
    })
    console.log("Connected to mongodb")
} catch (error) {
    console.log("Error", error)
}
app.use("/book", bookRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
