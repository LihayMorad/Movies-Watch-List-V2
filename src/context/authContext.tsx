import { createContext, FunctionComponent, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  signInAnonymously,
  User,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";

export const AuthContext = createContext<{
  user: User | null;
  handleSignIn: () => void;
  handleSignInAnonymously: () => void;
  handleSignOut: () => void;
}>({
  user: null,
  handleSignIn: () => null,
  handleSignInAnonymously: () => null,
  handleSignOut: () => null,
});

const UserContextProvider: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // user is signed out
        setUser(null);
      }
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleAuthProvider);
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  const handleSignInAnonymously = async () => {
    try {
      return await signInAnonymously(auth);
    } catch (error) {}
  };

  const handleSignOut = async () => {
    try {
      return await signOut(auth);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        handleSignInAnonymously,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserContextProvider;
