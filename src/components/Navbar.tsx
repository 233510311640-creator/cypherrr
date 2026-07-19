import { motion } from "motion/react";
import { Menu, X, Instagram, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      label: "Instagram profile",
      href: "https://www.instagram.com/bhumit_.singh?igsh=NDM3d3M3YXRxa24y&utm_source=qr",
      Icon: Instagram,
    },
    {
      label: "GitHub profile",
      href: "https://github.com/233510311640-creator",
      Icon: Github,
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const applicationRoot = document.getElementById("root");
    document.body.style.overflow = "hidden";
    applicationRoot?.setAttribute("inert", "");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      applicationRoot?.removeAttribute("inert");
      (previouslyFocused ?? openButtonRef.current)?.focus();
    };
  }, [isOpen]);

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
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="text-noir-500 hover:text-white transition-colors focus-visible:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4"
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          ref={openButtonRef}
          type="button"
          className="md:hidden text-white"
          onClick={() => setIsOpen(current => !current)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen &&
        createPortal(
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-noir-black flex flex-col items-center justify-center space-y-8 z-[60] md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-sans font-bold uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute top-8 right-6"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>
          </motion.div>,
          document.body,
        )}
    </nav>
  );
}
