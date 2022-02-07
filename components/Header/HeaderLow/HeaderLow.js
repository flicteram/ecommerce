import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/HeaderLow.module.css'
import {useState,useContext} from 'react'
import Link from 'next/link'
import { Context } from '../../Context/Context';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';


export default function HeaderLow(){
    const router = useRouter()
    const [isActive,setIsActive]=useState(false)
    const {handleSignIn,handleSignOut,user,cartLength} = useContext(Context)

    return (
    <>
    <div onClick={()=>setIsActive(!isActive)} className={isActive?styles.hamburgerAcrive:styles.hamburger}>
        <div className={styles.hamline1}></div>
        <div className={styles.hamline2}></div>
        <div className={styles.hamline3}></div>
    </div>
    <nav className={isActive?styles.navLowActive:styles.navLow}>
        <p className={styles.logo}>Comfort<span className={styles.logoZone}>Zone</span></p>
        <ul className={styles.ulContainer}>
            <Link href='/'><li>Home</li></Link>
            <li>About</li>
            <Link href='/products'><li>Products</li></Link>
            {user&&<li onClick={handleSignOut}>Logout</li>}
        </ul>
        <div className={styles.actionsContainer}>
            <div className={styles.cart} onClick={()=>router.push('/cart')}>
                <p>Cart</p>
                <div className={styles.cartLengthContainer}>
                    <ShoppingCartIcon sx={{fontSize:35,color:'rgb(24, 27, 36)'}}/>
                    <p className={styles.cartLength}>{cartLength}</p>
                </div>
            </div>
            {user?
                <div>
                    <Avatar src={user.photoURL}/>
                </div>
                :
                <div className={styles.login} onClick={handleSignIn}>
                    <p>Login</p>
                    <PersonAddIcon sx={{fontSize:35,color:'rgb(24, 27, 36)'}}/>
                </div>
            }

        </div>
    </nav>
    </>
    )
}