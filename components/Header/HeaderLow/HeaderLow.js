import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/HeaderLow.module.css'
import {useState} from 'react'

export default function HeaderLow(){
    const [isActive,setIsActive]=useState(false)
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
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
        </ul>
        <div className={isActive?styles.actionsContainerActive:styles.actionsContainer}>
            <div className={styles.cart}>
                <p>Cart</p>
                <ShoppingCartIcon sx={{fontSize:30,color:'rgb(24, 27, 36)'}}/>
            </div>
            <div className={styles.login}>
                <p>Login</p>
                <PersonAddIcon sx={{fontSize:30,color:'rgb(24, 27, 36)'}}/>
            </div>
        </div>
    </nav>
    </>
    )
}