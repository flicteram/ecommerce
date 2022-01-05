import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/HeaderBig.module.css'
export default function HeaderBig(){
    return (
        <>
        <nav className={styles.navContainer}>
            <ul className={styles.ulContainer}>
                <li>Home</li>
                <li>About</li>
                <li>Products</li>
            </ul>
        </nav>
        <div className={styles.actionsContainer}>
            <div className={styles.cart}>
                <p>Cart</p>
                <ShoppingCartIcon sx={{fontSize:30,color:'rgb(42, 68, 153)'}}/>
            </div>
            <div className={styles.login}>
                <p>Login</p>
                <PersonAddIcon sx={{fontSize:30,color:'rgb(42, 68, 153)'}}/>
            </div>
        </div>
        </>

    )
}