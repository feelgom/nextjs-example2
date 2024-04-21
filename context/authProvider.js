"use client";

import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
// import { getAuth } from 'firebase/auth';
import { auth } from './../firebase/firebase-app';
import nookies from 'nookies';

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                // No ID token
                console.log("No ID token");
                setUserState(null);
                nookies.set(null, 'token', '', { path: '/' });
                return;
            }

            // Set token cookie
            setUserState(user);
            console.log("Login by - ", user.email);
            const token = await user.getIdToken();
            nookies.destroy(null, 'token');
            nookies.set(null, 'token', token, { path: '/' });
        });
    }, []);

    useEffect(() => {
        const refreshToken = setInterval(async () => {
            const { currentUser } = getAuth();
            if (currentUser) await currentUser.getIdToken(true);
        }, 10 * 60 * 1000);

        return () => clearInterval(refreshToken);
    }, []);

    const user = useMemo(() => ({ user: userState }), [userState]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
