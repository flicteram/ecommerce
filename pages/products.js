import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import styles from '../styles/Products.module.css'
import {useEffect,useState} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import FilterWindow from "../components/FilterWindow/FilterWindow";

export default function Products(){
    const [products,setProducts]=useState([])

    async function getProducts(){
        const data = []
        const querySnapshot = await getDocs(collection(db,'products'));
        querySnapshot.forEach((doc) => {
            data = [...data,doc.data()]
        });
        setProducts(data)
    }
    useEffect(()=>{
        getProducts()
    },[])
    
    return (
        <div>
            {/* <Header/> */}
            <div className={styles.filterContainer}>
                <FilterWindow/>
            </div>
            <div className={styles.productsContainer}>
                {products.map((product,index)=>
                    <Product key={index} index={index} product={product}/>)}
            </div>
            
        </div>
    )
}