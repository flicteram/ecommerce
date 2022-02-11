import styles from '../../styles/Product.module.css'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useInView } from 'react-hook-inview'
import LinearProgress from '@mui/material/LinearProgress';

export default function Product({product,index,id}){
  const router = useRouter()

  const [loading,setLoading]=useState(false)

  const [ref, inView] = useInView({unobserveOnEnter:true,threshold:1})

  const prodInView=()=>inView?styles.productContainerAnim:styles.productContainer
  const handleOnClickProduct=()=>(setLoading(true), router.push(`products/${id}`))

    return(
    <div>
    {loading&&<LinearProgress color={'inherit'} sx={{color:'rgb(214, 107, 19)',position:'fixed',top:'0',left:'0',right:'0',zIndex:'1100'}}/>}
      <div className={prodInView()} onClick={handleOnClickProduct} ref={ref}>
          <Image src={product.images[0]}
          sizes="50vw"
          priority={index<=5?true:false}
          width={30} 
          height={25} 
          objectFit='cover' 
          className={styles.image} 
          objectPosition={'50% 70%'} 
          layout='responsive'
          />
          <div className={styles.productInfo}>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>${product.price}</p>
          </div>
      </div>
    </div>
    )
}