import styles from '../../styles/Product.module.css'
import Image from 'next/image';

export default function Product({product,index}){
    return(
    <div className={styles.productContainer}>
        <Image src={product.image}
         sizes="50vw"
         priority
         width={30} 
         height={15} 
         objectFit='cover' 
         className={styles.image} 
         objectPosition={'50% 65%'} 
         layout='responsive'
         />
        <div className={styles.productInfo}>
          <p className={styles.productName}>{product.name}</p>
          <p className={styles.productPrice}>${product.price}</p>
        </div>
    </div>
    )
}