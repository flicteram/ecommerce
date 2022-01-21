import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import Path from '../../components/Path/Path'
import ImagesCarousel from '../../components/ImagesCarousel/ImagesCarousel'
import { doc,getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import styles from '../../styles/SingleProduct.module.css'

export default function ProductDetails(){

    const [data,setData]= useState({})
    const router = useRouter()
    const { productId } = router.query

    async function getDbData(){
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data())
    }
    
    useEffect(()=>{
        if(data.colors){
            localStorage.setItem(productId, JSON.stringify(data))
        }
    },[data])

    
    console.log(data)

    useEffect(()=>{
        if(productId){
            getDbData()
            
        }
    },[productId])

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
                    <button onClick={()=>setData({...data,something:'something'})}>Add to cart</button>
                </div>
            </div>
            
        </>
    )
}
