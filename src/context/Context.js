
'use client'
import React, { useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signOut, browserSessionPersistence, setPersistence, signInWithPopup, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)


    }
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }


    function SignInWithGoogle() {

        /* setPersistence(auth, browserSessionPersistence)
             .then(() => {
 
                 return signInWithPopup(auth, provider)
             })
             .catch((error) => {
                 // Handle Errors here.
                 return error.message;
 
             });*/

        return signInWithPopup(auth, provider)

    }


    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        SignInWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}