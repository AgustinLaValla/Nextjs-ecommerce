import React from 'react'
import { AuthContext, AuthContextProps } from './AuthContext';
import { useSession } from 'next-auth/react';
import { User } from '@/domain/models';
import { signOut } from 'next-auth/react'

type AuthState = Omit<AuthContextProps, 'logout'>

const initialState: AuthState = {
  isLoggedIn: false,
  user: null
}

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [state, setState] = React.useState(initialState);
  const { status, data } = useSession();

  const logout = () => {
    signOut();
    setState(initialState);
  }

  React.useEffect(() => {
    if (status === 'authenticated') {
      setState({ ...state, isLoggedIn: true, user: data.user as User })
    }
  }, [status, data])

  return (
    <AuthContext.Provider value={{ ...state, logout }} >
      {children}
    </AuthContext.Provider>
  )
}
