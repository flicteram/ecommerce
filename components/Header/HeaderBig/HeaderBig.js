import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/HeaderBig.module.css'
import Link from 'next/link';
export default function HeaderBig(){
    return (
        <>
        <nav className={styles.navContainer}>
            <ul className={styles.ulContainer}>
                <Link href='/'><li>Home</li></Link>
                <li>About</li>
                <Link href='/products'><li>Products</li></Link>
            </ul>
        </nav>
        <div className={styles.actionsContainer}>
            <div className={styles.cart}>
                <p>Cart</p>
                <ShoppingCartIcon sx={{fontSize:30,color:'rgb(24, 27, 36)'}}/>
            </div>
            <div className={styles.login}>
                <p>Login</p>
                <PersonAddIcon sx={{fontSize:30,color:'rgb(24, 27, 36)'}}/>
            </div>
        </div>
        </>

    )
}