import React from 'react'
import { UiContext } from './UiContext'

interface State {
  isMenuOpen: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const initialState: State = { isMenuOpen: false };

export const UiProvider: React.FC<Props> = ({ children }) => {

  const [state, setState] = React.useState(initialState);

  const toggleSideMenu = () => setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  )
}
