import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-noir-900 bg-noir-black relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-noir-900 hidden lg:block"></div>
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Section Indicator */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500 vertical-rl rotate-180 block">Profile // 01</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif italic font-black tracking-tighter leading-[0.85]">
                Bhumit Singh<span className="text-noir-500 font-sans not-italic">.</span>
              </h2>
              
              <div className="space-y-8 text-noir-400 leading-relaxed text-sm uppercase tracking-wider max-w-lg">
                <p>
                  A PSYCHOLOGY STUDENT WITH A GROWING INTEREST IN PHOTOGRAPHY, FILMMAKING, AND GRAPHIC DESIGN. I’M DRAWN TO <span className="text-white italic">HIGH-CONTRAST MINIMALISM</span> AND THE ATMOSPHERIC AESTHETICS OF NEO-NOIR FUTURISM.
                </p>
                <div className="h-px w-24 bg-noir-800"></div>
                <p>
                  MY WORK IS DRIVEN BY CURIOSITY, EXPERIMENTATION, AND A DESIRE TO TURN IDEAS INTO THOUGHTFUL VISUAL EXPERIENCES. I’M CURRENTLY DEVELOPING MY CREATIVE PRACTICE WHILE PURSUING A PSYCHOLOGY HONOURS DEGREE AT THE UNIVERSITY OF DELHI.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-noir-900">
               <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-noir-500">Creative Focus</h3>
                  <ul className="text-[11px] space-y-3 uppercase tracking-tight">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white"></span> Photography</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white"></span> Video Editing</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white"></span> Graphic Design</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-noir-500">Technical Arsenal</h3>
                  <ul className="text-[11px] space-y-3 uppercase tracking-tight">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 border border-noir-700"></span> Adobe Suite</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 border border-noir-700"></span> Davinci Resolve</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 border border-noir-700"></span> Affinity</li>
                  </ul>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end space-y-12">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/5] bg-noir-950 border border-noir-800 p-3 group overflow-hidden"
            >
               <img 
                 src="/images/about-604.webp"
                 srcSet="/images/about-480.webp 480w, /images/about-604.webp 604w"
                 sizes="(min-width: 1024px) 42vw, 100vw"
                 width={604}
                 height={605}
                 alt="Black-and-white illustration of hands holding two sword hilts."
                 className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-opacity duration-1000"
                 loading="lazy"
                 decoding="async"
               />
            </motion.div>
            
            <div className="flex justify-between items-end">
               <div className="space-y-1">
                 <p className="text-[9px] uppercase tracking-[0.5em] text-noir-600">Casual Competitive Gamer</p>
                 <p className="text-[10px] font-mono text-noir-400">System Ready // Latency: Minimized</p>
               </div>
               <div className="w-12 h-px bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
