import React, { createContext, useContext, useState } from 'react';

const ComplianceLoadingContext = createContext();

export const ComplianceLoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <ComplianceLoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </ComplianceLoadingContext.Provider>
  );
};

export const useComplianceLoadContext = () => {
  const context = useContext(ComplianceLoadingContext);
  if (!context) {
    throw new Error('useModuleContext must be used within a ModuleProvider');
  }
  return context;
};
