import { AuthContext } from '@/contexts/JWTAuthContext';
import { useContext } from 'react';

// NOTE: auth 방식에 따라 선택하면됨
// import { AuthContext } from '@/contexts/JWTAuthContext';
// import { AuthContext } from '@/contexts/FirebaseAuthContext';
// import { AuthContext } from '@/contexts/AmplifyContext';
// import { AuthContext } from '@/contexts/Auth0Context';

export const useAuth = () => useContext(AuthContext);
