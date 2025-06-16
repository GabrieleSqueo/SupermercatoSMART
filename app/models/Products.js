import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  prezzo: {
    type: Number,
    required: true,
    unique: true
  },
  descrizione: {
    type: String,
    required: true
  }
});

// Usa la connessione esistente di mongoose
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;