import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header'
import ExploreIcon from '@mui/icons-material/Explore';
import DiamondIcon from '@mui/icons-material/Diamond';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Image from 'next/image';
import {db} from '../firebase'
import {useEffect,useState} from 'react'
import { collection, getDocs } from "firebase/firestore";
import bigphoto from '../components/Images/bigphoto.jpg'
import lowphoto from '../components/Images/lowphoto.jpg' 


export default function Home() {
  const [featured,setFeatured]=useState([])
  const iconsStyle={
    fontSize:50,
    color:'rgb(255, 240, 210)',
  }
  console.log(featured)
  async function getDataFromDb(){
    let data = []
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      data = [...data,doc.data()]
    });
    setFeatured(data)
  }
  useEffect(()=>{
    getDataFromDb()
  },[])
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.firstContainerAll}>
          <div className={styles.firstContainer}>
            <div className={styles.firstContainerLeft}>
              <h1>Design Your Comfort <span className={styles.zone}>Zone</span></h1>
              <p>“I think about every tree that is cut down, and the power and privilege we have to extend its life and to display its beauty in the furniture we make.” – Dave Allard</p>
              <button className={styles.shopNow}>SHOP NOW</button>
            </div>

            <div className={styles.firstContainerRight}>
              <div className={styles.design}></div>
              <Image src={bigphoto} layout='fill' objectFit='cover' objectPosition={'100% 10%'} className={styles.imagePresentation}/>
              <div className={styles.lowPhoto}>
                <Image src={lowphoto} objectFit='cover' width='300' height='200' className={styles.imagePresentation}/>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondContainerAll}>
        <section className={styles.secondContainer}>
          <h2>Featured Products</h2>
          <div className={styles.productsContainer}>
            {featured.map((product,index)=>(
              <div key={index} className={styles.productContainer}>
                <Image src={product.image} width={30} height={20} objectFit='cover' className={styles.image} objectPosition={'50% 70%'} layout='responsive'/>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>${product.price}</p>
                </div>
              </div>
            ))}
            </div>
          <button className={styles.allProducts}>ALL PRODUCTS</button>
        </section>
        </div>
      <div className={styles.thirdContainerAll}>
        <section className={styles.thirdContainer}>
          <h2>Custom Furniture Built Only For You</h2>
          <p>We are here to make your dreams come true. Let us be part of your life.</p>
          <div className={styles.aboutContainer}>
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
          </div>
        </section>
      </div>
    </div>
  )
}
