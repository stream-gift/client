"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the UserProvider component
export const UserProvider: React.FC<{
  children: React.ReactNode;
  initialUser?: User | null;
}> = ({ children, initialUser = null }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Create a component that only renders when logged in
export const LoggedIn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useUser();
  return isLoggedIn ? <>{children}</> : null;
};

export const LoggedOut: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useUser();
  return !isLoggedIn ? <>{children}</> : null;
};
