// Audio Context and Sound Generation
const AudioManager = {
  audioContext: null,
  
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playTone(frequency, duration, type = 'square', volume = 0.1) {
    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  },

  playMove() {
    this.playTone(800, 0.1, 'square', 0.15);
  },

  playRemove() {
    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  },

  playWin() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playTone(note, 0.4, 'triangle', 0.2);
      }, index * 150);
    });
  },

  playHover() {
    this.playTone(1200, 0.05, 'sine', 0.08);
  },

  playMenuSelect() {
    this.playTone(440, 0.15, 'square', 0.12);
    setTimeout(() => {
      this.playTone(880, 0.15, 'square', 0.12);
    }, 75);
  }
};