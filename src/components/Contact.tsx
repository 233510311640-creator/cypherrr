import { motion } from "motion/react";
import { Send, Instagram, Twitter, Github, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-noir-black border-t border-noir-900">
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          <div className="space-y-16">
            <div className="space-y-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500 block">Connection // 03</span>
              <h2 className="text-7xl md:text-[8vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8]">
                Initiate <br />
                <span className="text-white">Dialogue<span className="text-noir-500 font-sans not-italic">.</span></span>
              </h2>
              <p className="text-sm uppercase tracking-widest text-noir-500 leading-loose max-w-md">
                Synthesizing vision into reality. Open for exclusive commissions and multidisciplinary partnerships.
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-700">Priority Channel</h4>
              <a href="mailto:hello@hanzo.io" className="group block">
                 <div className="text-sm md:text-3xl font-serif italic tracking-tight text-white border-b border-noir-900 pb-4 group-hover:border-white transition-colors">
                   hello@hanzo.io
                 </div>
              </a>
            </div>

            <div className="flex space-x-4">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: "#FFFFFF" }}
                  className="w-12 h-12 border border-noir-900 flex items-center justify-center text-noir-500 hover:border-noir-700 transition-colors bg-noir-950"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-noir-950 border border-noir-900 p-10 md:p-16 space-y-12 relative"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/5 tracking-[0.4em] vertical-rl rotate-180 uppercase pointer-events-none">
               Outgoing Transmission Protocol
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-10">
                <div className="space-y-3">
                  <label className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-600">Identity / Alias</label>
                  <input type="text" placeholder="WHO ARE YOU?" className="w-full bg-transparent border-b border-noir-700 p-0 pb-3 focus:outline-none focus:border-white transition-colors font-serif italic text-lg" />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-600">Communication Node</label>
                  <input type="email" placeholder="EMAIL@SYSTEM.IO" className="w-full bg-transparent border-b border-noir-700 p-0 pb-3 focus:outline-none focus:border-white transition-colors font-serif italic text-lg" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-600">Transmitted Message</label>
                <textarea rows={3} placeholder="NARRATIVE BRIEF..." className="w-full bg-transparent border-b border-noir-700 p-0 pb-3 focus:outline-none focus:border-white transition-colors font-serif italic text-lg resize-none"></textarea>
              </div>
            </div>
            
            <button className="group flex items-center justify-center space-x-6 border border-white px-10 py-5 font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500 w-full md:w-auto">
              <span>Send Signal</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <footer className="mt-40 pt-16 border-t border-noir-900 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col space-y-2">
             <div className="text-[9px] font-mono text-noir-500 uppercase tracking-[0.4em]">
                &copy; MMXXIV PORTFOLIO ARCHIVE // HANZO.STUDIO
             </div>
             <div className="text-[8px] font-mono text-noir-700 uppercase tracking-[0.3em]">
                All visual constructs reserved.
             </div>
          </div>
          <div className="text-[9px] font-mono text-noir-500 uppercase tracking-[0.3em] flex space-x-10">
            <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white italic">Privacy.sys</a>
            <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white italic">Terms.ops</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
