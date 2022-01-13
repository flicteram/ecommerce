import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import styles from '../styles/Products.module.css'
import {useEffect,useState} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import Image from "next/image";

export default function Products(){
    const [products,setProducts]=useState([])
    const [displayProducts,setDisplayProducts]=useState([])
    const [sortBy,setSortBy]=useState('')

    const [priceRange,setPriceRange]=useState(0)
 
    const categories=[...new Set(products.map(item=>item.category))].sort()
    const companies=[...new Set(products.map(item=>item.company))].sort()
    const colors = products.map(item=>item.colors).reduce((acc,currentVal)=>{
        acc.push(...currentVal)
        return [...new Set(acc)]
    },[]).sort()

    console.log(priceRange)

    const [categoryChecked,setCategoryChecked]=useState([])
    const [companyChecked,setCompanyChecked]=useState([])
    const [colorChecked,setColorChecked]=useState([])

    const [categoryArray,setCategoryArray]=useState([])
    const [companyArray,setCompanyArray]=useState([])
    const [colorArray,setColorArray]=useState([])
    

    async function getProducts(){
        const data = []
        const querySnapshot = await getDocs(collection(db,'products'));
        querySnapshot.forEach((doc) => {
            data = [...data,doc.data()]
        });
        setCategoryChecked(new Array([...new Set(data.map(item=>item.category))].length).fill(false))
        setCompanyChecked(new Array([...new Set(data.map(item=>item.company))].length).fill(false))
        setColorChecked(new Array(data.map(item=>item.colors).reduce((acc,currentVal)=>{
            acc.push(...currentVal)
            return [...new Set(acc)]
        },[]).length).fill(false))
        setPriceRange(data.sort((a,b)=>b.price-a.price)[0].price)
        setProducts(data)
        setDisplayProducts(data)
    }
    useEffect(()=>{
        getProducts()
    },[])
    
    function handleFilterPrice(){
        if(sortBy==='lowest'){
            setDisplayProducts([...displayProducts.sort((a,b)=>+a.price - +b.price)])
        }
        else if(sortBy==='highest'){
            setDisplayProducts([...displayProducts.sort((a,b)=>+b.price - +a.price)])
        }
    }

    function handlePriceRange(){
        setDisplayProducts(products.filter(item=>+item.price<=priceRange))
    }
    useEffect(()=>{
        handlePriceRange()
    },[priceRange])
    function advancedFilters(){
        if(categoryArray.length&&companyArray.length&&colorArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
            ))
        }
        else if(categoryArray.length&&companyArray.length&& !colorArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
                ))
        }
        else if(categoryArray.length&& !companyArray.length &&colorArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                ))
        }
        else if(!categoryArray.length&& companyArray.length &&colorArray.length){
            setDisplayProducts(products.filter(item=>
                companyArray.includes(item.company)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                ))
        }
        else if(categoryArray.length||companyArray.length||colorArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                ||
                companyArray.includes(item.company)
                ||
                item.colors.some(item2=>colorArray.includes(item2))
            ))
        }
        else{
            setDisplayProducts(products)
        }
    }
    useEffect(()=>{
        advancedFilters()
    },[categoryChecked,companyChecked,colorChecked])

    useEffect(()=>{
        if(products.length){
            handleFilterPrice()
        }
    },[sortBy])

    const handleSort=e=>setSortBy(e.target.value)

    function handleOnChangeChecked(position,checked,setCheckBoxState,setArrayState,initialArray){
        const updated = checked.map((item,index)=>
            index===position? !item : item
        )
        setCheckBoxState(updated)
        setArrayState(updated.reduce((acc,currentVal,index)=>{
            if(currentVal===true){
                acc.push(initialArray[index])
            }
            return acc
        },[]))
    }
    
    

    
    return (
        <div>
            {/* <Header/> */}
            <div>
                <select onChange={handleSort}>
                    <option value='' hidden>Sort by Price</option>
                    <option value='lowest'>Low-High</option>
                    <option value='highest'>High-Low</option>
                </select>
                <div>
                    {categories.map((category,index)=>
                        <label key={category}>
                            <input
                                type='checkbox'
                                value={category}
                                name={category}
                                checked={categoryChecked[index]}
                                onChange={()=>
                                handleOnChangeChecked(index,categoryChecked,setCategoryChecked,setCategoryArray,categories)}
                            />
                            {category}
                        </label>
                    )}
                </div>
                <div>
                    {companies.map((company,index)=>
                        <label key={company}>
                            <input
                                type='checkbox'
                                value={company}
                                name={company}
                                checked={companyChecked[index]}
                                onChange={()=>
                                handleOnChangeChecked(index,companyChecked,setCompanyChecked,setCompanyArray,companies)}
                            />
                            {company}
                        </label>
                    )}
                </div>
                <div>
                    {colors.map((color,index)=>
                        <label key={color}>
                            <input
                                type='checkbox'
                                value={color}
                                name={color}
                                checked={colorChecked[index]}
                                onChange={()=>
                                handleOnChangeChecked(index,colorChecked,setColorChecked,setColorArray,colors)}
                            />
                            {color}
                        </label>
                    )}
                </div>
                <div>
                    <label>
                    <input
                     type="range" 
                     min='0' 
                     max='999.99'
                     step='0.01'
                     value={priceRange} 
                     onChange={e=>setPriceRange(e.target.value)}/>
                        {priceRange}
                    </label>
                </div>
            </div>
            <div className={styles.productsContainer}>
                {displayProducts.map((product,index)=>
                    <Product key={index} index={index} product={product}/>)}
            </div>
            
        </div>
    )
}