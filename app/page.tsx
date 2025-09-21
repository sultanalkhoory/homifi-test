/* --------------------------------------------------
   🔐 Security Section
   -------------------------------------------------- */
function SecuritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [doorbell, setDoorbell] = useState(false);
  const [manualControl, setManualControl] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Auto trigger doorbell when section enters viewport
  useEffect(() => {
    if (isInView && !manualControl && !doorbell) {
      const timer = setTimeout(() => setDoorbell(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, manualControl, doorbell]);

  const handleAnswer = () => {
    setManualControl(true);
    // Simulate answering call
  };

  const handleUnlock = () => {
    setManualControl(true);
    setDoorbell(false);
  };

  const handleIgnore = () => {
    setManualControl(true);
    setDoorbell(false);
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 font-medium mb-3">Perfect Security</div>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 leading-tight">
            Your eyes and ears<br />at the door.
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">Know who's there, wherever you are.</p>
        </motion.div>

        {/* iPhone */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="flex justify-center"
        >
          <IPhoneFrame>
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src="/Curtains-Open-Lights-On.png"
                alt="Front door view"
                fill
                className="object-cover"
                style={{ objectPosition: '45% center' }}
                quality={100}
              />

              {/* Doorbell Feed Overlay */}
              <motion.div 
                className="absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: doorbell ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                
                {/* Doorbell Feed Card */}
                <div className="absolute top-16 left-4 right-4">
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: doorbell ? 1 : 0.9, y: doorbell ? 0 : 20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl"
                  >
                    {/* Header */}
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                      <span className="text-sm font-medium text-gray-900">Front Door</span>
                      <span className="text-xs text-gray-500 ml-auto">Live</span>
                    </div>
                    
                    {/* Mock video feed */}
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400" />
                      <div className="absolute bottom-2 left-2 text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
                        12:34 PM
                      </div>
                      {/* Simulated person silhouette */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-gray-600 rounded-t-full opacity-60" />
                    </div>
                    
                    {/* Notification text */}
                    <p className="text-sm text-gray-700 mb-4">Someone's at the door</p>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={handleIgnore}
                        className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        Ignore
                      </button>
                      <button 
                        onClick={handleUnlock}
                        className="flex-1 py-2 px-3 bg-blue-500 text-white text-sm font-medium rounded-lg"
                      >
                        Unlock
                      </button>
                      <button 
                        onClick={handleAnswer}
                        className="flex-1 py-2 px-3 bg-green-500 text-white text-sm font-medium rounded-lg"
                      >
                        Answer
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Manual trigger button when no doorbell */}
              {!doorbell && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                  <GlassButton
                    label="Doorbell Ring"
                    onClick={() => {
                      setManualControl(true);
                      setDoorbell(true);
                    }}
                  />
                </div>
              )}
            </div>
          </IPhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   📺 Apple TV Interlude
   -------------------------------------------------- */
function AppleTVInterlude() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDoorbell, setShowDoorbell] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Auto show doorbell popup when in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowDoorbell(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Apple TV Scene */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
            className="relative"
          >
            {/* Living room background */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Curtains-Open-Lights-On.png"
                alt="Living room with Apple TV"
                fill
                className="object-cover"
                style={{ objectPosition: '30% center' }}
                quality={100}
              />
              
              {/* Apple TV on wall */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-28 bg-black rounded-lg shadow-lg">
                {/* TV Screen */}
                <div className="w-full h-full bg-gray-900 rounded-lg p-2">
                  {/* Home app camera grid */}
                  <div className="w-full h-full bg-gray-800 rounded p-2">
                    <div className="grid grid-cols-2 gap-1 h-full">
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Kitchen</div>
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Bedroom</div>
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Garden</div>
                      <div className="bg-gray-700 rounded text-[6px] text-white p-1">Garage</div>
                    </div>
                  </div>
                </div>
                
                {/* Doorbell popup */}
                <AnimatePresence>
                  {showDoorbell && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute -top-2 -right-2 w-20 h-12 bg-white rounded-lg shadow-xl border border-gray-200 p-1"
                    >
                      <div className="w-full h-full bg-gray-300 rounded text-[4px] text-gray-700 flex flex-col justify-between p-1">
                        <div className="flex items-center justify-between">
                          <span>Front Door</span>
                          <span className="text-red-500">●*</span>
                        </div>
                        <div className="bg-gray-600 rounded h-4 relative">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-gray-800 rounded-t opacity-60" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6 leading-tight">
              See everything on<br />the big screen.
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8">
              Doorbell alerts appear instantly on Apple TV.
            </p>
          </motion.div>
        </div>
        
        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.5 }} 
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-400">
            *Available only with supported Apple Home enabled video doorbells.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   🌡️ Climate Section – FIXED VERSION
   - Using ChatGPT's working CSS keyframes approach
   - Controls moved INSIDE iPhone 
   - Temperature display made static (no animations/blur effects)
   - Bigger buttons as requested
   -------------------------------------------------- */
function ClimateSection() {
