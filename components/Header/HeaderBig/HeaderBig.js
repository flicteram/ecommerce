import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/HeaderBig.module.css'
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import {Context} from '../../Context/Context'
import {useContext} from 'react'
export default function HeaderBig(){
    const {handleSignIn,handleSignOut,user} = useContext(Context)

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
            {user?
                <Avatar src={user.photoURL} onClick={handleSignOut}/>
                :
                <div className={styles.login} onClick={handleSignIn}>
                    <p>Login</p>
                    <PersonAddIcon sx={{fontSize:30,color:'rgb(24, 27, 36)'}}/>
                </div>
            }

        </div>
        </>

    )
}