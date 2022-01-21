import {useState} from 'react'
import Image from 'next/image'
import styles from '../../styles/ImagesCarousel.module.css'

export default function ImagesCarousel({images=[]}){
    const [position,setPosition]=useState(0)

    const handleOnClickRight=()=>{
        if(position===images.length-1){
            setPosition(0)
        }
        else {
            setPosition(position+1)
        }
    }
    const handleOnClickLeft=()=>{
        if(position===0){
            setPosition(images.length-1)
        }
        else{
            setPosition(position-1)
        }
    }
    return(
        <div className={styles.imageCarouselContainer}>
            <div className={styles.featuredImageContainer}>
                {images.map((image,index)=>
                <div key={image} className={position===index?styles.display:styles.noDisplay}>
                    <Image 
                    layout='fill'
                    objectFit='cover'
                    src={image}
                    priority
                    objectPosition={'50% 70%'}
                    />
                </div>
                )}
                <div className={styles.buttonsContainer}>
                    <button onClick={handleOnClickLeft}>{'<'}</button>
                    <button onClick={handleOnClickRight}>{'>'}</button>
                </div>
            </div>
            <div className={styles.previewContainer}>
                {images.map((image,index)=>
                    <div key={image}>
                        <div className={styles.imagePreviewLow}>
                            <Image 
                            key={image} 
                            layout='fill' 
                            objectFit='cover'
                            src={image} 
                            onClick={()=>setPosition(index)}
                            />
                        </div>
                        <div 
                        key={index} 
                        className={styles.dots} 
                        onClick={()=>setPosition(index)}
                        style={{backgroundColor:position===index&&'rgb(214, 107, 19)'}}    
                        ></div>
                    </div>
                )}
            </div>
        </div>
    )
}