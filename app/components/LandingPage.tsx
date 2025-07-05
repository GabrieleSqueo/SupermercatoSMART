import Hero from './landingComponents/Hero';
import AboutUs from './landingComponents/AboutUs';

export default function LandingPage() {
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-400 text-white px-4 py-8">
      <Hero />
      {/* Presentazione in basso */}
      <AboutUs />
    </div>
  );
}