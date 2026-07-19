/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import PhotographyModal from "./components/PhotographyModal";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="relative bg-noir-black min-h-screen border-8 border-noir-900 selection:bg-white selection:text-black overflow-x-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="site-loader fixed inset-0 z-[100] bg-noir-black flex flex-col items-center justify-center p-6"
          >
             <div className="text-4xl font-serif italic mb-8 tracking-tighter">H.</div>
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-full h-full bg-white"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 font-mono text-[9px] uppercase tracking-[0.5em] flex flex-col items-center"
            >
              <span>Authenticating Profile</span>
              <span className="mt-2 text-noir-500 animate-pulse italic">HANZO.STUDIO // MMXXVI</span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Navbar />
      
      <main className="relative">
        <Hero />
        <About />
        <div className="h-[15vh] md:h-[20vh] w-full flex items-center justify-center pointer-events-none overflow-hidden bg-noir-950 border-y border-noir-900">
           <div className="text-[15vw] md:text-[12vw] font-serif italic text-white/[0.03] uppercase leading-none whitespace-nowrap">
             EDITORIAL NOIR // VISUAL IDENTITY // CULTURAL ARTIFACTS
           </div>
        </div>
        <Skills onPhotographyClick={() => setPhotoModalOpen(true)} />
        <Contact />
      </main>

      {/* Photography Gallery Modal */}
      <PhotographyModal isOpen={photoModalOpen} onClose={() => setPhotoModalOpen(false)} />

      {/* Design Accents from Template */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 hidden md:flex flex-col gap-4 opacity-30 z-50">
        <div className="w-1 h-1 bg-white"></div>
        <div className="w-1 h-1 bg-white"></div>
        <div className="w-1 h-1 bg-white"></div>
      </div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[999] mix-blend-soft-light">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
