import { User } from "@/domain/models";
import React from "react";

export interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null | undefined;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export const userAuthContext = () => React.useContext(AuthContext);