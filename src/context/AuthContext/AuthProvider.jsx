
import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase.init'

export default function AuthProvider({children}) {

    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

     const googleProvider = new GoogleAuthProvider();

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }

    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

   const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
   }

//    update profile //

const updateUserProfile = profileInfo => {
    return updateProfile(auth.currentUser, profileInfo);
}
    
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser)
            setLoading(false)
        });
        return () => {
            unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        updateUserProfile,
        logOut

    }
  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}
