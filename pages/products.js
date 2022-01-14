import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import styles from '../styles/Products.module.css'
import {useEffect,useState} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase'
import CheckIcon from '@mui/icons-material/Check';
import { Hidden } from "@mui/material";

export default function Products(){
    const [filterWindow,setFilterWindow]=useState(false)
    const [products,setProducts]=useState([])
    const [displayProducts,setDisplayProducts]=useState([])
    const [sortBy,setSortBy]=useState('low')
    const [search,setSearch]=useState('')
    const [priceRange,setPriceRange]=useState(0)

    const categories=[...new Set(products.map(item=>item.category))].sort()
    const companies=[...new Set(products.map(item=>item.company))].sort()
    const colors = products.map(item=>item.colors).reduce((acc,currentVal)=>{
        acc.push(...currentVal)
        return [...new Set(acc)]
    },[]).sort()

    function handleAllFilters(item){
        if(categories.includes(item)){
            handleOnChangeChecked(categories.indexOf(item),categoryChecked,setCategoryChecked,setCategoryArray,categories)
        }
        else if(companies.includes(item)){
            handleOnChangeChecked(companies.indexOf(item),companyChecked,setCompanyChecked,setCompanyArray,companies)
        }
        else if(colors.includes(item)){
            handleOnChangeChecked(colors.indexOf(item),colorChecked,setColorChecked,setColorArray,colors)
        }
    }

    const [categoryChecked,setCategoryChecked]=useState([])
    const [companyChecked,setCompanyChecked]=useState([])
    const [colorChecked,setColorChecked]=useState([])

    const [categoryArray,setCategoryArray]=useState([])
    const [companyArray,setCompanyArray]=useState([])
    const [colorArray,setColorArray]=useState([])

    const [allFilters,setAllFilters]=useState([])
    
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
    function advancedFilters(){
        if(categoryArray.length&&companyArray.length&&colorArray.length&&search.length){
            setDisplayProducts([...products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...categoryArray,...companyArray,...colorArray])
        }
        else if(categoryArray.length&&companyArray.length&& !colorArray.length && search.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
                ))
            setAllFilters([...categoryArray,...companyArray])
        }
        else if(categoryArray.length&& !companyArray.length &&colorArray.length && search.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
                ))
            setAllFilters([...categoryArray,...colorArray])
        }
        else if(!categoryArray.length&& companyArray.length &&colorArray.length && search.length){
            setDisplayProducts(products.filter(item=>
                companyArray.includes(item.company)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
                ))
            setAllFilters([...companyArray,...colorArray])
        }
        else if(categoryArray.length&&companyArray.length&&colorArray.length&&!search.length){
            setDisplayProducts([...products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...categoryArray,...companyArray,...colorArray])
        }
        else if(categoryArray.length&&companyArray.length&&!colorArray.length&&!search.length){
            setDisplayProducts([...products.filter(item=>
                categoryArray.includes(item.category)
                &&
                companyArray.includes(item.company)
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...categoryArray,...companyArray])
        }
        else if(categoryArray.length&&!companyArray.length&&colorArray.length&&!search.length){
            setDisplayProducts([...products.filter(item=>
                categoryArray.includes(item.category)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...categoryArray,...colorArray])
        }
        else if(!categoryArray.length&&companyArray.length&&colorArray.length&&!search.length){
            setDisplayProducts([...products.filter(item=>
                companyArray.includes(item.company)
                &&
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...companyArray,...colorArray])
        }
        else if(categoryArray.length&&!companyArray.length&&!colorArray.length&&search.length){
            setDisplayProducts([...products.filter(item=>
                categoryArray.includes(item.category)
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...categoryArray])
        }
        else if(!categoryArray.length&&companyArray.length&&!colorArray.length&&search.length){
            setDisplayProducts([...products.filter(item=>
                companyArray.includes(item.company)
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...companyArray])
        }
        else if(!categoryArray.length&&!companyArray.length&&colorArray.length&&search.length){
            setDisplayProducts([...products.filter(item=>
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
            )])
            setAllFilters([...colorArray])
        }
        else if(categoryArray.length||companyArray.length||colorArray.length){
            setDisplayProducts(products.filter(item=>
                categoryArray.includes(item.category)
                &&
                +item.price<=priceRange
                ||
                companyArray.includes(item.company)
                &&
                +item.price<=priceRange
                ||
                item.colors.some(item2=>colorArray.includes(item2))
                &&
                +item.price<=priceRange
            ))
            setAllFilters([...categoryArray,...companyArray,...colorArray])
        }
        else if(!categoryArray.length&&!companyArray.length&&!colorArray.length&&search.length){
            setDisplayProducts(products.filter(item=>
                item.name.toLowerCase().includes(search.toLowerCase())
                &&
                +item.price<=priceRange
            ))
            setAllFilters([])
        }
        else{
            setDisplayProducts(products.filter(item=>+item.price<=priceRange))
            setAllFilters([])
        }
    }

    const handleSort=e=>setSortBy(e.target.value)
    const handleSearch=e=>setSearch(e.target.value)

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

    useEffect(()=>{
        getProducts()
    },[])
    useEffect(()=>{
        handleFilterPrice()
    },[sortBy])
    useEffect(()=>{
        advancedFilters()
    },[categoryChecked,companyChecked,colorChecked,priceRange,search])

    return (
        <div style={{position:'relative'}}>
            {/* <Header/> */}
            <div className={styles.filterOptions}>
                <button onClick={()=>setFilterWindow(!filterWindow)}>Filter <span>Apply filters</span></button>
            </div>
            <div className={filterWindow?styles.filtersContainerActive:styles.filtersContainerNotActive}>
                <div className={styles.filterDisplayContainer}>
                    <div className={styles.productsFoundContainer}>
                        <h4>{displayProducts.length} Products Found</h4>
                        <button className={styles.displayButton} onClick={()=>setFilterWindow(!filterWindow)}>Display</button>
                    </div>
                    <div className={styles.allFiltersContainer}>
                        {allFilters.length?
                            allFilters.map((item,index)=>
                            <button 
                            className={styles.filterDisplay} 
                            key={index} 
                            onClick={()=>handleAllFilters(item)}>
                            {item}<span>X</span></button>
                            )
                            :
                            <p>No filters applied</p>   
                        }
                    </div>
                </div>
                <div className={styles.searchContainer}>
                    <input
                    className={styles.search}
                    type='text'
                    value={search}
                    name={search}
                    onChange={handleSearch}
                    placeholder="Search"
                    />
                </div>
                <div className={styles.categoriesContainer}>
                    <h4>Category</h4>
                    <div className={styles.categoriesContainerSelect}>
                        {categories.map((category,index)=>
                            <label key={category} className={styles.categoryLabel}>
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
                </div>
                <div className={styles.companiesContainer}>
                    <h4>Company</h4>
                    <div className={styles.companiesContainerSelect}>
                        {companies.map((company,index)=>
                            <label key={company} className={styles.companyLabel}>
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
                <div className={styles.colorsContainer}>
                    <h4>Colors</h4>
                    <div className={styles.colorsContainerSelect}>
                        {colors.map((color,index)=>
                            <label key={color} className={styles.colorLabel}>
                                <input
                                    type='checkbox'
                                    hidden
                                    value={color}
                                    name={color}
                                    checked={colorChecked[index]}
                                    onChange={()=>
                                    handleOnChangeChecked(index,colorChecked,setColorChecked,setColorArray,colors)}
                                />
                                <div className={styles.color} style={{backgroundColor:color}}>
                                    {colorChecked[index]&&<CheckIcon sx={{color:'rgb(214, 107, 19)',fontSize:18}}/>}
                                </div>
                            </label>
                        )}
                    </div>
                </div>
                <div className={styles.priceContainer}>
                    <h4>Price</h4>
                    <label className={styles.priceLabel}>
                        {`$${priceRange}`}
                        <input
                        type="range" 
                        min='0' 
                        max='999.99'
                        step='0.01'
                        value={priceRange} 
                        onChange={e=>setPriceRange(e.target.value)}/>
                    </label>
                </div>
            </div>
            <select onChange={handleSort}>
                <option value='lowest'>Low-High</option>
                <option value='highest'>High-Low</option>
            </select>
            <div style={{display:filterWindow&&'none'}} className={styles.productsContainer}>
                {displayProducts.map((product,index)=>
                    <Product key={index} index={index} product={product}/>)}
            </div>
        </div>
    )
}