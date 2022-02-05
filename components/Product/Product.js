import styles from '../../styles/Product.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useInView } from 'react-hook-inview'

export default function Product({product,index,id}){
  const router = useRouter()

  const [ref, inView] = useInView({unobserveOnEnter:true,threshold:1})

  function prodInView(){
    if(inView){
      return styles.productContainerAnim
    }
    else{
      return styles.productContainer
    }
  }
    return(
    <div className={prodInView()} onClick={()=>router.push(`products/${id}`)} ref={ref}>
        <Image src={product.images[0]}
         sizes="50vw"
         priority={index<=10?true:false}
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
    )
}