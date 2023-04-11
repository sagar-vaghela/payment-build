import { useContext } from 'react';
import type { AuthContextType as Auth } from 'src/contexts/auth/auth-context';
import { AuthContext } from 'src/contexts/auth/auth-context';

type AuthContextType = Auth;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
