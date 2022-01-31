import Header from "../components/Header/Header"
import Path from "../components/Path/Path"
import { Context } from "../components/Context/Context"
import { useContext } from "react"
import Image from "next/image"
import styles from '../styles/Cart.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useRouter} from 'next/router'


export default function Cart(){
    const {cart,setCart,user} = useContext(Context)
    const router = useRouter()

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
    function handleDeleteProduct(productIndex){
        setCart(cart.filter((item,index2)=>index2!==productIndex))
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
                                    <button onClick={()=>handleMinusQuantity(product,index)}><RemoveIcon sx={{fontSize:22}}/></button>
                                    <p>{product.count}</p>
                                    <button onClick={()=>handlePlusQuantity(index)}><AddIcon sx={{fontSize:22}}/></button>
                                </div>
                            </div>
                            <div className={styles.subtotalLow}>
                            <p>Subtotal:</p>
                            <p>${(+product.price*+product.count).toFixed(2)}</p>
                            </div>
                            
                            <button className={styles.removeProduct} onClick={()=>handleDeleteProduct(index)}>REMOVE PRODUCT</button>
                        </div>
                            
                    </td>
                    <td className={styles.productSubtotal}>${(+product.price*+product.count).toFixed(2)}</td>
                    <td className={styles.deleteProduct} onClick={()=>handleDeleteProduct(index)}><DeleteIcon sx={{color:'red',cursor:'pointer'}}/></td>
                </tr>
                )}
                </table>
                <div className={styles.buttonsActionsContainer}>
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                    <button onClick={handleClearShoppingCart}>Clear Shopping Cart</button>
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
                    {user&&
                    <button className={styles.toCheckout}>SEND ORDER</button>
                    }
                </div>
            </div>
        </div>
    )
}
