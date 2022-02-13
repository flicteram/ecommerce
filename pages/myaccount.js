import Header from '../components/Header/Header'
import Path from '../components/Path/Path'
import { Context } from '../components/Context/Context'
import { useContext,useEffect,useState } from 'react'
import Avatar from '@mui/material/Avatar';
import styles from '../styles/myaccount.module.css'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {db} from '../firebase'
import Image from 'next/image';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { createTheme } from '@mui/material';
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer/Footer';


export default function MyAccount(){
    const {user,handleSignIn,handleSignOut}=useContext(Context)
    const [loading,setLoading]=useState(true)
    const [orderHistory,setOrderHistory]=useState([])
    const [orderDisplay,setOrderDisplay]=useState(null)
    const router = useRouter()

    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      });

    const stylesAvatar = (theme)=>({
            [theme.breakpoints.down('sm')]:{
                width:'100px',
                height:'100px',
                position:'absolute',
                top:'150px',
                left:'50%',
                transform:'translateX(-50%)'
            },
            [theme.breakpoints.up('sm')]:{
                position:'initial',
                width:'100px',
                height:'100px',
            }
    })

    async function getOrders(){
        const collectionRef = collection(db,`users/${user.uid}/history`)
        const ref = query(collectionRef, orderBy('timestamp','desc'))
        const querySnapshot = await getDocs(ref)
        const orders = []
        querySnapshot.forEach((doc)=>{
            orders=[...orders,{id:doc.id,data:doc.data()}]
        })
        setOrderHistory(orders)
        setLoading(false)
    }

    useEffect(()=>{
        if(user){
            getOrders()
        }
        else{
            setLoading(false)
        }
    },[user])

    if(loading){
        return (<Loader/>)
    }
    if(!user){
        return (
            <div>
                <Header/>
                <Path
                    first={'My Account'}
                    firstLink={'/myaccount'}
                />
                <div className={styles.noUserContainer}>
                    <h1>Login to see your orders history</h1>
                    <button onClick={handleSignIn}><GoogleIcon/> <span className={styles.continueWithGoogle}>Continue with Google</span></button>
                </div>
                <Footer/>
            </div>
        )
    }
    return (
        <div style={{position:'relative'}}>
            <Header/>
            <Path
                first={'My Account'}
                firstLink={'/myaccount'}
            />
            <div className={styles.accountContainer}>
                <div className={styles.accountContainerInner}>
                    <div className={styles.avatarContainer}>
                        <Avatar  src={user.photoURL} theme={theme} sx={stylesAvatar}/>
                        <div className={styles.accountInfo}>
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                            <p>Total orders: {orderHistory.length}</p>
                            <p>Total spent: ${orderHistory.reduce((acc,val)=>acc+ +val.data.orderTotal,0).toFixed(2)}</p>
                            <button className={styles.logout} onClick={handleSignOut}>Logout</button>
                        </div>
                    </div>

                    {orderHistory.length?
                    <div className={styles.myOrders}>
                        {orderHistory.map((item,index)=>
                            <div key={item.id} className={styles.orderContainer}>
                                <div className={styles.orderDetail}>
                                    <p>Order Id:</p>
                                    <p>{item.id}</p>
                                </div>
                                <div className={styles.orderDetail}>
                                    <p>Date:</p>
                                    <p>{item.data.timestamp.toDate().toString().slice(0,24)} EET</p>
                                </div>
                                <div className={styles.orderDetail}>
                                    <p>Total:</p>
                                    <p>${item.data.orderTotal}</p>
                                </div>
                                <div className={styles.orderDetails}>
                                    {item.data.orderDetails.map(product=>
                                        <div 
                                        key={product.id} 
                                        style={{display:orderDisplay!==index&&'none'}} 
                                        className={styles.product}
                                        onClick={()=>router.push(`/products/${product.id.slice(0,20)}`)}
                                        >
                                            <div className={styles.productImageContainer}>
                                                <Image src={product.images[0]} layout='fill' objectFit='cover'/>
                                            </div>
                                            <div className={styles.productInfoContainer}>
                                                <p>{product.name}</p>
                                                <div className={styles.colorContainer}>
                                                    <p>Color:</p>
                                                    <div style={{backgroundColor:product.color}}></div>
                                                </div>
                                                <div className={styles.priceContainer}>
                                                    <p>Price:</p>
                                                    <p>${product.price}</p>
                                                </div>
                                                <div className={styles.quantityContainer}>
                                                    <p>Quantity:</p>
                                                    <p>{product.count}</p>
                                                </div>
                                                <p>Subtotal: ${(product.price*product.count).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {
                                orderDisplay===index
                                ?
                                <button onClick={()=>setOrderDisplay(null)}><ArrowDropUpIcon/></button>
                                :
                                <button onClick={()=>setOrderDisplay(index)}><ArrowDropDownIcon/></button>
                                }
                            </div>
                        )}
                    </div>
                    :
                    <div className={styles.noOrders}>
                        <h1>Your order history is empty</h1>
                        <button onClick={()=>router.push('/cart')}>Make your first order</button>        
                    </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}