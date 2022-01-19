import Image from "next/image";
import styles from '../../styles/ProductWithDescription.module.css'

export default function ProductWithDescription({product}){
    return (
        <div className={styles.productContainer}>
            <div className={styles.imageContainer}>
                <Image 
                src={product.image} 
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
                <button>DETAILS</button>
            </div>
        </div>
       
    )
}