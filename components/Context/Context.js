import { createContext,useState,useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Context = createContext()

function ContextProvider({children}){
    const [user,setUser]=useState('')
    const provider = new GoogleAuthProvider();
    const auth = getAuth()

    function handleSignIn(){
        signInWithPopup(auth, provider)
        .then((result)=>{
            setUser(result.user)
        })
    }
    function handleSignOut(){
        signOut(auth)
        .then(()=>{
            setUser('')
        })
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }
        })
    },[])

    return( 
        <Context.Provider value={{handleSignIn,handleSignOut,user}}>
            {children}
        </Context.Provider>
    )
}

export {Context,ContextProvider}