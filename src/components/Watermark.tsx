import React from 'react';

interface WatermarkProps {
  theme?: 'light' | 'dark';
}

const Watermark: React.FC<WatermarkProps> = ({ theme = 'light' }) => {
  const isLight = theme === 'light';
  
  return (
    <div className={`fixed bottom-2 left-2 md:bottom-2 md:right-2 md:left-auto z-10 text-xs select-none pointer-events-none opacity-60 ${
      isLight ? 'text-gray-500' : 'text-gray-400'
    }`}>
      Made by Glenforest Computer Science Club ❤️
    </div>
  );
};

export default Watermark;