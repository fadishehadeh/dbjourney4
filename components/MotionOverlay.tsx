
import React from 'react';

interface MotionOverlayProps {
  type: 'grid' | 'waves' | 'modular' | 'horizon' | 'stars';
}

const MotionOverlay: React.FC<MotionOverlayProps> = ({ type }) => {
  if (type === 'waves') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0 500 Q 250 400 500 500 T 1000 500" fill="none" stroke="white" strokeWidth="1">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0 500 Q 250 400 500 500 T 1000 500;
                      M0 500 Q 250 600 500 500 T 1000 500;
                      M0 500 Q 250 400 500 500 T 1000 500" />
          </path>
          <path d="M0 600 Q 250 500 500 600 T 1000 600" fill="none" stroke="white" strokeWidth="0.5">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0 600 Q 250 500 500 600 T 1000 600;
                      M0 600 Q 250 700 500 600 T 1000 600;
                      M0 600 Q 250 500 500 600 T 1000 600" />
          </path>
        </svg>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) translateY(0)',
          animation: 'grid-move 20s linear infinite'
        }} />
        <style>{`
          @keyframes grid-move {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'modular') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute border border-white" style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10%',
            animation: `pulse-square ${5 + i}s ease-in-out infinite`
          }} />
        ))}
        <style>{`
          @keyframes pulse-square {
            0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'horizon') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent opacity-30" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/20 blur-sm" style={{
          animation: 'sweep 8s ease-in-out infinite'
        }} />
        <style>{`
          @keyframes sweep {
            0%, 100% { transform: translateY(-20px); opacity: 0; }
            50% { transform: translateY(20px); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (type === 'stars') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Generate multiple layers of stars with different sizes and speeds */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s, float ${Math.random() * 20 + 15}s linear infinite ${Math.random() * 5}s`
            }}
          />
        ))}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default MotionOverlay;
