import Image from "next/image";
import styles from '../../styles/ProductWithDescription.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
import {useInView} from 'react-hook-inview'
import LinearProgress from '@mui/material/LinearProgress';

export default function ProductWithDescription({product,id}){
    const router = useRouter()
    const [loading,setLoading]=useState(false)

    const [ref,inView]=useInView({unobserveOnEnter:true,threshold:0})

    const handleInView = () => inView?styles.productContainerAnim:styles.productContainer
    const handleOnClickDetails=()=>(setLoading(true), router.push(`products/${id}`))

    return (
        <div>
        {loading&&<LinearProgress color={'inherit'} sx={{color:'rgb(214, 107, 19)',position:'fixed',top:'0',left:'0',right:'0',zIndex:'1100'}}/>}
            <div className={handleInView()} ref={ref}>
                <div className={styles.imageContainer}>
                    <Image 
                    src={product.images[0]} 
                    layout="fill"
                    objectFit="cover"
                    objectPosition={'50% 65%'}
                    className={styles.image}
                    />
                </div>

                <div className={styles.detailsContainer}>
                    <div>
                        <h3 className={styles.name}>{product.name}</h3>
                        <p className={styles.price}>${product.price}</p>
                    </div>
                    <p className={styles.description}>{product.description.slice(0,150)}...</p>
                    <button onClick={handleOnClickDetails}>DETAILS</button>
                </div>
            </div>
        </div>
       
    )
}