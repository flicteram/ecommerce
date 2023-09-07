import sNoDescription from '../../styles/Product.module.css'
import sWithDescription from "../../styles/ProductWithDescription.module.css"
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router'
import LinearProgress from '@mui/material/LinearProgress';

export default function Product({product,id, grid}){
  const router = useRouter()

  const [loading,setLoading]=useState(false)

  const handleOnClickProduct=()=>(setLoading(true), router.push(`products/${id}`))
  const styles = grid ? sNoDescription : sWithDescription

  const imgProps = grid?{
    sizes:"50vw",
    width:30,
    height:25,
    objectPosition:'50% 70%',
    layout:"responsive",
  }:{
    objectPosition:'50% 65%',
    objectFit:"cover",
    layout:"fill"
  }
  return(
    <div>
    {loading&&<LinearProgress color={'inherit'} sx={{color:'rgb(214, 107, 19)',position:'fixed',top:'0',left:'0',right:'0',zIndex:'1100'}}/>}
      <div className={styles.productContainer} onClick={handleOnClickProduct}>
        <div className={styles.imageContainer}> 
          <Image 
          styles={styles.image}
          src={product.images[0]}
          alt={product.name}
          objectFit='cover'
          sizes={imgProps?.grid}
          width={imgProps?.width}
          height={imgProps?.height} 
          objectPosition={imgProps?.objectPosition}
          layout={imgProps.layout}
          />
        </div>
            <div className={styles.detailsContainer}>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>${product.price}</p>
              </div>
              {!grid&&
              <>
                <p className={styles.description}>{product.description.slice(0,150)}...</p>
                <button onClick={handleOnClickProduct}>DETAILS</button> 
              </>
              }
            </div>
      </div>
    </div>
    )
}