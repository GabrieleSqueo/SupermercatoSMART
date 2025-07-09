const products = async (req, res) => {
  try {
    // Qui puoi aggiungere logica se serve, oppure rispondi direttamente
    res.status(200).json({ message: "Endpoint prodotti raggiunto" });
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
}

export default products