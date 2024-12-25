import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    let token = {id: 0, isParent: false, fmailyId: 0};
    const [userDetails, setUserDetails] = useState(token);
    const [account, setAccount] = useState(null);

    const setUser = (tokenData) => {
        setUserDetails(tokenData);
    };


  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  };


  useEffect(() => {
    const fetchAccount = async () => {
      const existingAccount = await getAccount();
      setAccount(existingAccount);
    };

    fetchAccount();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount('');
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

    return (
        <AuthContext.Provider value={{ userDetails, setUser, account }}>
            {children}
        </AuthContext.Provider>
    );
};