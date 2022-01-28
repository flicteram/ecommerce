import Header from "../components/Header/Header"
import Path from "../components/Path/Path"
import { Context } from "../components/Context/Context"
import { useContext } from "react"
import Image from "next/image"
import styles from '../styles/Cart.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Cart(){
    const {cart,setCart} = useContext(Context)
    console.log(cart)

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
    return(
        <div>
            <Header/>
            <Path
                first={'Cart'}
                firstLink={'/cart'}
            />
            <table className={styles.productsContainerTable}>
                <tr className={styles.tr}>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
                {cart.map((product,index)=>
                <tr>
                    <td className={styles.td}>
                        <div className={styles.itemContainer}>
                            <Image src={product.images[0]} objectFit="cover" width={80} height={80}/>
                            <div>
                                <p>{product.name}</p>
                                <div className={styles.colorContainerTable}>
                                    <p>Color:</p>
                                    <div className={styles.colorTable} style={{backgroundColor:product.color}}></div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className={styles.td}>${product.price}</td>
                    <td className={styles.tdQuantity}>
                        <div className={styles.quantityContainerTable}>
                            <button onClick={()=>handleMinusQuantity(product,index)}><RemoveIcon sx={{fontSize:22}}/></button>
                            <p>{product.count}</p>
                            <button onClick={()=>handlePlusQuantity(index)}><AddIcon sx={{fontSize:22}}/></button>
                        </div>
                        
                    </td>
                    <td className={styles.td}>${(+product.price*+product.count).toFixed(2)}</td>
                    <td onClick={()=>handleDeleteProduct(index)}><DeleteIcon/></td>
                </tr>
                )}
            </table>
            <div className={styles.productsContainer}>
                {cart.map((product,index)=>
                <div key={index} className={styles.productContainer}>
                    <div className={styles.image}>
                        <Image 
                         src={product.images[0]}
                         objectFit='cover' 
                         layout="fill" 
                         objectPosition={'50% 70%'}   
                         />
                    </div>
                    <div>
                        <h4 className={styles.name}>{product.name}</h4>
                        <div className={styles.colorContainer}>
                            <p>Color:</p>
                            <div className={styles.color} style={{backgroundColor:product.color}}></div>
                        </div>
                        <div className={styles.priceContainer}>
                            <p>Price:</p>
                            <p className={styles.price}>${product.price}</p>
                        </div>
                        <div className={styles.quantityContainer}>
                            <p>Quantity:</p>
                            <div className={styles.countContainer}>
                                <button onClick={()=>handleMinusQuantity(product,index)}><RemoveIcon/></button>
                                <p>{product.count}</p>
                                <button onClick={()=>handlePlusQuantity(index)}><AddIcon/></button>
                            </div>
                        </div>
                        <div className={styles.subtotalContainer}>
                            <p>Subtotal:</p>
                            <p className={styles.subtotalAmount}>{(+product.price*+product.count).toFixed(2)}</p>
                        </div>
                        
                        <button className={styles.removeProduct} onClick={()=>handleDeleteProduct(index)}>REMOVE PRODUCT</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}