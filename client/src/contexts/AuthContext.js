import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    let token = {id: 0, firstName: ''};
    const [userDetails, setUserDetails] = useState(token);

    const setUser = (tokenData) => {
        setUserDetails(tokenData);
    };

    return (
        <AuthContext.Provider value={{ userDetails, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};