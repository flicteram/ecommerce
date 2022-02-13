import Header from '../../components/Header/Header'
import Product from "../../components/Product/Product";
import styles from '../../styles/Products.module.css'
import {useEffect,useState} from 'react'
import advancedFilter from '../../components/Filter/advancedFilter/advancedFilter'
import GridViewIcon from '@mui/icons-material/GridView';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import Path from '../../components/Path/Path'
import CheckIcon from '@mui/icons-material/Check';
import ProductWithDescription from "../../components/ProductWithDescription/ProductWithDescription";
import Footer from '../../components/Footer/Footer';
import {db} from '../../firebase'
import { getDocs,collection } from 'firebase/firestore'

export async function getStaticProps(){
    const querySnapshot = await getDocs(collection(db,'products'));
    const products = querySnapshot.docs.map(product=>({
        id:product.id,data:product.data()
    }))
    return {
        props:{products:products}
    }
}

export default function Products({products}){

    const [grid,setGrid]=useState(true)
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

    const categories=[...new Set(products.map(item=>item.data.category))].sort()
    const companies=[...new Set(products.map(item=>item.data.company))].sort()
    const colors = products.map(item=>item.data.colors).reduce((acc,currentVal)=>{
        acc.push(...currentVal)
        return [...new Set(acc)]
    },[]).sort()
    function getFilters(){        
        setCategoryChecked(new Array([...new Set(products.map(item=>item.data.category))].length).fill(false))
        setCompanyChecked(new Array([...new Set(products.map(item=>item.data.company))].length).fill(false))
        setColorChecked(new Array(products.map(item=>item.data.colors).reduce((acc,currentVal)=>{
            acc.push(...currentVal)
            return [...new Set(acc)]
        },[]).length).fill(false))
        setPriceRange(products.map(item=>item.data).sort((a,b)=>b.price-a.price)[0].price)
        setDisplayProducts(products.sort((a,b)=>a.data.price-b.data.price))
    }
    function handleFilterPrice(){
        if(sortBy==='lowest'){
            setDisplayProducts([...products.sort((a,b)=>+a.data.price - +b.data.price)])
            if(categoryArray.length||companyArray.length||colorArray.length||priceRange>=0){
                setDisplayProducts([...displayProducts.sort((a,b)=>+a.data.price - +b.data.price)])
            }
        }
        else if(sortBy==='highest'){
            setDisplayProducts([...products.sort((a,b)=>+b.data.price - +a.data.price)])
            if(categoryArray.length||companyArray.length||colorArray.length||priceRange>=0){
                setDisplayProducts([...displayProducts.sort((a,b)=>+b.data.price - +a.data.price)])
            }
        }
    }
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

    const handleSort=e=>setSortBy(e.target.value)
    const handleSearch=e=>setSearch(e.target.value)
    useEffect(()=>{
        getFilters()
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
            priceRange
        )
    },[categoryChecked,companyChecked,colorChecked,priceRange,search])

    return (
        <div className={filterWindow?styles.noScrollBar:styles.container}>
            <Header
                products={true}
            />
            <Path 
            first={'Products'} 
            firstLink={'/products'}
            />
            <div className={styles.productsFilterContainer}>
                <div className={styles.filterContainer}>
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
                </div>
                <div className={styles.productsAndFilterContainer}>
                    <div className={styles.filterFromProductsSide}>
                        <div className={styles.filterOptions}>
                            <button onClick={()=>setFilterWindow(!filterWindow)}>
                            <span className={styles.filter}>Filter</span>
                            {
                            allFilters.length?
                            <span>{allFilters.length} active filters</span>
                            :
                            <span>Apply filters</span>
                            }
                            </button>
                            <button style={{backgroundColor:grid&&'black'}} onClick={()=>setGrid(true)}><GridViewIcon sx={{color:grid&&'rgb(214, 107, 19)'}}/></button>
                            <button style={{backgroundColor:!grid&&'black'}} onClick={()=>setGrid(false)}><ViewHeadlineIcon sx={{color:!grid&&'rgb(214, 107, 19)'}} /></button>
                        </div>
                        <div className={styles.sortByPriceContainer}>
                            <p>Sort By Price</p>
                            <select onChange={handleSort}>
                                <option value='lowest'>Low-High</option>
                                <option value='highest'>High-Low</option>
                            </select>
                        </div>
                        <p className={styles.productsFound}>{displayProducts.length} Products Found</p>
                    </div>
                    <div className={grid?styles.productContainer:styles.porductContainerNoGrid}>
                    {displayProducts.length?
                        displayProducts.map((product,index)=>
                            grid?
                            <Product key={index} id={product.id} index={index} product={product.data}/>
                            :
                            <ProductWithDescription key={index} id={product.id} product={product.data}/>
                        )   
                        :
                        <p className={styles.noProductsFound}>No products matched your search.</p>
                    }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
