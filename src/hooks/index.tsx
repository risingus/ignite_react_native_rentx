import { ReactNode } from 'react';
import {AuthPovider} from './auth';


interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({children}: AppProviderProps) {
  return (
    <AuthPovider>
      {children}
    </AuthPovider>
  )
}

export {AppProvider};