import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import heroImg from "../assets/spikes.jpg";

export default function Hero() {
  return (
    <section id="portfolio" className="relative min-h-screen flex items-center px-6 md:px-12 pt-24 overflow-hidden editorial-grid">
      {/* Background Manga Lines Pattern */}
      <div className="absolute inset-0 manga-lines opacity-10 pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-4 text-noir-500 font-mono text-[9px] uppercase tracking-[0.4em]"
            >
              <div className="w-12 h-px bg-noir-800"></div>
              <span>Based in the burning capital of the world</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-7xl md:text-[11vw] font-serif italic font-black leading-[0.8] tracking-tighter"
            >
              Hanzo<span className="text-noir-500 font-sans not-italic">.</span>
            </motion.h1>
            
             <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-noir-400 max-w-sm text-[11px] uppercase tracking-[0.2em] leading-loose pl-1 border-l border-noir-800"
            >
              Photographer. Editor. Designer. <br />
              Synthesizing cinematic narratives into high-contrast visual systems.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            <a href="https://steamcommunity.com/profiles/76561199119154440/inventory" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-6 border border-white px-10 py-5 font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500">
              <span>Hanzo's Inventory</span>
              <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
            <div className="hidden sm:flex flex-col justify-center">
               <span className="text-[9px] uppercase tracking-[0.3em] text-noir-600 block mb-1 italic">Casual Gamer</span>
               <div className="flex gap-2">
                 {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-noir-800"></div>)}
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] flex items-center justify-center"
        >
          {/* Main Visual Panel */}
          <div className="relative w-full h-full bg-noir-950 border border-white/10 p-4 group">
             <div className="relative w-full h-full overflow-hidden grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={heroImg} 
                  alt="Hanzo Visual"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-transparent to-transparent opacity-60"></div>
             </div>
          </div>

          {/* Abstract Floating Data */}
          <div className="absolute top-12 left-0 -translate-x-1/2 p-4 bg-noir-900 border border-white/5 backdrop-blur-xl hidden xl:block">
            <div className="text-[9px] font-mono text-noir-500 uppercase tracking-widest mb-4">Transmission Info</div>
            <div className="space-y-2">
              <div className="h-1.5 w-32 bg-white/5 overflow-hidden">
                <div className="h-full w-2/3 bg-noir-500"></div>
              </div>
              <div className="h-1.5 w-24 bg-white/5 overflow-hidden">
                <div className="h-full w-1/2 bg-noir-500"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
