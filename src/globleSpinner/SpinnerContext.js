import React, { createContext, useContext, useState } from "react";
import FullPageSpinner from "./FullPageSpinner";
import { usePageLoadingFavicon } from "./usePageLoadingFavicon";

const SpinnerContext = createContext();

export const useGlobalSpinner = () => useContext(SpinnerContext);

export const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showSpinner = () => setLoading(true);
  const hideSpinner = () => setLoading(false);

  usePageLoadingFavicon(loading);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      {loading && <FullPageSpinner />}
    </SpinnerContext.Provider>
  );
};
