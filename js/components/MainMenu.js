// Main Menu Component
const MainMenu = ({ onModeSelect, soundEnabled, setSoundEnabled, musicEnabled, setMusicEnabled }) => {
  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) AudioManager.playMenuSelect();
  };

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
    if (soundEnabled) AudioManager.playMenuSelect();
  };

  const handleModeSelect = (mode) => {
    if (soundEnabled) AudioManager.playMenuSelect();
    onModeSelect(mode);
  };

  const handleHover = () => {
    if (soundEnabled) AudioManager.playHover();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ParticleSystem />
      <div className="pixel-container rounded-none p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-black mb-2 text-white">
          TIC TAC TOE 2
        </h1>
        <h2 className="text-lg text-yellow-400 mb-6">
          PIXEL EDITION
        </h2>
        
        <div className="bg-gray-800 border-2 border-gray-600 p-4 mb-6">
          <p className="text-white text-xs leading-relaxed">
            RULE: MAX 3 PIECES PER PLAYER
          </p>
          <p className="text-gray-400 text-xs mt-1">
            4TH MOVE REMOVES 1ST PIECE!
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleModeSelect('2players')}
            onMouseEnter={handleHover}
            className="w-full pixel-button pixel-button-green py-3 px-6 text-sm font-bold"
          >
            2 PLAYER MODE
          </button>
          
          <button
            className="w-full pixel-button opacity-50 cursor-not-allowed py-3 px-6 text-sm font-bold"
            disabled
          >
            VS AI [SOON]
          </button>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between bg-gray-800 border-2 border-gray-600 p-2">
              <span className="text-xs text-white">SOUND FX</span>
              <button
                onClick={handleSoundToggle}
                className={`pixel-button text-xs py-1 px-3 ${soundEnabled ? 'pixel-button-green' : 'pixel-button-red'}`}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            
            <div className="flex items-center justify-between bg-gray-800 border-2 border-gray-600 p-2">
              <span className="text-xs text-white">MUSIC</span>
              <button
                onClick={handleMusicToggle}
                className={`pixel-button text-xs py-1 px-3 ${musicEnabled ? 'pixel-button-green' : 'pixel-button-red'}`}
              >
                {musicEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};