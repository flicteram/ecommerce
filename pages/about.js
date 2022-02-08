import Header from '../components/Header/Header'
import Path from '../components/Path/Path'
import aboutImage from '../components/Images/aboutImage.jpg'
import Image from 'next/image'
import styles from '../styles/About.module.css'

export default function About(){

    return (
        <div>
            <Header about={true}/>
            <Path
                first={'About'}
                firstLink={'/about'}
            />
            <div className={styles.aboutContainer}>
                <div className={styles.image}>
                    <Image src={aboutImage} layout="fill" objectFit='cover'/>
                </div>
                <div className={styles.storyContainer}>
                    <h1>Our Story</h1>
                    <p>Once upon a time, in the land far, far away…
                    this could be the beginning of a fairy tale about tables that set themselves and mattresses so comfortable that no princess would have the slightest bruise from sleeping on them. Even though we do not have a magic wand, we know how to make your interior design dreams come true…and all that without you stepping out of the house!
                    </p>
                </div>
            </div>
        </div>
    )
}