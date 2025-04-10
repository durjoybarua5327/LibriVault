import BookCategory from "../model/booksmodel.js";


export const getBook= async (req, res)=>{
    try {
        const Books= await BookCategory.find()
        res.status(200).json(Books)

    } catch ( error) {
        console.log("Error",error)
        res.status(500).json({ error: "Internal Server Error" });

    }
}
