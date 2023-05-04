import React from "react";

interface ContextProps {
  isMenuOpen: boolean;
  toggleSideMenu: () => void;
}

export const UiContext = React.createContext<ContextProps>({} as ContextProps);

export const useUIContext = () => React.useContext(UiContext);