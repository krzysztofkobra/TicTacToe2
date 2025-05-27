const BackgroundMusic = {
  isPlaying: false,
  oscillators: [],
  gainNodes: [],
  
  start() {
    if (this.isPlaying) return;
    AudioManager.init();
    this.isPlaying = true;
    this.playLoop();
  },

  stop() {
    this.isPlaying = false;
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    this.oscillators = [];
    this.gainNodes = [];
  },

  playLoop() {
    if (!this.isPlaying) return;
    
    const chords = [
      [220, 277, 330],
      [196, 247, 294],
      [174, 220, 261],
      [196, 247, 294]
    ];
    
    chords.forEach((chord, chordIndex) => {
      setTimeout(() => {
        if (!this.isPlaying) return;
        
        chord.forEach((freq, noteIndex) => {
          const osc = AudioManager.audioContext.createOscillator();
          const gain = AudioManager.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(AudioManager.audioContext.destination);
          
          osc.frequency.setValueAtTime(freq, AudioManager.audioContext.currentTime);
          osc.type = 'triangle';
          
          gain.gain.setValueAtTime(0.02, AudioManager.audioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, AudioManager.audioContext.currentTime + 1.8);
          
          osc.start(AudioManager.audioContext.currentTime);
          osc.stop(AudioManager.audioContext.currentTime + 2);
          
          this.oscillators.push(osc);
          this.gainNodes.push(gain);
        });
      }, chordIndex * 2000);
    });
    
    setTimeout(() => {
      if (this.isPlaying) {
        this.playLoop();
      }
    }, 8000);
  }
};

AudioManager.backgroundMusic = BackgroundMusic;