import Modal from 'react-modal';
import styles from '../../styles/ModalConfirmation.module.css'
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'


export default function ModalConfirmation({modalIsOpen,setModalIsOpen,product}){

    const handleCloseModal=()=>setModalIsOpen(false)

    return(
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className={styles.Modal}
        overlayClassName={styles.Overlay}
        ariaHideApp={false}
        >
        <div>
            <div className={styles.productAddedContainer}>
                <h4>Product added to your cart</h4>
                <button onClick={handleCloseModal}><CloseIcon sx={{fontSize:'35px',color:'rgb(220,230,228)'}}/></button>
            </div>
            <div className={styles.productInfoContainer}>
                <div className={styles.imageContainer} style={{position:'relative'}}>
                    <Image src={product.images[0]} objectFit='cover' layout='fill'/>
                </div>
                <div>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.price}>${product.price}</p>
                    <div className={styles.colorContainer}>
                        <p className={styles.colorP}>Color:</p>
                        <p className={styles.color} style={{backgroundColor:product.color}}></p>
                    </div>
                    <button className={styles.viewCart}>VIEW CART</button>
                </div>

            </div>
        </div>
        
        </Modal>
    )
}