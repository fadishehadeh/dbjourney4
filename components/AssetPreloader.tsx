
import React, { useEffect, useState } from 'react';
import { CHAPTERS } from '../constants';

interface AssetPreloaderProps {
  children: React.ReactNode;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const images = CHAPTERS.map(ch => ch.backgroundImage);
    // Add extra assets like brand mark here if needed
    let loadedCount = 0;
    const total = images.length;

    if (total === 0) {
      setLoaded(true);
      return;
    }

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) setLoaded(true);
      };
      img.onerror = () => {
        // Handle error by counting it as loaded to prevent infinite loading
        loadedCount++;
        console.warn(`Failed to load image: ${src}`);
        if (loadedCount === total) setLoaded(true);
      };
    });
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-[#3DAE2B] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AssetPreloader;
