import React, { useState, useContext } from 'react'
import AuthContext from './Authcontext';

export default function AuthProvider({ children }) {
    const innitialAuthuser = localStorage.getItem("Users")
    const [Authuser, setAuthuser] =useState(
        innitialAuthuser?JSON.parse(innitialAuthuser):undefined
    )
    return(
        <AuthContext.Provider value={[Authuser, setAuthuser]}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

