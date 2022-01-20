import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import Path from '../../components/Path/Path'
import { doc,getDoc } from "firebase/firestore";
import { db } from '../../firebase';



export default function ProductDetails(){

    const [data,setData]= useState({})
    const router = useRouter()
    const { productId } = router.query

    if(data.length){
        return <h1>Loading...</h1>
    }

    async function getDbData(){
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data())
    }

    useEffect(()=>{
        if(productId){
            getDbData()
        }
    },[productId])

    console.log(data)

    return (
        <>
            <Header/>
            {/* <Path
                first='Products'
                firstLink='/products'
                second={data.name}
                secondLink={`products/${productId}`}
            /> */}
        </>
    )
}
