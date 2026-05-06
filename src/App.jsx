import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, Heart, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Snowflakes = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${Math.random() * 1.5 + 0.5}rem`,
      opacity: Math.random() * 0.4 + 0.1
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
            opacity: flake.opacity
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

function App() {
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleJoinWaitlist = (e) => {
    e.preventDefault();
    alert(`Added ${email} to the huddle!`);
    setEmail('');
  };

  const handleSuggestion = (e) => {
    e.preventDefault();
    alert('Thanks for the suggestion!');
    setSuggestion('');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-arctic-navy text-arctic-frost font-sans overflow-x-hidden relative">
      <div className="scrolling-bg"></div>
      <Snowflakes />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-arctic-navy/60 backdrop-blur-xl border-b border-arctic-frost/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 bouncy-hover cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-arctic-frost flex items-center justify-center overflow-hidden border-4 border-arctic-orange shadow-[0_0_15px_rgba(255,109,0,0.5)]">
              <img src="/logo.png" alt="Penguin Play Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bubbly text-3xl tracking-wide text-arctic-yellow text-shadow-sm hidden sm:block">Penguin Play</span>
          </div>
          <div className="flex items-center gap-6 md:gap-8 text-lg font-bubbly text-arctic-frost">
            <a href="#games" className="hover:text-arctic-yellow bouncy-hover">Games</a>
            <a href="#story" className="hover:text-arctic-yellow bouncy-hover hidden sm:block">Our Story</a>
            <a href="#community" className="hover:text-arctic-yellow bouncy-hover">Community</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 min-h-[90vh] flex items-center justify-center z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-4 border-arctic-yellow bg-arctic-yellow/10 text-arctic-yellow font-bubbly text-lg mb-8 bouncy-hover transform -rotate-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arctic-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-arctic-yellow"></span>
            </span>
            Launching iOS 2026!
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bubbly tracking-wide mb-8 leading-tight text-arctic-frost drop-shadow-xl">
            Text Your Friends. <br />
            <span className="text-arctic-orange block mt-2 transform rotate-1 inline-block">Challenge Your Friends.</span> <br />
            <span className="text-arctic-yellow">Repeat.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-3xl text-arctic-frost/90 mb-16 max-w-3xl mx-auto font-medium leading-relaxed game-block p-6">
            One simple download brings a revolution in iMessage gaming. Updated for the new generation.
          </motion.p>

          <motion.div variants={fadeInUp} className="relative max-w-2xl mx-auto">
            <AnimatePresence>
              {isInputFocused && (
                <motion.div
                  initial={{ y: -50, opacity: 0, rotate: -20 }}
                  animate={{ y: -20, opacity: 1, rotate: 0 }}
                  exit={{ y: -50, opacity: 0, rotate: 20 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 z-20"
                >
                  <img src="/logo.png" alt="Diving Penguin" className="w-16 h-16 drop-shadow-2xl" />
                </motion.div>
              )}
            </AnimatePresence>

            <form id="waitlist" onSubmit={handleJoinWaitlist} className="relative flex flex-col sm:flex-row gap-4 game-block p-6 border-arctic-yellow/50 bg-arctic-navy/80 z-30">
              <div className="relative flex-1">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-arctic-yellow/20 p-2 rounded-full">
                  <Mail className="w-6 h-6 text-arctic-yellow" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Join the Huddle (Enter email)"
                  className="w-full pl-20 pr-6 py-5 bg-arctic-navy border-4 border-arctic-frost/20 text-arctic-frost placeholder:text-arctic-frost/40 focus:outline-none focus:border-arctic-orange focus:ring-4 focus:ring-arctic-orange/30 transition-all rounded-full font-bubbly text-xl"
                />
              </div>
              <button type="submit" className="button-primary whitespace-nowrap text-2xl">
                Pre-Order
                <Send className="w-6 h-6 animate-pulse" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* The Games */}
      <section id="games" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bubbly text-arctic-yellow mb-6 transform -rotate-1 inline-block">The Games Library</h2>
            <p className="text-arctic-frost/80 text-xl font-medium max-w-2xl mx-auto">Tap to play directly in your chat. It's that simple!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Game Card 1 */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="group game-block jiggle-hover flex flex-col justify-between p-8 min-h-[420px] bg-gradient-to-b from-arctic-navy/80 to-arctic-navy/40"
            >
              <div className="w-full aspect-square rounded-[2rem] mb-8 flex items-center justify-center border border-white/20 overflow-hidden relative shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
                <img src="/daimposter.jpg" alt="Imposter" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bubbly text-arctic-orange mb-3 drop-shadow-md">Imposter.</h3>
                <p className="text-arctic-frost/90 font-medium text-lg leading-snug">A social deduction thriller optimized for the group chat. Deceive your friends, track movements, and vote them out.</p>
              </div>
            </motion.div>

            {/* Game Card 2 */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="group game-block jiggle-hover flex flex-col justify-between p-8 min-h-[420px] bg-gradient-to-b from-arctic-navy/80 to-arctic-navy/40"
            >
              <div className="w-full aspect-square rounded-[2rem] mb-8 flex items-center justify-center border border-white/20 overflow-hidden relative shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
                <img src="/wavelengthpng.jpg" alt="Wavelength" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bubbly text-arctic-yellow mb-3 drop-shadow-md">Wavelength.</h3>
                <p className="text-arctic-frost/90 font-medium text-lg leading-snug">The mind-reading party game. A colorful, vibey experience that tests your social chemistry.</p>
              </div>
            </motion.div>

            {/* Coming Soon Card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="group game-block jiggle-hover flex flex-col items-center justify-center p-8 min-h-[420px] bg-arctic-navy/30 border-dashed border-4 border-arctic-frost/30 hover:border-arctic-yellow/60 transition-colors"
            >
              <div className="w-24 h-24 rounded-full bg-arctic-frost/10 flex items-center justify-center mb-6 group-hover:bg-arctic-yellow/20 transition-colors">
                <span className="font-bubbly text-6xl text-arctic-frost/40 group-hover:text-arctic-yellow transition-colors drop-shadow-md">?</span>
              </div>
              <h3 className="text-3xl font-bubbly text-arctic-frost/80 mb-3 text-center">More Coming Soon!</h3>
              <p className="text-arctic-frost/60 text-center font-medium">We're cooking up something silly.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-24 px-6 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <div className="game-block border-arctic-orange/50 p-10 md:p-16 text-center relative overflow-hidden transform rotate-1">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-arctic-yellow rounded-full flex items-center justify-center transform -rotate-12 border-8 border-arctic-navy">
              <MapPin className="w-10 h-10 text-arctic-navy" />
            </div>

            <h2 className="text-5xl font-bubbly mb-8 text-arctic-frost mt-6">Our Story</h2>

            <p className="text-2xl md:text-4xl font-bubbly leading-relaxed text-arctic-frost/90 space-y-6">
              <span className="text-arctic-yellow block mb-4 text-5xl">Born in the cold.</span>
              Built by students at the University of Alberta.
              We're a small group of developers in Edmonton looking to bridge the gap between messaging and gaming.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Community Request */}
      <section id="community" className="py-24 px-6 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="max-w-3xl mx-auto text-center game-block border-arctic-yellow/50 p-10 md:p-16 bg-arctic-navy shadow-2xl transform -rotate-1"
        >
          <div className="w-20 h-20 bg-arctic-yellow rounded-full mx-auto flex items-center justify-center mb-8 border-4 border-arctic-navy transform rotate-12 bouncy-hover">
            <Heart className="w-10 h-10 text-arctic-navy fill-current" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bubbly mb-6 text-arctic-frost">What Game Should We Steal... Err, Reimagine Next?</h2>
          <p className="text-arctic-frost/70 text-xl mb-10 font-medium">Link us a game or concept you'd love to see in Penguin Play.</p>

          <form onSubmit={handleSuggestion} className="max-w-2xl mx-auto">
            <div className="mb-6 relative">
              <div className="absolute left-6 top-6 bg-arctic-orange/20 p-2 rounded-full">
                <MessageSquare className="w-6 h-6 text-arctic-orange" />
              </div>
              <textarea
                rows={4}
                required
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="I want to play..."
                className="w-full pl-20 pr-6 py-6 bg-arctic-navy border-4 border-arctic-frost/20 rounded-3xl text-arctic-frost placeholder:text-arctic-frost/40 focus:outline-none focus:border-arctic-orange focus:ring-4 focus:ring-arctic-orange/30 transition-all resize-none font-bubbly text-xl"
              ></textarea>
            </div>
            <button type="submit" className="button-primary w-full sm:w-auto mx-auto text-2xl bg-arctic-yellow text-arctic-navy border-yellow-700">
              Submit Idea!
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-arctic-frost/10 bg-arctic-navy/80 backdrop-blur-xl relative z-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-arctic-frost flex items-center justify-center overflow-hidden border-2 border-arctic-orange">
                <img src="/logo.png" alt="Penguin Play Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bubbly text-2xl text-arctic-yellow">Penguin Play</span>
            </div>
            <p className="text-arctic-frost/50 font-medium">Built in Edmonton, Alberta | University of Alberta Founders | © 2026 Penguin Play</p>
          </div>

          <div className="flex items-center gap-6 text-lg font-bubbly text-arctic-frost/70">
            <a href="#" className="hover:text-arctic-yellow bouncy-hover">Privacy</a>
            <a href="#" className="hover:text-arctic-yellow bouncy-hover">Terms</a>
            <a href="#" className="hover:text-arctic-yellow bouncy-hover">Contact</a>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="px-6 py-3 rounded-full bg-arctic-navy border-2 border-arctic-frost/20 text-arctic-frost/70 font-bubbly flex items-center gap-2 transform rotate-2 bouncy-hover cursor-pointer relative overflow-visible">
              <MapPin className="w-5 h-5 text-arctic-yellow" />
              Made in YEG
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-max px-4 py-2 bg-arctic-orange text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-arctic-orange">
                Built in Edmonton, Alberta | University of Alberta Founders
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
