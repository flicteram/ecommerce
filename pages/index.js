import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header'
import ExploreIcon from '@mui/icons-material/Explore';
import DiamondIcon from '@mui/icons-material/Diamond';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Image from 'next/image';
import Product from '../components/Product/Product';
import {useEffect,useState,useContext} from 'react'
import bigphoto from '../components/Images/bigphoto.jpg'
import lowphoto from '../components/Images/lowphoto.jpg'
import Link from 'next/link';
import { Context } from '../components/Context/Context';
import { useInView } from 'react-hook-inview'

export default function Home() {
  const [featured,setFeatured]=useState([])
  const {products,loading}=useContext(Context)
  const iconsStyle={
    fontSize:50,
    color:'rgb(255, 240, 210)',
  }
  const getFeatured=()=>setFeatured(products.filter(item=>item.data.featured===true))

  const [missionRef,inViewMission]=useInView({unobserveOnEnter:true,threshold:0})
  const [visionRef,inViewVision]=useInView({unobserveOnEnter:true,threshold:0})
  const [historyRef,inViewHisory]=useInView({unobserveOnEnter:true,threshold:1})

  const handleInViewMission = () => inViewMission?styles.inViewObjective:styles.objective
  const handleInViewVision = () => inViewVision?styles.inViewObjective:styles.objective
  const handleInViewHistory = () => inViewHisory?styles.inViewObjective:styles.objective 
    
  useEffect(()=>{
    if(!loading){
      getFeatured()
    }
  },[loading])

  return (
    <div className={styles.container}>
      <Header home={true}/>
      <div className={styles.firstContainerAll}>
          <div className={styles.firstContainer}>
            <div className={styles.firstContainerLeft}>
              <h1>Design Your Comfort <span className={styles.zone}>Zone</span></h1>
              <p>“I think about every tree that is cut down, and the power and privilege we have to extend its life and to display its beauty in the furniture we make.” – Dave Allard</p>
              <Link href='/products'><button className={styles.shopNow}>SHOP NOW</button></Link>
            </div>

            <div className={styles.firstContainerRight}>
              <div className={styles.design}></div>
              <Image src={bigphoto} priority layout='fill' objectFit='cover' objectPosition={'100% 10%'} className={styles.imagePresentation}/>
              <div className={styles.lowPhoto}>
                <Image src={lowphoto} priority objectFit='cover' width='300' height='200' className={styles.imagePresentation}/>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondContainerAll}>
        <section className={styles.secondContainer}>
          <h2>Featured Products</h2>
          <div className={styles.productsContainer}>
            {featured.map((product,index)=>
            <Product key={index} index={index} product={product.data} id={product.id}/>)}
            </div>
          <Link href='/products'><button className={styles.allProducts}>ALL PRODUCTS</button></Link>
        </section>
        </div>
      <div className={styles.thirdContainerAll}>
        <section className={styles.thirdContainer}>
          <h2>Custom Furniture Built Only For You</h2>
          <p>We are here to make your dreams come true. Let us be part of your life.</p>
          <div className={styles.aboutContainer}>
            <div className={handleInViewMission()} ref={missionRef}>
              <ExploreIcon sx={iconsStyle}/>
              <h3>Mission</h3>
              <p>Our mission is to create Value for our customers through Reliability and Flexibility.
                We want our customers to experience the warmth and comfort through Respect and Trust.</p>
            </div>
            <div className={handleInViewVision()} ref={visionRef}>
              <DiamondIcon sx={iconsStyle}/>
              <h3>Vision</h3>
              <p>Our vision is to be a leading international furniture manufacturer
                offering innovative and superior quality products.</p>
            </div>
            <div className={handleInViewHistory()} ref={historyRef}>
              <HistoryEduIcon sx={iconsStyle}/>
              <h3>History</h3>
              <p>Our company has years of designing and making best quality furniture for thousands of happy costumers.</p>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.white}></div>
    </div>
  )
}
