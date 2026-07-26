import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photos, type PortfolioPhoto } from "../data/photos";

interface PhotoTileProps {
  photo: PortfolioPhoto;
  globalIndex: number;
  onOpen: (i: number) => void;
  className?: string;
}

function PhotoTile({ photo, globalIndex, onOpen, className = "" }: PhotoTileProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Open ${photo.label}: ${photo.alt}`}
      className={`relative block w-full h-full overflow-hidden cursor-pointer border border-noir-900 group text-left appearance-none focus-visible:outline-none focus-visible:border-white ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onOpen(globalIndex)}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(globalIndex);
        }
      }}
    >
      <img
        src={photo.thumbnail.src}
        alt={photo.alt}
        width={photo.thumbnail.width}
        height={photo.thumbnail.height}
        sizes="(min-width: 1024px) 25vw, 50vw"
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100 ${
          hovered ? "grayscale-0 brightness-90" : "grayscale brightness-50"
        }`}
      />
      {/* Hover label */}
      <div
        className={`absolute inset-0 bg-noir-black/50 transition-opacity duration-500 flex items-end p-3 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/60 relative z-10">
          {photo.label}
        </span>
      </div>
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20 pointer-events-none z-10" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20 pointer-events-none z-10" />
    </button>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface PhotographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getPhotoIndexFromLocation = () => {
  const match = window.location.hash.match(/^#photography\/(\d+)$/);
  if (!match) return null;

  const index = Number(match[1]) - 1;
  return index >= 0 && index < photos.length ? index : null;
};

const photoGroups: { hero: PortfolioPhoto; tiles: PortfolioPhoto[]; heroIndex: number }[] = [];

for (let index = 0; index < photos.length; index += 5) {
  photoGroups.push({
    hero: photos[index],
    tiles: photos.slice(index + 1, index + 5),
    heroIndex: index,
  });
}

export default function PhotographyModal({ isOpen, onClose }: PhotographyModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(getPhotoIndexFromLocation);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = useCallback((index: number) => {
    window.history.pushState({ portfolioView: "photo" }, "", `#photography/${index + 1}`);
    setLightboxIndex(index);
  }, []);

  const showPhoto = useCallback((index: number) => {
    window.history.replaceState({ portfolioView: "photo" }, "", `#photography/${index + 1}`);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    if (window.location.hash.match(/^#photography\/\d+$/)) {
      if (window.history.state?.portfolioView === "photo") {
        window.history.back();
        return;
      }

      window.history.replaceState({ portfolioView: "photography" }, "", "#photography");
    }

    setLightboxIndex(null);
  }, []);
  const closeModal = useCallback(() => {
    setLightboxIndex(null);
    onClose();
  }, [onClose]);

  const prevPhoto = useCallback(() => {
    const nextIndex = lightboxIndex === null ? 0 : (lightboxIndex - 1 + photos.length) % photos.length;
    showPhoto(nextIndex);
  }, [lightboxIndex, showPhoto]);

  const nextPhoto = useCallback(() => {
    const nextIndex = lightboxIndex === null ? 0 : (lightboxIndex + 1) % photos.length;
    showPhoto(nextIndex);
  }, [lightboxIndex, showPhoto]);

  useEffect(() => {
    if (!isOpen) return;

    const syncLightboxWithHistory = () => {
      setLightboxIndex(getPhotoIndexFromLocation());
    };

    window.addEventListener("popstate", syncLightboxWithHistory);
    window.addEventListener("hashchange", syncLightboxWithHistory);

    return () => {
      window.removeEventListener("popstate", syncLightboxWithHistory);
      window.removeEventListener("hashchange", syncLightboxWithHistory);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    lightboxCloseRef.current?.focus();

    return () => previouslyFocused?.focus();
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        isLightboxOpen ? closeLightbox() : closeModal();
        return;
      }

      if (isLightboxOpen && event.key === "ArrowLeft") {
        event.preventDefault();
        prevPhoto();
        return;
      }

      if (isLightboxOpen && event.key === "ArrowRight") {
        event.preventDefault();
        nextPhoto();
        return;
      }

      if (event.key !== "Tab") return;

      const activeDialog = isLightboxOpen ? lightboxRef.current : modalRef.current;
      const focusableElements = activeDialog?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLightbox, closeModal, isLightboxOpen, isOpen, nextPhoto, prevPhoto]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          key="photo-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photography-title"
          aria-hidden={isLightboxOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-noir-black overflow-y-auto"
        >
          {/* Noise */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[201] mix-blend-soft-light">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise-gallery">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise-gallery)" />
            </svg>
          </div>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="sticky top-0 z-[210] flex items-center justify-between px-6 md:px-12 py-5 border-b border-noir-900 bg-noir-black/90 backdrop-blur-md"
          >
            <div className="flex items-center gap-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500 border-l border-noir-800 pl-4">
                Photography // Archive
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-noir-700">
                {photos.length} Frames
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden sm:block font-mono text-[8px] text-noir-700 uppercase tracking-[0.4em] italic">
                Hanzo.Studio // MMXXVI
              </span>
              <button
                ref={modalCloseRef}
                id="photography-modal-close"
                type="button"
                onClick={closeModal}
                aria-label="Close photography gallery"
                className="group flex items-center gap-3 text-noir-500 hover:text-white transition-colors duration-300"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] group-hover:italic">Close</span>
                <div className="w-8 h-8 border border-noir-800 group-hover:border-white flex items-center justify-center transition-all duration-300">
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* ── Title ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="px-6 md:px-12 pt-14 pb-10"
          >
            <h2 id="photography-title" className="text-5xl sm:text-7xl md:text-[8vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8] mb-4">
              Visual <span className="opacity-20">Archive</span>
            </h2>
            <p className="text-noir-500 font-mono text-[10px] uppercase tracking-[0.3em] max-w-sm leading-relaxed">
              A curated selection of captured moments — street, editorial, and analog vibe.
            </p>
          </motion.div>

          {/* ── Editorial Sections ── */}
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 pb-24 space-y-3">
            {photoGroups.map((group, groupIdx) => {
              // Even index (0, 2, 4…) → big photo LEFT; odd (1, 3, 5…) → big photo RIGHT
              const bigOnLeft = groupIdx % 2 === 0;

              // Partial last group with < 5 photos
              if (group.tiles.length === 0) {
                // Only 1 photo — full-width banner
                return (
                  <motion.div
                    key={groupIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(groupIdx * 0.05, 0.4) }}
                    className="h-48 md:h-56 w-full"
                  >
                    <PhotoTile
                      photo={group.hero}
                      globalIndex={group.heroIndex}
                      onOpen={openLightbox}
                    />
                  </motion.div>
                );
              }

              if (group.tiles.length < 4) {
                // 2-4 photos — equal columns
                const all = [group.hero, ...group.tiles];
                return (
                  <motion.div
                    key={groupIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(groupIdx * 0.05, 0.4) }}
                    className="grid gap-3"
                    style={{ gridTemplateColumns: `repeat(${all.length}, 1fr)` }}
                  >
                    {all.map((photo, si) => (
                      <div key={photo.thumbnail.src} className="relative" style={{ paddingBottom: "62.5%" }}>
                        <div className="absolute inset-0">
                          <PhotoTile
                            photo={photo}
                            globalIndex={group.heroIndex + si}
                            onOpen={openLightbox}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                );
              }

              // Full group of 5 — compact editorial layout with alternating sides
              // The hero stretches to match the shallower 2x2 tile grid

              return (
                <div
                  key={groupIdx}
                  className="grid grid-cols-2 gap-3"
                  // Stretch the hero column to the exact height of the 2x2 grid
                  style={{ alignItems: "stretch" }}
                >
                  {bigOnLeft ? (
                    <>
                      {/* Wrapper that forces hero to match sibling height */}
                      <div className="relative min-h-0" style={{ display: "flex", flexDirection: "column" }}>
                        <div className="flex-1 relative">
                          <div className="absolute inset-0">
                            <PhotoTile
                              photo={group.hero}
                              globalIndex={group.heroIndex}
                              onOpen={openLightbox}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3" style={{ gridAutoRows: "1fr" }}>
                        {group.tiles.map((photo, si) => (
                          <div key={photo.thumbnail.src} className="relative" style={{ paddingBottom: "72%" }}>
                            <div className="absolute inset-0">
                              <PhotoTile
                                photo={photo}
                                globalIndex={group.heroIndex + si + 1}
                                onOpen={openLightbox}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3" style={{ gridAutoRows: "1fr" }}>
                        {group.tiles.map((photo, si) => (
                          <div key={photo.thumbnail.src} className="relative" style={{ paddingBottom: "72%" }}>
                            <div className="absolute inset-0">
                              <PhotoTile
                                photo={photo}
                                globalIndex={group.heroIndex + si + 1}
                                onOpen={openLightbox}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative min-h-0" style={{ display: "flex", flexDirection: "column" }}>
                        <div className="flex-1 relative">
                          <div className="absolute inset-0">
                            <PhotoTile
                              photo={group.hero}
                              globalIndex={group.heroIndex}
                              onOpen={openLightbox}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer accent */}
          <div className="px-6 md:px-12 pb-16 flex items-center gap-6 border-t border-noir-900 pt-8">
            <div className="w-12 h-px bg-white/20" />
            <span className="font-mono text-[8px] text-noir-700 uppercase tracking-[0.4em]">
              End of Archive // {photos.length} Frames
            </span>
          </div>
        </motion.div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && (
          <motion.div
            ref={lightboxRef}
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-noir-black/98 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-noir-900 shrink-0">
              <span id="lightbox-title" className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500">
                {photos[lightboxIndex].label} // {lightboxIndex + 1} of {photos.length}
              </span>
              <button
                ref={lightboxCloseRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox and return to gallery"
                className="group flex items-center gap-2 text-noir-500 hover:text-white transition-colors"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.3em]">Back to grid</span>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16 py-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={photos[lightboxIndex].lightbox.src}
                  alt={photos[lightboxIndex].alt}
                  width={photos[lightboxIndex].lightbox.width}
                  height={photos[lightboxIndex].lightbox.height}
                  sizes="100vw"
                  decoding="async"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-full max-h-full object-contain border border-noir-900 shadow-2xl"
                  style={{ maxHeight: "calc(100vh - 140px)" }}
                />
              </AnimatePresence>

              <button
                id="lightbox-prev"
                type="button"
                onClick={prevPhoto}
                aria-label="Show previous photograph"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-noir-800 hover:border-white bg-noir-black/80 flex items-center justify-center text-noir-500 hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                id="lightbox-next"
                type="button"
                onClick={nextPhoto}
                aria-label="Show next photograph"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-noir-800 hover:border-white bg-noir-black/80 flex items-center justify-center text-noir-500 hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="px-6 py-3 border-t border-noir-900 shrink-0 overflow-x-auto">
              <div className="flex gap-2 w-max mx-auto">
                {photos.map((photo, idx) => (
                  <button
                    key={photo.thumbnail.src}
                    type="button"
                    onClick={() => showPhoto(idx)}
                    aria-label={`Show ${photo.label}: ${photo.alt}`}
                    aria-current={idx === lightboxIndex ? "true" : undefined}
                    className={`w-12 h-12 shrink-0 border transition-all duration-300 overflow-hidden ${
                      idx === lightboxIndex
                        ? "border-white opacity-100"
                        : "border-noir-800 opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img
                      src={photo.thumbnail.src}
                      alt=""
                      width={photo.thumbnail.width}
                      height={photo.thumbnail.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
