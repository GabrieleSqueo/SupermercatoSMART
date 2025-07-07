import express from 'express';
import Product from '../models/Products.js';
import productMiddleware from "../../api/products.js"
import newProductsMiddleware from "../../api/newProducts.js";

const router = express.Router();

router.get('/products',productMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Non ci sono prodotti" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error);
    return res.status(500).json({ message: "Errore del server" });
  }
});

router.post("/newProducts", newProductsMiddleware, async(req, res) =>{
  try {
      console.log(req.productToCreate)
      await req.productToCreate.save()
       res.status(200).json({message: "Prodotto aggiunto con successo" })
  } catch(error) {
       console.error("Errore durante la creazione prodotto:", error);
        res.status(500).json({message: "Errore durante la creazione prodotto"});
  }
})
export default router; 