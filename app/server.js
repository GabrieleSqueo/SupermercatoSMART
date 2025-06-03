import express from "express"
import cors from "cors"
import auth from "./routes/auth.js"
import { connectDB } from "./utils/db.js"   

const app = express()
const PORT = 5000;

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()
.then(() => {
    console.log("Database connesso con successo");
})
.catch((err) => {
    console.error("Errore di connessione al database:", err);
});

app.use("/api", auth)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Errore del server" });
});

app.listen(PORT, ()=> {
    console.log(`Server attivo su http://localhost:${PORT}`);
})