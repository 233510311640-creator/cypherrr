import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Exactly the files currently in /photgraphy images folder — 20 photos
const photos = [
  { src: "/photography/0EEC6BF3-85B8-4414-A9D1-CD6785ABB48E.jpeg",         label: "Frame 01" },
  { src: "/photography/1619995C-CA7F-43C6-A56B-61CB96D923E6.jpeg",         label: "Frame 02" },
  { src: "/photography/43F6FA2C-3939-474B-9A79-57D7A9416A7D.jpeg",         label: "Frame 03" },
  { src: "/photography/44CB2E56-2657-4ADF-97F2-0D3FC9B3E7AE.jpeg",         label: "Frame 04" },
  { src: "/photography/67CCCD08-38E9-46A9-B5CC-8B1356154024_1_201_a.jpeg", label: "Frame 05" },
  { src: "/photography/8E450533-33C1-4BC9-8F3D-9CD169054F74_1_201_a.jpeg", label: "Frame 06" },
  { src: "/photography/8E8AC0B4-68DD-411C-B7BC-6F70586C36E6.jpeg",         label: "Frame 07" },
  { src: "/photography/975DB45C-D720-4E93-80B2-B415A30F03C2.jpeg",         label: "Frame 08" },
  { src: "/photography/DSC_0098.JPG",                                       label: "Frame 09" },
  { src: "/photography/DSC_0181.JPG",                                       label: "Frame 10" },
  { src: "/photography/DSC_0315.JPG",                                       label: "Frame 11" },
  { src: "/photography/DSC_0724.JPG",                                       label: "Frame 12" },
  { src: "/photography/DSC_0729.JPG",                                       label: "Frame 13" },
  { src: "/photography/DSC_0739.JPG",                                       label: "Frame 14" },
  { src: "/photography/DSC_0745.JPG",                                       label: "Frame 15" },
  { src: "/photography/DSC_0992.JPG",                                       label: "Frame 16" },
  { src: "/photography/DSC_1009.JPG",                                       label: "Frame 17" },
  { src: "/photography/DSC_1038.JPG",                                       label: "Frame 18" },
  { src: "/photography/DSC_1039.JPG",                                       label: "Frame 19" },
  { src: "/photography/DSC_1050.JPG",                                       label: "Frame 20" },
];

// ─── Individual Photo Tile ────────────────────────────────────────────────────
interface PhotoTileProps {
  photo: { src: string; label: string };
  globalIndex: number;
  onOpen: (i: number) => void;
  className?: string;
}

function PhotoTile({ photo, globalIndex, onOpen, className = "" }: PhotoTileProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative w-full h-full overflow-hidden cursor-pointer border border-noir-900 group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(globalIndex)}
    >
      <img
        src={photo.src}
        alt={photo.label}
        loading="lazy"
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
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface PhotographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotographyModal({ isOpen, onClose }: PhotographyModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? 0 : (prev + 1) % photos.length));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { lightboxIndex !== null ? closeLightbox() : onClose(); }
      if (e.key === "ArrowLeft"  && lightboxIndex !== null) prevPhoto();
      if (e.key === "ArrowRight" && lightboxIndex !== null) nextPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, lightboxIndex, onClose, prevPhoto, nextPhoto]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Build groups of 5 (1 hero + 4 grid) ──
  const groups: { hero: typeof photos[0]; tiles: typeof photos; heroIndex: number }[] = [];
  let i = 0;
  while (i < photos.length) {
    const hero = photos[i];
    const tiles = photos.slice(i + 1, i + 5);
    groups.push({ hero, tiles, heroIndex: i });
    i += 5;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="photo-modal"
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
                Hanzo.Studio // MMXXIV
              </span>
              <button
                id="photography-modal-close"
                onClick={onClose}
                className="group flex items-center gap-3 text-noir-500 hover:text-white transition-colors duration-300"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] group-hover:italic">Close</span>
                <div className="w-8 h-8 border border-noir-800 group-hover:border-white flex items-center justify-center transition-all duration-300">
                  <X className="w-3.5 h-3.5" />
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
            <h2 className="text-5xl sm:text-7xl md:text-[8vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8] mb-4">
              Visual <span className="opacity-20">Archive</span>
            </h2>
            <p className="text-noir-500 font-mono text-[10px] uppercase tracking-[0.3em] max-w-sm leading-relaxed">
              A curated selection of captured moments — street, editorial, and analog vibe.
            </p>
          </motion.div>

          {/* ── Editorial Sections ── */}
          <div className="px-6 md:px-12 pb-24 space-y-3">
            {groups.map((group, groupIdx) => {
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
                    className="h-64 w-full"
                  >
                    <PhotoTile
                      photo={group.hero}
                      globalIndex={group.heroIndex}
                      onOpen={setLightboxIndex}
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
                      <div key={photo.src} className="relative" style={{ paddingBottom: "75%" }}>
                        <div className="absolute inset-0">
                          <PhotoTile
                            photo={photo}
                            globalIndex={group.heroIndex + si}
                            onOpen={setLightboxIndex}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                );
              }

              // Full group of 5 — editorial layout with alternating sides
              // The 2x2 grid height = 2 equal square cells + gap
              // The hero photo matches this exact height using the same ratio trick

              const heroCol = (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(groupIdx * 0.05, 0.4) }}
                  // This wrapper uses a CSS trick: 2 squares stacked = aspect 1:2 minus gap
                  // We use a fixed height relative approach via the grid row
                  className="relative"
                >
                  <PhotoTile
                    photo={group.hero}
                    globalIndex={group.heroIndex}
                    onOpen={setLightboxIndex}
                    className="absolute inset-0"
                  />
                </motion.div>
              );

              const gridCol = (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(groupIdx * 0.05 + 0.05, 0.45) }}
                  className="grid grid-cols-2 gap-3"
                >
                  {group.tiles.map((photo, si) => (
                    <div key={photo.src} className="relative" style={{ paddingBottom: "100%" }}>
                      <PhotoTile
                        photo={photo}
                        globalIndex={group.heroIndex + si + 1}
                        onOpen={setLightboxIndex}
                        className="absolute inset-0"
                      />
                    </div>
                  ))}
                </motion.div>
              );

              return (
                <div
                  key={groupIdx}
                  className="grid grid-cols-2 gap-3"
                  // Hero col matches the exact height of the 2x2 grid (2 squares + 1 gap)
                  // We achieve this by stretching with items-stretch and making hero absolute-fill
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
                              onOpen={setLightboxIndex}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3" style={{ gridAutoRows: "1fr" }}>
                        {group.tiles.map((photo, si) => (
                          <div key={photo.src} className="relative" style={{ paddingBottom: "100%" }}>
                            <div className="absolute inset-0">
                              <PhotoTile
                                photo={photo}
                                globalIndex={group.heroIndex + si + 1}
                                onOpen={setLightboxIndex}
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
                          <div key={photo.src} className="relative" style={{ paddingBottom: "100%" }}>
                            <div className="absolute inset-0">
                              <PhotoTile
                                photo={photo}
                                globalIndex={group.heroIndex + si + 1}
                                onOpen={setLightboxIndex}
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
                              onOpen={setLightboxIndex}
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
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-noir-black/98 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-noir-900 shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500">
                {photos[lightboxIndex].label} // {lightboxIndex + 1} of {photos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="group flex items-center gap-2 text-noir-500 hover:text-white transition-colors"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.3em]">Back to grid</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16 py-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].label}
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
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-noir-800 hover:border-white bg-noir-black/80 flex items-center justify-center text-noir-500 hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="lightbox-next"
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-noir-800 hover:border-white bg-noir-black/80 flex items-center justify-center text-noir-500 hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="px-6 py-3 border-t border-noir-900 shrink-0 overflow-x-auto">
              <div className="flex gap-2 w-max mx-auto">
                {photos.map((photo, idx) => (
                  <button
                    key={photo.src}
                    onClick={() => setLightboxIndex(idx)}
                    className={`w-12 h-12 shrink-0 border transition-all duration-300 overflow-hidden ${
                      idx === lightboxIndex
                        ? "border-white opacity-100"
                        : "border-noir-800 opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover grayscale" />
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
