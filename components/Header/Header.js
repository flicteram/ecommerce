import styles from '../../styles/Header.module.css'
import HeaderLow from './HeaderLow/HeaderLow'
import HeaderBig from './HeaderBig/HeaderBig'

export default function Header({home, about, products}){
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContainerInner}>
                <p className={styles.logo}>Comfort<span className={styles.logoZone}>Zone</span></p>
                <HeaderLow/>
                <HeaderBig home={home} about={about} products={products}/>
            </div>
        </header>
    )
}