import styles from '../styles/Header.module.css'
import {useState} from 'react'

export default function Header(){
    const [isActive,setIsActive] = useState(false)
    return (
        <header className={styles.headerContainer}>
            <p className={styles.logo}>Confort<span className={styles.logoZone}>Zone</span></p>
            <div onClick={()=>setIsActive(!isActive)} className={isActive?styles.hamburgerAcrive:styles.hamburger}>
                <div className={styles.hamline1}></div>
                <div className={styles.hamline2}></div>
                <div className={styles.hamline3}></div>
            </div>
            <nav className={isActive?styles.navLowActive:styles.navLow}>
                <p className={styles.logo}>Confort<span className={styles.logoZone}>Zone</span></p>
                <ul className={styles.ulContainer}>
                    <li>Home</li>
                    <li>About</li>
                    <li>Products</li>
                </ul>
            </nav>
        </header>
    )
}