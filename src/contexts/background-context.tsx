import React, { createContext, useContext, useState, useEffect } from 'react';

type BackgroundStyle = 'gradient' | 'mesh' | 'waves';

interface BackgroundContextType {
  backgroundStyle: BackgroundStyle;
  setBackgroundStyle: (style: BackgroundStyle) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backgroundStyle, setBackgroundStyleState] = useState<BackgroundStyle>(() => {
    const saved = localStorage.getItem('lui-background-style');
    return (saved as BackgroundStyle) || 'gradient';
  });

  useEffect(() => {
    localStorage.setItem('lui-background-style', backgroundStyle);
    // Update data attribute on body for CSS styling
    document.body.setAttribute('data-background-style', backgroundStyle);
  }, [backgroundStyle]);

  const setBackgroundStyle = (style: BackgroundStyle) => {
    setBackgroundStyleState(style);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundStyle, setBackgroundStyle }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within BackgroundProvider');
  }
  return context;
};
