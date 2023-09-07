import sNoDescription from '../../styles/Product.module.css'
import sWithDescription from "../../styles/ProductWithDescription.module.css"
import Image from 'next/image';

export default function Product({product,id, grid, handleProductDetails}){

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
      <div className={styles.productContainer} onClick={handleProductDetails(id)}>
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
                <button onClick={handleProductDetails(id)}>DETAILS</button> 
              </>
              }
            </div>
      </div>
    </div>
    )
}