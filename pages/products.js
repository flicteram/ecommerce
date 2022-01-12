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

    
    const categories=[...new Set(products.map(item=>item.category))].sort()
    const companies=[...new Set(products.map(item=>item.company))].sort()

    

    const [categoryChecked,setCategoryChecked]=useState([])
    const [companyChecked,setCompanyChecked]=useState([])

    const [categoryArray,setCategoryArray]=useState([])
    const [companyArray,setCompanyArray]=useState([])
    

    async function getProducts(){
        const data = []
        const querySnapshot = await getDocs(collection(db,'products'));
        querySnapshot.forEach((doc) => {
            data = [...data,doc.data()]
        });
        setCategoryChecked(new Array([...new Set(data.map(item=>item.category))].length).fill(false))
        setCompanyChecked(new Array([...new Set(data.map(item=>item.company))].length).fill(false))
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

    function advancedFilters(){
        if(categoryArray.length&&companyArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
            ))
        }
        else if(categoryArray.length||companyArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                ||
                companyArray.includes(item.company)
            ))
        }
        else{
            setDisplayProducts(products)
        }
    }
    useEffect(()=>{
        advancedFilters()
    },[categoryChecked,companyChecked])

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
            </div>
            <div className={styles.productsContainer}>
                {displayProducts.map((product,index)=>
                    <Product key={index} index={index} product={product}/>)}
            </div>
            
        </div>
    )
}