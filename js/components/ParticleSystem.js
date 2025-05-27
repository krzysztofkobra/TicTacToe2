const ParticleSystem = () => {
  const { useEffect } = React;

  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
      container.appendChild(particle);
      
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 10000);
    };

    const interval = setInterval(createParticle, 800);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};