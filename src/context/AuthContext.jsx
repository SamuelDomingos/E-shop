import { createContext, useContext, useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebase/Config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [profileImageUrl, setProfileImageUrl] = useState(undefined);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe();
  }, [auth])

  const logout = () => {
    signOut(auth);

}

  const loadingUser = user === undefined

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <AuthContext.Provider value={{ user, setUser, profileImageUrl, setProfileImageUrl, auth, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
