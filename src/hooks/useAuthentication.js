import {db} from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup -> dealing with memory leak
    const [ cancelled, setCancelled ] = useState(false);

    function checkIfIsCancelled() {
        if (cancelled){
            return
        }
    }

    const auth = getAuth();

    // Register new account
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError("");

        try {
            
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, {displayName: data.displayName});

            setLoading(false);

            return user;

        } catch (error) {
            
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes('Password')){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes('email-already')){
                systemErrorMessage = "Esse e-mail já está cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde.";
            }
            
            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    // Logout / Sign out
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    }

    // Login / Sign in
    const login = async(data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError("");

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);

        } catch (error) {
            
            let systemErrorMessage;

            if (error.message.includes('user-not-found')){
                systemErrorMessage = "O usuário não está cadastrado, verifique o e-mail digitado.";
            } else if (error.message.includes('wrong-password')){
                systemErrorMessage = "A senha está incorreta, tente novamente.";
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde.";
            }

            setError(systemErrorMessage);
            setLoading(false);

        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}