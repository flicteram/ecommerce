import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header'
import ExploreIcon from '@mui/icons-material/Explore';
import DiamondIcon from '@mui/icons-material/Diamond';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

export default function Home() {

  const iconsStyle={
    fontSize:50,
    color:'rgb(255, 240, 210)',
  }
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.firstContainer}>
        <h1>Design Your Comfort <span className={styles.zone}>Zone</span></h1>
        <p>“I think about every tree that is cut down, and the power and privilege we have to extend its life and to display its beauty in the furniture we make.” – Dave Allard</p>
        <button className={styles.shopNow}>SHOP NOW</button>
      </div>
      <section className={styles.thirdContainer}>
        <h2>Custom Furniture Built Only For You</h2>
        <p>We are here to make your dreams come true. Let us be part of your life.</p>
        <div className={styles.mission}>
          <ExploreIcon sx={iconsStyle}/>
          <h3>Mission</h3>
          <p>Our mission is to create Value for our customers through Reliability and Flexibility.
            We want our customers to experience the warmth and comfort through Respect and Trust.</p>
        </div>
        <div className={styles.vision}>
          <DiamondIcon sx={iconsStyle}/>
          <h3>Vision</h3>
          <p>Our vision is to be a leading international furniture manufacturer
            offering innovative and superior quality products.</p>
        </div>
        <div className={styles.history}>
          <HistoryEduIcon sx={iconsStyle}/>
          <h3>History</h3>
          <p>Our company has years of designing and making best quality furniture for thousands of happy costumers.</p>
        </div>
      </section>
    </div>
  )
}
