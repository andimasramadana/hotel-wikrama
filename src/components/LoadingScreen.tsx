import { useEffect, useState } from "react";
import wikikamaLogo from "../assets/wikrama-logo.png";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Simulasi progres loading agar terlihat lebih nyata
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      {/* Container Logo dengan Efek Glowing & Pulse */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <img 
          src={wikikamaLogo} 
          alt="Wikrama Logo" 
          className="w-24 h-24 md:w-32 md:h-32 object-contain relative animate-bounce duration-[2000ms]" 
        />
      </div>

      {/* Teks Branding */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-bold tracking-widest text-foreground">WIKRAMA HOTEL</h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-accent mt-1">Bogor · Indonesia</p>
      </div>

      {/* Progress Bar yang Elegan */}
      <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <span className="text-[10px] text-muted-foreground mt-2 font-mono">
        {progress}% Loading...
      </span>
    </div>
  );
}