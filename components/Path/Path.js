import styles from '../../styles/Path.module.css'
import Link from 'next/link'

export default function Path({first,firstLink,second,secondLink}){

    return (
        <div className={styles.pathContainer}>
            <Link href='/'><h3>Home</h3></Link>
            <span className={styles.slash}>/</span> 
            <Link href={firstLink}><h3>{first}</h3></Link>
            {second&&<span className={styles.slash}>/</span>}
            {second&&<Link href={secondLink}><h3>{second}</h3></Link>}
        </div>
    )
}