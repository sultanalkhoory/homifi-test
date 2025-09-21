function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showStickyNav = scrollY > 100;

  return (
    <>
      {/* Sticky Navigation with power button icon */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showStickyNav ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        style={{ pointerEvents: showStickyNav ? 'auto' : 'none' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <img 
            src="/homifi-icon.png" 
            alt="HomiFi" 
            className="h-6 w-6"
          />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Full logo instead of text */}
            <motion.img
              src="/homifi-logo.png"
              alt="HomiFi"
              className="h-12 md:h-14 w-auto mx-auto mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-3xl mx-auto">
              Your home. Intelligently connected.
            </p>
            <div className="relative flex flex-col items-center">
              {/* Floating feature cards around iPhone */}
              <div className="relative">
                {/* Top left card - Voice Control */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute -top-4 -left-20 md:-left-32 z-10"
                >
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Voice Control</div>
                        <div className="text-xs text-gray-600">Just ask Siri</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Top right card - HomeKey */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -top-4 -right-20 md:-right-32 z-10"
                >
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v8h12V6z" clipRule="evenodd" />
                          <path d="M6 8h8v2H6V8z" />
                          <path d="M6 11h4v1H6v-1z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">HomeKey</div>
                        <div className="text-xs text-gray-600">Tap. You're home.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom left card - Security */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="absolute -bottom-4 -left-20 md:-left-32 z-10"
                >
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Security</div>
                        <div className="text-xs text-gray-600">See who's here</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom right card - Automation */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-4 -right-20 md:-right-32 z-10"
                >
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Automation</div>
                        <div className="text-xs text-gray-600">Set the mood</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* iPhone in center */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <IPhoneFrame>
                    <Image
                      src="/Curtains-Open-Lights-On.png"
                      alt="Beautiful home interior"
                      fill
                      className="object-cover"
                      style={{ objectPosition: '45% center' }}
                      quality={100}
                      priority
                    />
                  </IPhoneFrame>
                </motion.div>
              </div>
              
              {/* Experience HomiFi scroll indicator - centered under iPhone */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-gray-500 text-sm font-light cursor-pointer tracking-wide mt-8"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <div className="flex flex-col items-center">
                  <span>Experience HomiFi</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
