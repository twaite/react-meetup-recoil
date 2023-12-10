import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { faker } from "@faker-js/faker";
import { User, fetchUser } from "@app/api";

type AuthContextType = {
  signIn: (email: string) => void;
  signOut: () => void;
  user: User | null;
  isSignedIn: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  user: null,
  isSignedIn: false,
});

type Props = {
  children: React.ReactNode;
};

function AuthProvider(props: Props) {
  /** Custom hooks */
  const navigate = useNavigate();

  /** State */
  const [user, setUser] = useState<User | null>(null);

  /** Memos */
  const isSignedIn = useMemo(() => Boolean(user?.id), [user]);

  /** Effects */
  useEffect(loadUserFromLocalStorage, []);

  /** Callbacks */
  const signIn = (email: string) => {
    faker.seed(email.length);

    const user = fetchUser(email);

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const signOut = () => {
    // Perform sign-out logic here
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSignedIn }}>
      {props.children}
    </AuthContext.Provider>
  );

  function loadUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
}

export default AuthProvider;
