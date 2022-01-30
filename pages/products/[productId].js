import { useRouter } from 'next/router'
import {useState,useEffect,useContext} from 'react'
import Header from '../../components/Header/Header'
import Path from '../../components/Path/Path'
import ImagesCarousel from '../../components/ImagesCarousel/ImagesCarousel'
import { doc,getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import styles from '../../styles/SingleProduct.module.css'
import {Context} from '../../components/Context/Context'
import CheckIcon from '@mui/icons-material/Check';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation'

export default function ProductDetails(){
    const {user,cart,setCart} = useContext(Context)
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [data,setData]= useState({})
    const [color,setColor]=useState(0)
    const [count,setCount]=useState(1)
    const router = useRouter()
    const { productId } = router.query

    async function getDbData(){
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        setData({...docSnap.data(),'id':productId,'count':1})
    }
    useEffect(()=>{
        if(productId){
            getDbData()
        }
    },[productId])

    useEffect(()=>{
        if(data.colors){
            setData({...data,'color':data.colors[color],'id':`${data.id}${data.colors[color]}`})
        }
    },[color,data.colors])

    useEffect(()=>{
        setData({...data,'count':count})
    },[count])
    const handleAddToCart=()=>{
        if(!cart.length
            ||
            cart.every(item=>item.id!==productId||
                item.id===productId&&item.color!==data.colors[color]
            )){
            setCart([...cart,data])
            setCount(1)
            setModalIsOpen(true)
        }
        else if(cart.some(item=>item.id===productId&&item.color===data.colors[color])){
            setCart(cart.map(item=>{
                if(item.id===productId&&item.color===data.colors[color]){
                    return {...item,'count':item.count+count}
                }
                else{
                    return {...item}
                }
                }))
            setCount(1)
            setModalIsOpen(true)
        } 
    }
    if(!data.colors){
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Header/>
            <Path
                first='Products'
                firstLink='/products'
                second={data.name}
                secondLink={`/products/${productId}`}
            />
            <ModalConfirmation
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                product={data}
            />
            <div className={styles.productInfoContainer}>
                <ImagesCarousel images={data.images}/>
                <div className={styles.productInfo}>
                    <h1 className={styles.name}>{data.name}</h1>
                    <p className={styles.price}>${data.price}</p>
                    <p className={styles.description}>{data.description}</p>
                    <div className={styles.stockContainer}>
                        <div className={styles.stock}>
                            <h4>Avilable:</h4>
                            <p className={styles.p}>In Stock</p>
                        </div>
                        <div className={styles.stock}>
                            <h4>SKU:</h4>
                            <p className={styles.p}>{productId}</p>
                        </div>
                        <div className={styles.stock}>
                            <h4>Brand:</h4>
                            <p className={styles.p}>{data.company}</p>
                        </div>
                    </div>
                    <div className={styles.chooseContainer}>
                        <div className={styles.stockColors}>
                            <h4>Colors:</h4>
                            <div className={styles.colorsContainer}>
                                {data.colors.map((item,index)=>
                                    <label key={item}>
                                    <input 
                                    type={'checkbox'}
                                    hidden
                                    />
                                    <div className={styles.color} style={{backgroundColor:item}} onClick={()=>setColor(index)}>
                                        {index===color&&<CheckIcon sx={{fontSize:25,color:'orange'}}/>}
                                    </div>
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className={styles.countProductContainer}>
                            <button onClick={()=>count>1&&setCount(count-1)} className={styles.countProductButton}>-</button>
                            <p className={styles.count}>{count}</p>
                            <button onClick={()=>setCount(count+1)}className={styles.countProductButton}>+</button>
                        </div>
                        
                        <button className={styles.addToCart} onClick={handleAddToCart}>ADD TO CART</button>
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}
