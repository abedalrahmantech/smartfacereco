import React, { useEffect } from 'react';
import './ParticlesBackground.css';

const ParticlesBackground = () => {
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
      const moveParticle = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      };
      moveParticle();
      setInterval(moveParticle, 5000);
    });
  }, []);

  return (
    <div className="particles-container">
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          className="particle"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;