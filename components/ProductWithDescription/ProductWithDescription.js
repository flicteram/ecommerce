import Image from "next/image";
import styles from '../../styles/ProductWithDescription.module.css'
import { useRouter } from "next/router";

export default function ProductWithDescription({product,id}){
    const router = useRouter()
    return (
        <div className={styles.productContainer}>
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
                <button onClick={()=>router.push(`products/${id}`)}>DETAILS</button>
            </div>
        </div>
       
    )
}