import React, { useEffect, createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, ...action.payload };
    case "reset":
      return { ...initialState };
    default:
      return { ...initialState };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
