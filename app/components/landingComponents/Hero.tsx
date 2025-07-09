import logo from "/logo.png";
import appImage from "/supermercatosmart-app.png";
import { useAuth } from '../../contexts/AuthContext';

const Hero = () => {
    const { login } = useAuth();
  return (
    <div>
        <div className="flex items-center mb-8">
            <img src={logo} alt="Logo" className="w-24 h-24 mr-4 drop-shadow-lg" />
            <h1 className="font-cursive wrap text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Benvenuto in SupermercatoSMART</h1>
        </div>

        <div className="flex flex-col gap-2 md:flex-row bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full  items-center md:items-start mb-8">
           
            <div className=" text-left text-white">
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
            <div className="md:w-1/3">
                <img
                    src={appImage}
                    alt="App SupermercatoSMART"
                    className="w-80 max-w-xs drop-shadow-2xl rounded-xl border-4 border-white/30 mb-6"
                />
            </div>
            
        </div>
    </div>
  )
}

export default Hero