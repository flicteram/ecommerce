import { createContext,useState,useEffect } from "react";
import { db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { setDoc, doc, getDoc,getDocs,collection } from 'firebase/firestore'
import Loader from "../Loader/Loader";


const Context = createContext()

function ContextProvider({children}){
    const [user,setUser]=useState(null)
    const [cart,setCart]=useState([])
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const provider = new GoogleAuthProvider();
    const auth = getAuth()

    const cartLength = cart.reduce((acc,currentVal)=>acc+currentVal.count,0)
    function handleDeleteProduct(productIndex){
        setCart(cart.filter((item,index2)=>index2!==productIndex))
    }

    async function getDbProducts(){
        const data = []
        const querySnapshot = await getDocs(collection(db,'products'));
        querySnapshot.forEach((doc) => {
            data = [...data,{id:doc.id,data:doc.data()}]
        });
        setProducts(data)
        setLoading(false)
    }

    useEffect(()=>{
        getDbProducts()
    },[])

    useEffect(()=>{
        /*Get data from local storage*/
        const localStorageData = localStorage.getItem('cart')
        if(localStorageData&&!user){
            setCart(JSON.parse(localStorageData))
        }
    },[])

    useEffect(()=>{
        /*Add data to local storage*/
        if(!user){
            localStorage.setItem('cart',JSON.stringify(cart))
        }
        else{
            localStorage.clear()
        }
    },[cart])

    useEffect(()=>{
        /*Check if user is logged in*/
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }
            else{
                setUser(null)
                setCart([])
            }
        })
    },[])


    async function addDataToDb(){
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        await setDoc((docRef),{
            cartDb:cart
        })
    }

    async function getDbCart(){
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setCart([...cart,...docSnap.data().cartDb])
        }
    }

    useEffect(()=>{
        if(user){
            getDbCart()
        }
    },[user])

    useEffect(()=>{
        if(user){
            addDataToDb()
        }
    },[cart,user])

    useEffect(()=>{
        {/*if same item is added in cart when user is logged out, then add them together when he is logged back in*/}
        const uniqueCart = [...new Set(cart.map(item=>item.id))]
        if(uniqueCart.length!==cart.length){
            const moreProducts = cart.reduce((acc,currentVal)=>{
                acc[currentVal.id]?acc[currentVal.id].count+=currentVal.count: acc[currentVal.id]={...currentVal}
                return acc
            },{})
            setCart(Object.values(moreProducts))
        }
    },[user,cart])


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

    if(loading){
        return (
            <Loader/>
        )
    }

    return( 
        <Context.Provider value={{
                            handleSignIn,
                            handleSignOut,
                            user,
                            cartLength,
                            cart,
                            setCart,
                            products,
                            setProducts,
                            loading,
                            setLoading,
                            handleDeleteProduct
                            }}>
            {children}
        </Context.Provider>
    )
}


export {Context,ContextProvider}