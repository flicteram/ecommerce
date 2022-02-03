import Header from "../components/Header/Header"
import Path from "../components/Path/Path"
import { Context } from "../components/Context/Context"
import { useContext,useState } from "react"
import Image from "next/image"
import styles from '../styles/Cart.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useRouter} from 'next/router'
import {db} from '../firebase'
import { collection,addDoc,Timestamp } from "firebase/firestore"
import CircularProgress from '@mui/material/CircularProgress';
import ModalOrderComplete from "../components/ModalOrderComplete/ModalOrderComplete"
import GoogleIcon from '@mui/icons-material/Google';

export default function Cart(){
    const {cart,setCart,user,handleSignIn,handleDeleteProduct} = useContext(Context)
    const router = useRouter()
    const [processing,setProcessing]=useState(false)
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const subtotal = cart.reduce((acc,currentVal)=>acc+(currentVal.price*currentVal.count),0).toFixed(2)
    const shippingFee = 5.99

    function handlePlusQuantity(productIndex){
        setCart(cart.map((item,index)=>{
            if(index===productIndex){
                return {...item,'count':item.count+1}
            }
            else {
                return item
            }
        }))
    }
    function handleMinusQuantity(product,productIndex){
        if(product.count>1){
            setCart(cart.map((item,index)=>{
                if(index===productIndex){
                    return {...item,'count':item.count-1}
                }
                else {
                    return item
                }
            }))
        }
    }

    function handleSendOrder(){
        setProcessing(true)
        setTimeout(async()=>{
            await addDoc(collection(db,`users/${user.uid}/history`),{
                'timestamp':Timestamp.now(),
                'orderDetails':cart,
                'orderTotal':cart.reduce((acc,currentVal)=>acc+(+currentVal.price * +currentVal.count),0).toFixed(2)
            })
            setModalIsOpen(true)
            setCart([])
            setProcessing(false)
        },2500)
    }
    const handleClearShoppingCart=()=>setCart([])
    const handleContinueShopping=()=>router.push('/products')

    if(!cart.length){
        return (
            <div>
                <Header/>
                <Path
                    first={'Cart'}
                    firstLink={'/cart'}
                />
                <div className={styles.cartEmptyContainer}>
                    <h1>YOUR CART IS EMPTY</h1>
                    <button onClick={handleContinueShopping}>FILL IT</button>
                </div>
                <ModalOrderComplete
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                />
            </div>
        )
    }
    return(
        <div>
            <Header/>
            <Path
                first={'Cart'}
                firstLink={'/cart'}
            />

            <div className={styles.productsContainer}>
                <table className={styles.productsContainerTable}>
                    <tr className={styles.tr}>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                {cart.map((product,index)=>
                <tr className={styles.trProduct} key={product.id}>
                    <td>
                        <div className={styles.itemContainer}>
                            <div className={styles.imageTable}>
                                <Image src={product.images[0]} objectFit="cover" layout="fill" objectPosition={'50% 70%'}/>
                            </div>
                                
                            <div>
                                <p className={styles.name}>{product.name}</p>
                                <div className={styles.colorContainerTable}>
                                    <p>Color:</p>
                                    <div className={styles.colorTable} style={{backgroundColor:product.color}}></div>
                                </div>
                                <div className={styles.priceLow}>
                                    <p>Price: </p>
                                    <p>${product.price}</p>
                                </div>
                                
                            </div>
                        </div>
                    </td>
                    <td className={styles.priceTable}>${product.price}</td>
                    <td className={styles.tdQuantity}>
                        <div className={styles.quantityContainer}>
                            <div className={styles.quantityLow}>
                                <p>Quantity:</p>
                                <div className={styles.quantityContainerTable}>
                                    <button disabled={processing} onClick={()=>handleMinusQuantity(product,index)}><RemoveIcon sx={{fontSize:22}}/></button>
                                    <p>{product.count}</p>
                                    <button disabled={processing} onClick={()=>handlePlusQuantity(index)}><AddIcon sx={{fontSize:22}}/></button>
                                </div>
                            </div>
                            <div className={styles.subtotalLow}>
                            <p>Subtotal:</p>
                            <p>${(+product.price*+product.count).toFixed(2)}</p>
                            </div>
                            
                            <button className={styles.removeProduct} disabled={processing} onClick={()=>handleDeleteProduct(index)}>REMOVE PRODUCT</button>
                        </div>
                            
                    </td>
                    <td className={styles.productSubtotal}>${(+product.price*+product.count).toFixed(2)}</td>
                    <td className={styles.deleteProduct}>
                        <button disabled={processing} onClick={()=>handleDeleteProduct(index)}>
                            <DeleteIcon sx={{color:'red',cursor:'pointer'}}/>
                        </button>
                    </td>
                </tr>
                )}
                </table>
                <div className={styles.buttonsActionsContainer}>
                    <button disabled={processing} onClick={handleContinueShopping}>Continue Shopping</button>
                    <button disabled={processing} onClick={handleClearShoppingCart}>Clear Shopping Cart</button>
                </div>
                <div className={styles.totalContainer}>
                    <table className={styles.tableTotal}>
                        <tr className={styles.trSubtotal}>
                            <td>Subtotal:</td>
                            <td>${subtotal}</td>
                        </tr>
                        <tr>
                            <td>Shipping fee:</td>
                            <td>${shippingFee}</td>
                        </tr>
                        <tr className={styles.trOrderTotal}>
                            <td>Order Total:</td>
                            <td>${(+subtotal + +shippingFee).toFixed(2)}</td>
                        </tr>
                    </table>
                    {user?
                        <button className={styles.toCheckout} onClick={handleSendOrder} disabled={processing}>
                        {processing
                        ?
                        <CircularProgress size={'20px'} sx={{color:'rgb(247, 245, 233)'}} thickness={5}/>
                        :
                        'SEND ORDER'}
                        </button>
                        :
                        <button onClick={handleSignIn} className={styles.signIn}>
                        <GoogleIcon sx={{color:'white'}}/><span className={styles.signInText}>Sign in with Google</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
