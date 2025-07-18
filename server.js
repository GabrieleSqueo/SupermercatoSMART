import express from "express"
import cors from "cors"
import auth from "./routes/auth.js"
import products from "./routes/products.js"
import order from "./routes/order.js"
import { connectDB } from "./db.js"   

const app = express()
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'refreshToken']
}))
app.use(express.json())

// Connessione a MongoDB

connectDB()
  .then(() => {
    console.log("Database connesso con successo");
    app.use("/api", auth);
    app.use("/api", products);
    app.use("/api", order);

    // Gestore dell'errore nella connessione
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: "Errore del server" });
    });

    app.listen(PORT, () => {
      console.log(`Server attivo su http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Errore di connessione al database:", err);
    // In produzione, esci dal processo se la connessione fallisce
    process.exit(1);
  });