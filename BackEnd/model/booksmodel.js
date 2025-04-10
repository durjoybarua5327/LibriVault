import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  books: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      cover: { type: String, required: true },
      pdfUrl: { type: String, default: "#" },
      isPremium: { type: Boolean, default: false }
    }
  ]
});

const BookCategory = mongoose.model("BookCategory", bookSchema);

export default BookCategory;