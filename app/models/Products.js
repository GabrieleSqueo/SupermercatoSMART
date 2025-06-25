import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: true
    
  },
  prezzo: {
    type: Number,
    required: true,
    unique: false
  },
  descrizione: {
    type: String,
    required: true
  }, 
  foto: {
    type: String,
    required: false
  }
});

// Usa la connessione esistente di mongoose
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;