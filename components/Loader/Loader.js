import styles from '../../styles/Loader.module.css'
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader(){

    return (
    <div className={styles.loadingContainer}>
        <LinearProgress color={'inherit'} sx={{color:'rgb(214, 107, 19)',position:'absolute',top:'0',left:'0',right:'0'}}/>
        <p className={styles.logo}>Comfort<span className={styles.logoZone}>Zone</span></p>
    </div>
    )
}