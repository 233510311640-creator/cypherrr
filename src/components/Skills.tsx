import { motion } from "motion/react";
import { Camera, Video, Palette, Target } from "lucide-react";

const skillCategories = [
  {
    title: "Photography",
    icon: <Camera className="w-6 h-6" />,
    skills: ["Post-Processing", "Color Grading", "Street Photography", "Analog Vibe"],
    description: "WORKED AS A PHOTOGRAPHER AND LATER LED THE PHOTOGRAPHY TEAM."
  },
  {
    title: "Video Production",
    icon: <Video className="w-6 h-6" />,
    skills: ["ALight Mtion", "Davinci Resolve", "Capcut"],
    description: " had little experiences there but willing to share and learn in that area"
  },
  {
    title: "Graphic Design",
    icon: <Palette className="w-6 h-6" />,
    skills: ["Identity Design", "Digital Illustration", "Typography", "Branding"],
    description: "Love to create the output in the form of designs"
  },
  {
    title: "Gaming & Tech",
    icon: <Target className="w-6 h-6" />,
    skills: ["Competitive Play", "Hardware Optimization", "Community Management", "Strategy"],
    description: "casual competitive player, love to play more low cortisoll type game"
  }
];

interface SkillsProps {
  onPhotographyClick?: () => void;
}

export default function Skills({ onPhotographyClick }: SkillsProps) {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-12 bg-noir-black border-t border-noir-900">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500 block mb-6 px-1 border-l border-noir-800">Arsenal // 02</span>
            <h2 className="text-5xl sm:text-7xl md:text-[8vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8]">
              Creative <span className="opacity-20">Systems</span>
            </h2>
          </div>
          <p className="text-noir-500 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed max-w-xs italic">
            I do things for fun not an expert of anything but a active learner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => {
            const isPhotography = cat.title === "Photography";
            const isUnderWork = !isPhotography;
            return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={isPhotography ? onPhotographyClick : undefined}
              onKeyDown={isPhotography ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onPhotographyClick?.();
                }
              } : undefined}
              role={isPhotography ? "button" : undefined}
              tabIndex={isPhotography ? 0 : undefined}
              aria-label={isPhotography ? "Open photography gallery" : undefined}
              className={`group bg-noir-950 border border-noir-900 p-10 space-y-12 hover:bg-noir-900 transition-all duration-700 min-h-[450px] flex flex-col justify-between relative overflow-hidden ${
                isPhotography ? "cursor-pointer hover:border-white/30 focus-visible:border-white focus-visible:outline-none hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]" : ""
              }`}
            >
              {isUnderWork && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-noir-black/90 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                >
                  <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.06]" />
                  <div className="absolute left-5 top-5 h-5 w-5 border-l border-t border-white/25" />
                  <div className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-white/25" />

                  <div className="relative px-6 text-center">
                    <span className="mb-5 block font-mono text-[8px] uppercase tracking-[0.45em] text-noir-500">
                      Archive Pending // 00
                    </span>
                    <span className="block font-serif text-4xl font-black italic uppercase leading-none tracking-tighter text-white sm:text-5xl">
                      Under-Work
                    </span>
                    <span className="mx-auto mt-6 block h-px w-12 bg-white/40" />
                    <span className="mt-5 block font-mono text-[8px] uppercase tracking-[0.35em] text-white/35">
                      Transmission Soon
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/5 tracking-[0.4em] vertical-rl rotate-180 uppercase pointer-events-none">
                Data Stream // Level 0{i + 1}
              </div>

              <div className="space-y-8 relative z-10">
                <div className="w-12 h-12 border border-noir-800 flex items-center justify-center text-noir-400 group-hover:text-white group-hover:border-white transition-all duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif italic font-medium tracking-tight sm:h-16">{cat.title}</h3>
                <p className="text-[11px] text-noir-500 font-sans uppercase tracking-widest leading-relaxed opacity-80 min-h-[44px]">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-6 pt-12 border-t border-noir-900 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="text-[8px] uppercase tracking-[0.2em] font-mono py-1.5 px-3 border border-noir-800 group-hover:border-noir-700 transition-colors bg-noir-black/40">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-noir-900/50">
                  <div className="flex space-x-1.5">
                    {[1, 2, 3, 4, 5].map(dot => (
                      <div key={dot} className={`w-1 h-1 ${dot <= 4 ? 'bg-white' : 'bg-noir-800'}`}></div>
                    ))}
                  </div>
                  <div className="text-[8px] font-mono tracking-[0.4em] text-noir-700 uppercase">
                    {cat.title === "Photography" ? (
                      <span className="text-white/40 group-hover:text-white transition-colors duration-500 italic">
                        View Gallery &rarr;
                      </span>
                    ) : (
                      <span>Status: Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
