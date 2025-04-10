import BookCategory from "../model/booksmodel";


export const getBook= async (req, res)=>{
    try {
        const Books= await BookCategory.find()
        res.status(100).json(Books)

    } catch ( error) {
        console.log("Error",error)
        res.status(500).json(Books)
    }
}
