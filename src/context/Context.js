'use client'
import React, { useContext, useState, useEffect } from "react";
import { 
    GoogleAuthProvider, // Import GoogleAuthProvider from firebase/auth
    signOut, 
    browserSessionPersistence, 
    setPersistence, 
    signInWithPopup, 
    sendPasswordResetEmail, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth"; // Import necessary functions from firebase/auth
import { auth } from "../service/firebase"; // Import auth from firebase service

const AuthContext = React.createContext(); // Create AuthContext using createContext

export function useAuth() {
    return useContext(AuthContext); // Define custom hook for using AuthContext
}

// Firebase authentication provider and functions
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(); // State to hold current user
    const [loading, setLoading] = useState(true); // State to manage loading status

    const provider = new GoogleAuthProvider(); // Create a new instance of GoogleAuthProvider

    useEffect(() => {
        // Effect to handle changes in authentication state
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user); // Update currentUser state with the current user
            setLoading(false); // Update loading status once authentication state is determined
        });

        return unsubscribe; // Unsubscribe from authentication state changes on component unmount
    }, []); // Empty dependency array to run the effect only once after initial render

    // Function to log in with email and password
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Function to sign up with email and password
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Function to log out the current user
    function logout() {
        return signOut(auth);
    }

    // Function to reset password for a given email
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // Function to sign in with Google using popup
    function SignInWithGoogle() {
        return signInWithPopup(auth, provider); // Sign in with Google using popup
    }

    // Define the value object with currentUser and authentication functions
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        SignInWithGoogle
    };

    // Provide the AuthContext value to its children once loading is complete
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
