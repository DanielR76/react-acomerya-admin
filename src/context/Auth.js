import React, { useEffect, createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, ...action.payload };
    default:
      return { ...initialState };
  }
};

export const AuthProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(reducer, initialState);

  useEffect(() => { 
    console.log(state);
  }, [state]);

  return (
    <AuthContext.Provider value={[state, authDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
