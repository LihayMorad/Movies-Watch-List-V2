import { createContext, type FunctionComponent, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, signInAnonymously, type User } from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";

type AuthContextValue = {
  user: User | null;
  handleSignIn: () => void;
  handleSignInAnonymously: () => void;
  handleSignOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContext provider");
  }

  return context;
};

const UserContextProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
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
      console.log(error);
    }
  };

  const handleSignInAnonymously = async () => {
    try {
      return await signInAnonymously(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{ user, handleSignIn, handleSignInAnonymously, handleSignOut }}>{children}</AuthContext.Provider>;
};

export default UserContextProvider;
