import { createContext,useState,useEffect } from "react";
import { db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { setDoc, doc, onSnapshot } from 'firebase/firestore'

const Context = createContext()

function ContextProvider({children}){
    const [user,setUser]=useState('')
    const [cart,setCart]=useState([])
    const provider = new GoogleAuthProvider();
    const auth = getAuth()

    const cartLength = cart.reduce((acc,currentVal)=>acc+currentVal.count,0)

    useEffect(()=>{
        /*Get data from local storage*/
        const localStorageData = localStorage.getItem('cart')
        if(localStorageData){
            setCart(JSON.parse(localStorageData))
        }
    },[])

    useEffect(()=>{
        /*Add data to local storage*/
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
        /*Check if user is logged in*/
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }
        })
    },[])

    async function addToDbCart(){
        const docRef = await setDoc(doc(db,'users',user.uid),{
            cart:cart
        }) 
    }   

    useEffect(()=>{
        if(user){
            const unsub = onSnapshot(doc(db,'users',user.uid),(doc)=>{
                if(doc.exists()){
                    setCart(doc.data().cart)
                }
            })
            return unsub
        }
    },[user])

    useEffect(()=>{
        if(user){
            addToDbCart()
        }
    },[cart])

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

    return( 
        <Context.Provider value={{
                            handleSignIn,
                            handleSignOut,
                            user,
                            cartLength,
                            cart,
                            setCart,
                            addToDbCart}}>
            {children}
        </Context.Provider>
    )
}

export {Context,ContextProvider}