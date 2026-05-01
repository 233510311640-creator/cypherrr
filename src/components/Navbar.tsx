import { motion } from "motion/react";
import { Menu, X, Instagram, Twitter, Github } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:py-8 md:px-12 border-b border-white/5 bg-noir-black/80 backdrop-blur-md">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif font-black tracking-tighter"
        >
          H<span className="text-white italic">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] font-mono text-noir-400 hover:text-white transition-all hover:italic"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="flex items-center space-x-6 ml-6 border-l border-noir-800 pl-6">
            <Instagram className="w-3.5 h-3.5 cursor-pointer text-noir-500 hover:text-white transition-colors" />
            <Twitter className="w-3.5 h-3.5 cursor-pointer text-noir-500 hover:text-white transition-colors" />
            <Github className="w-3.5 h-3.5 cursor-pointer text-noir-500 hover:text-white transition-colors" />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 w-full h-screen bg-manga-black flex flex-col items-center justify-center space-y-8 z-40 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-display font-bold uppercase tracking-tighter"
            >
              {link.name}
            </a>
          ))}
          <button 
            className="absolute top-8 right-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
        </motion.div>
      )}
    </nav>
  );
}
