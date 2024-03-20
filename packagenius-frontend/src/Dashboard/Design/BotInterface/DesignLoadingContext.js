import React, { createContext, useContext, useState } from 'react';

const DesignLoadingContext = createContext();

export const DesignLoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <DesignLoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </DesignLoadingContext.Provider>
  );
};

export const useDesignLoadContext = () => {
  const context = useContext(DesignLoadingContext);
  if (!context) {
    throw new Error('useModuleContext must be used within a ModuleProvider');
  }
  return context;
};
