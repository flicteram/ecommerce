import Modal from "react-modal";
import styles from '../../styles/ModalOrderComplete.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";

export default function ModalOrderComplete({modalIsOpen,setModalIsOpen}){
    const handleCloseModal=()=>setModalIsOpen(false)
    const handleContinueShopping=()=>router.push('/')
    const router = useRouter()
    return (
        <Modal
        isOpen={modalIsOpen}
        className={styles.Modal}
        onRequestClose={handleCloseModal}
        overlayClassName={styles.Overlay}
        ariaHideApp={false}
        >
            <div>
                <div className={styles.orderCompleteContainer}>
                    <h4>ORDER COMPLETE!</h4>
                    <button onClick={handleCloseModal}><CloseIcon sx={{fontSize:'30px',color:'rgb(200,230,228)'}}/></button>  
                </div>
                <div className={styles.actionsContainer}>
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                    <button>Order history</button>
                </div>
            </div>
        </Modal>
    )
}