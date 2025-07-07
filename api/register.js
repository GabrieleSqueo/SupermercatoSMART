import User from '../app/models/User.js';
import bcrypt from 'bcrypt';
import { connectDB } from '../app/utils/db.js';

export default async function handler(req, res) {
  await connectDB();
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email già registrata" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "Utente registrato con successo" });
  } catch (error) {
    console.error("Errore nella registrazione:", error);
    res.status(500).json({ message: "Errore del server" });
  }
} 