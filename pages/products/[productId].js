import { useRouter } from 'next/router'
import {useState,useEffect,useContext} from 'react'
import Header from '../../components/Header/Header'
import Path from '../../components/Path/Path'
import ImagesCarousel from '../../components/ImagesCarousel/ImagesCarousel'
import { doc,getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import styles from '../../styles/SingleProduct.module.css'
import {Context} from '../../components/Context/Context'

export default function ProductDetails(){
    const {user} = useContext(Context)
    const [data,setData]= useState({})
    const [cart,setCart]=useState([])
    const router = useRouter()
    const { productId } = router.query

    

    async function getDbData(){
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        setData({...docSnap.data(),'id':productId,'count':1})
    }
    useEffect(()=>{
        const localStorageData = localStorage.getItem('cart')
        if(localStorageData){
            setCart(JSON.parse(localStorageData))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])


    useEffect(()=>{
        if(productId){
            getDbData()
        }
    },[productId])


    const handleAddToCart=()=>{
        if(!cart.length||cart.every(item=>item.id!==productId)){
            setCart([...cart,data])
        }
        else if(cart.some(item=>item.id===productId)){
            setCart(cart.map(item=>{
                if(item.id===productId){
                    return {...item,'count':item.count+1}
                }
                else{
                    return {...item}
                }
                }))
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
                        <div className={styles.stock}>
                            <h4>Colors:</h4>
                            <div className={styles.colorsContainer}>{data.colors.map(item=>
                                <label key={item}>
                                <input 
                                type={'checkbox'}
                                hidden
                                />
                                <div className={styles.color} style={{backgroundColor:item}}></div>
                                </label>
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
            
        </>
    )
}
