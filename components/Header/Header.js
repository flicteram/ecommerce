import styles from '../../styles/Header.module.css'
import HeaderLow from './HeaderLow/HeaderLow'
import HeaderBig from './HeaderBig/HeaderBig'
import db from '../../firebase'

export default function Header(){
    return (
        <header className={styles.headerContainer}>
            <p className={styles.logo}>Comfort<span className={styles.logoZone}>Zone</span></p>
            <HeaderLow/>
            <HeaderBig/>
        </header>
    )
}