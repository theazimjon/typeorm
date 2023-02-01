import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function setData() {
            const user = await JSON.parse(
                localStorage.getItem("currentUser").length > 0 ? localStorage.getItem("currentUser") : null
            );
            setCurrentUser(user);
        }
        setData();
    }, []);

    const profile = {
        currentUser,
        setCurrentUser,
    };

    return <AuthContext.Provider value={profile}>{children}</AuthContext.Provider>;
}
