import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/HeaderBig.module.css'
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import {Context} from '../../Context/Context'
import {useContext,useState} from 'react'
import { useRouter } from 'next/router';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Image from 'next/image'

export default function HeaderBig(){
    const [optionsActive,setOptionsActive]=useState(false)
    const [cartPreview,setCartPreview]=useState(true)
    const router = useRouter()
    const {handleSignIn,handleSignOut,user,cartLength,cart} = useContext(Context)

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
                <div className={styles.cart} onClick={()=>router.push('/cart')}>
                    <p>Cart</p>
                    <div className={styles.cartLengthContainer}>
                        <ShoppingCartIcon sx={{fontSize:35,color:'rgb(24, 27, 36)'}}/>
                        <p className={styles.cartLength}>{cartLength}</p>
                        <div className={styles.cartPreviewContainer} style={{display:!cartPreview&&'none'}}>
                            <div className={styles.arrowContainer}>
                                <ArrowDropUpIcon sx={{color:'rgb(217, 230, 230)',position:'absolute',top:'-5px',right:'7px',fontSize:'30px',zIndex:'1010'}}/>
                            </div>
                            <div>
                                {cart.map(item=>
                                <div>
                                    <Image src={item.images[0]} width={50} height={50}/>
                                    <p>{item.name}</p>
                                    <p>{item.color}</p>
                                    <p>{item.count}</p>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
                {user?
                    <div className={styles.actionsProfileContainer} 
                    onMouseEnter={()=>setOptionsActive(true)}
                    onMouseLeave={()=>setOptionsActive(false)}
                    >
                        <Avatar src={user.photoURL}/>
                        <div className={styles.actionsProfile} style={{display:!optionsActive&&'none'}}>
                            <div className={styles.arrowContainer}>
                                <ArrowDropUpIcon sx={{color:'rgb(217, 230, 230)',position:'absolute',top:'-5px',right:'7px',fontSize:'30px',zIndex:'1010'}}/>
                            </div>
                            <p>My Account</p>
                            <p onClick={handleSignOut}>Log out</p>
                        </div>
                    </div>
                    :
                    <div className={styles.login} onClick={handleSignIn}>
                        <p>Login</p>
                        <PersonAddIcon sx={{fontSize:35,color:'rgb(24, 27, 36)'}}/>
                    </div>
                }

            </div>
        </>

    )
}