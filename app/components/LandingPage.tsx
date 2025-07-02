import { useAuth } from '../contexts/AuthContext';
import logo from "../../public/logo.png";
import appImage from "../../public/supermercatosmart-app.png";

export default function LandingPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-400 text-white px-4 py-8">
      <div className="flex items-center mb-8">
        <img src={logo} alt="Logo" className="w-24 h-24 mr-4 drop-shadow-lg" />
        <h1 className="font-cursive text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Benvenuto in SupermercatoSMART</h1>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="flex-1 text-left text-white">
          <p className="text-lg md:text-2xl mb-6 leading-relaxed font-medium">
            Il supermercato del futuro è già qui.<br />
            SupermercatoSMART ti offre una spesa intelligente, veloce e personalizzata, direttamente dal tuo smartphone.
          </p>
          <ul className="list-none space-y-2 text-base md:text-lg mb-6">
            <li className="flex items-center gap-2"><span>🛒</span> Tanti prodotti e disponibilità</li>
            <li className="flex items-center gap-2"><span>📦</span> Raccomandazioni basate sulle tue abitudini</li>
            <li className="flex items-center gap-2"><span>🚀</span> Spesa pronta al ritiro e tracking delle consegne in real time</li>
            <li className="flex items-center gap-2"><span>📱</span> Controllo completo via app</li>
          </ul>
          <button className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg shadow hover:bg-blue-700 hover:text-white transition-colors text-lg" onClick={login}>
            Inizia ora
          </button>
        </div>
        <img
          src={appImage}
          alt="App SupermercatoSMART"
          className="hidden md:block absolute -right-40 top-8 w-80 max-w-xs drop-shadow-2xl rounded-xl border-4 border-white/30"
        />
      </div>

      {/* Presentazione in basso */}
      <div className="max-w-2xl w-full bg-black/20 rounded-xl p-6 mt-6 text-white text-left shadow-lg backdrop-blur-md">
        <span className="block font-bold text-lg mb-2">Chi siamo?</span>
        Ehilà! Siamo Gabriele, Sara e Costantina, studenti universitari pugliesi. Ognuno di noi porta il proprio contributo unico al progetto, e la nostra collaborazione è ciò che ci permette di affrontare le sfide e superarle con successo. Siamo convinti che, combinando le nostre competenze, possiamo creare qualcosa di veramente utile e innovativo. Abbiamo realizzato un supermercato online dove il cliente può aggiungere ordini in modo semplice e intuitivo.
      </div>
    </div>
  );
}