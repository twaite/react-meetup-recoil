import React, { createContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  signIn: (email: string) => void;
  signOut: () => void;
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  user: null,
});

type Props = {
  children: React.ReactNode;
};

function AuthProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);

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
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
