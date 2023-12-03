import React, { createContext, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

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
  const [user, setUser] = useState<User | null>(null);

  const isSignedIn = useMemo(() => Boolean(user?.id), [user]);

  const signIn = (email: string) => {
    // Perform sign-in logic here
    const newUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
    };
    setUser(newUser);
  };

  const signOut = () => {
    // Perform sign-out logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSignedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
