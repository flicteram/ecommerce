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
import CloseIcon from '@mui/icons-material/Close';

export default function HeaderBig({home,about,products}){
    const [optionsActive,setOptionsActive]=useState(false)
    const [cartPreview,setCartPreview]=useState(false)
    const router = useRouter()
    const {handleSignIn,handleSignOut,user,cartLength,cart,handleDeleteProduct} = useContext(Context)

    const handleToSingleProductPage = (id) => router.push(`/products/${id}`)
    const handleToMyAccount=()=>router.push('/myaccount')

    return (
        <>
            <nav className={styles.navContainer}>
                <ul className={styles.ulContainer}>
                    <Link href='/'><li className={home?styles.onPage:styles.li}>Home</li></Link>
                    <li className={about?styles.onPage:styles.li}>About</li>
                    <Link href='/products'><li className={products?styles.onPage:styles.li}>Products</li></Link>
                </ul>
            </nav>
            <div className={styles.actionsContainer}>
                <div 
                className={styles.cart} 
                onMouseEnter={()=>setCartPreview(true)}
                onMouseLeave={()=>setCartPreview(false)}
                >
                    <p onClick={()=>router.push('/cart')}>Cart</p>
                    <div className={styles.cartLengthContainer} onClick={()=>router.push('/cart')}>
                        <ShoppingCartIcon sx={{fontSize:35,color:'rgb(24, 27, 36)',cursor:'pointer'}}/>
                        <p className={styles.cartLength}>{cartLength}</p>
                    </div>
                    <div className={styles.cartPreviewContainer} style={{display:!cartPreview&&'none'}}>
                            <div className={styles.arrowContainer}>
                                <ArrowDropUpIcon sx={{color:'rgb(217, 230, 230)',position:'absolute',top:'-5px',right:'2px',fontSize:'30px',zIndex:'1010'}}/>
                            </div>
                            <table className={styles.talblePreview}>
                                <tbody className={styles.tBody}>
                                {cart.map((item,index)=>
                                    <tr className={styles.previewItem} key={item.id}>
                                        <td>
                                            <div className={styles.imagePreview}
                                            onClick={()=>handleToSingleProductPage(item.id.slice(0,20))}
                                            >
                                                <Image src={item.images[0]} layout='fill' objectFit='cover'/>
                                            </div>
                                        </td>
                                        <td>
                                            <ul className={styles.previewInfo} 
                                            onClick={()=>handleToSingleProductPage(item.id.slice(0,20))}
                                            >
                                                <li>{item.name}</li>
                                                <li className={styles.colorContainer}>
                                                    <p>Color: </p>
                                                    <div style={{backgroundColor:item.color,width:'10px',height:'10px',borderRadius:'50%'}}></div>
                                                </li>
                                                <li>x{item.count}</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul className={styles.previewCount}>
                                                <li>${(item.price*item.count).toFixed(2)}</li>
                                                <button onClick={()=>handleDeleteProduct(index)}><CloseIcon sx={{fontSize:'15px'}}/></button>
                                            </ul>
                                        
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                            {cartLength
                            ?
                            <div className={styles.totalContainer}>
                                <p>TOTAL: {cartLength} products</p>
                                <p>${(cart.reduce((acc,val)=>acc+(val.price*val.count),0)).toFixed(2)}</p>
                            </div>
                            :
                            <p style={{textAlign:'center',paddingTop:'10px'}}>Cart empty</p>}
                            <div className={styles.cartDetails}>
                                <button onClick={()=>router.push('/cart')}>View cart details</button>
                            </div>
                        </div>
                </div>
                {user?
                    <div className={styles.actionsProfileContainer} 
                    onMouseEnter={()=>setOptionsActive(true)}
                    onMouseLeave={()=>setOptionsActive(false)}
                    >
                        <Avatar src={user.photoURL} onClick={handleToMyAccount} sx={{cursor:'pointer'}}/>
                        <div className={styles.actionsProfile} style={{display:!optionsActive&&'none'}}>
                            <div className={styles.arrowContainer}>
                                <ArrowDropUpIcon sx={{color:'rgb(217, 230, 230)',position:'absolute',top:'-5px',right:'7px',fontSize:'30px',zIndex:'1010'}}/>
                            </div>
                            <p onClick={handleToMyAccount}>My Account</p>
                            <p onClick={handleSignOut}>Logout</p>
                        </div>
                    </div>
                    :
                    <div className={styles.login} onClick={handleSignIn}>
                        <p>Login</p>
                        <PersonAddIcon sx={{fontSize:35,color:'rgb(24, 27, 36)',cursor:'pointer'}}/>
                    </div>
                }

            </div>
        </>

    )
}