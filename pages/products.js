import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import styles from '../styles/Products.module.css'
import {useEffect,useState} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import advancedFilter from '../components/Filter/advancedFilter/advancedFilter'
import FilterDisplay from "../components/Filter/FilterDisplay/FilterDisplay";

export default function Products(){
    const [products,setProducts]=useState([])
    const [displayProducts,setDisplayProducts]=useState([])

    const [search,setSearch]=useState('')
    const [filterWindow,setFilterWindow]=useState(false)

    const [sortBy,setSortBy]=useState('low')
    const [priceRange,setPriceRange]=useState(0)

    const [categoryChecked,setCategoryChecked]=useState([])
    const [companyChecked,setCompanyChecked]=useState([])
    const [colorChecked,setColorChecked]=useState([])

    const [categoryArray,setCategoryArray]=useState([])
    const [companyArray,setCompanyArray]=useState([])
    const [colorArray,setColorArray]=useState([])

    const [allFilters,setAllFilters]=useState([])

    const categories=[...new Set(products.map(item=>item.category))].sort()
    const companies=[...new Set(products.map(item=>item.company))].sort()
    const colors = products.map(item=>item.colors).reduce((acc,currentVal)=>{
        acc.push(...currentVal)
        return [...new Set(acc)]
    },[]).sort()
    
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
        setProducts(data.sort((a,b)=>a.price-b.price))
        setDisplayProducts(data)
    }

    function handleFilterPrice(){
        if(sortBy==='lowest'){
            setDisplayProducts([...products.sort((a,b)=>+a.price - +b.price)])
            if(categoryArray.length||companyArray.length||colorArray.length||priceRange>=0){
                setDisplayProducts([...displayProducts.sort((a,b)=>+a.price - +b.price)])
            }
        }
        else if(sortBy==='highest'){
            setDisplayProducts([...products.sort((a,b)=>+b.price - +a.price)])
            if(categoryArray.length||companyArray.length||colorArray.length||priceRange>=0){
                setDisplayProducts([...displayProducts.sort((a,b)=>+b.price - +a.price)])
            }
        }
    }

    const handleSort=e=>setSortBy(e.target.value)
    const handleSearch=e=>setSearch(e.target.value)

    useEffect(()=>{
        getProducts()
    },[])
    useEffect(()=>{
        handleFilterPrice()
    },[sortBy])
    useEffect(()=>{
        advancedFilter(
        categoryArray,
        companyArray,
        colorArray,
        search,
        setDisplayProducts,
        products,
        setAllFilters,
        priceRange)
    },[categoryChecked,companyChecked,colorChecked,priceRange,search])

    return (
        <div style={{position:'relative'}}>
            {/* <Header/> */}
            <div>
                <p>{displayProducts.length} Products Found</p>
            </div>
            <FilterDisplay
                allFilters={allFilters}
                displayProducts={displayProducts}
                search={search}
                handleSearch={handleSearch}
                categories={categories}
                companies={companies}
                colors={colors}
                priceRange={priceRange}
                categoryChecked={categoryChecked}
                companyChecked={companyChecked}
                colorChecked={colorChecked}
                filterWindow={filterWindow}
                setFilterWindow={setFilterWindow}
                setCategoryChecked={setCategoryChecked}
                setCompanyChecked={setCompanyChecked}
                setColorChecked={setColorChecked}
                setCategoryArray={setCategoryArray}
                setCompanyArray={setCompanyArray}
                setColorArray={setColorArray}
                setPriceRange={setPriceRange}
            />
            <div>
                <p>Sort by price</p>
                <select onChange={handleSort}>
                    <option value='lowest'>Low-High</option>
                    <option value='highest'>High-Low</option>
                </select>
            </div>
            <div style={{display:filterWindow&&'none'}} className={styles.productsContainer}>
                {displayProducts.map((product,index)=>
                    <Product key={index} index={index} product={product}/>)}
            </div>
        </div>
    )
}