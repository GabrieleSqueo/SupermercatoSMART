import User from "../app/models/User.js";
import bcrypt from "bcrypt";
import { connectDB } from '../db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const {name, email, password} = req.body;
    console.log("Dati ricevuti:", { name, email, password: "***" });

    if (!name || !email || !password) {
      return res.status(400).json({message: "Tutti i campi sono obligatori"});
    }

    console.log("Verifico se l'email esiste:", email);
    const existingUser = await User.findOne({email});
    console.log("Risultato ricerca utente:", existingUser ? "Utente trovato" : "Nessun utente trovato");
    
    if (existingUser) {
      return res.status(400).json({message: "Email già registrata"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creo nuovo utente");
    const userToCreate = new User({
      name,
      email,
      password: hashedPassword
    });

    await userToCreate.save();
    res.status(200).json({message: "Utente registrato con successo"});
  } catch (error) {
    console.error("Errore nel middleware di registrazione:", error);
    res.status(500).json({message: "Errore del server"});
  }
}
