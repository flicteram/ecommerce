import Modal from 'react-modal';
import styles from '../../styles/ModalConfirmation.module.css'
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'


export default function ModalConfirmation({modalIsOpen,setModalIsOpen,product}){
    const styleModal={
        overlay:{
            position:'fixed',
        },
        content:{
            top:'50%',
            transform:'translateY(-50%)',
            maxWidth:'1160px',
            maxHeight:'500px',
            margin:'0 auto',
        }
    }
    const handleCloseModal=()=>setModalIsOpen(false)

    console.log(product)
    return(
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={styleModal}
        >
        <div>
            <div className={styles.productAddedContainer}>
                <h5>Product added to your cart</h5>
                <button onClick={handleCloseModal}><CloseIcon sx={{fontSize:'30px'}}/></button>
            </div>
            <div className={styles.productInfoContainer}>
                <div className={styles.imageContainer} style={{position:'relative'}}>
                    <Image src={product.images[0]} objectFit='cover' layout='fill'/>
                </div>
                <p className={styles.color} style={{backgroundColor:product.color}}></p>
                <p>{product.name}</p>
                <p>${product.price}</p>
            </div>
        </div>
        
        </Modal>
    )
}