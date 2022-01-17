import styles from '../../../styles/FilterDisplay.module.css'
import CheckIcon from '@mui/icons-material/Check';


export default function FilterDisplay({
    allFilters,
    filterWindow,
    displayProducts,
    search,
    handleSearch,
    categories,
    companies,
    colors,
    priceRange,
    categoryChecked,
    companyChecked,
    colorChecked,
    filterWindow,
    setFilterWindow,
    setCategoryChecked,
    setCompanyChecked,
    setColorChecked,
    setCategoryArray,
    setCompanyArray,
    setColorArray,
    setPriceRange
    }){

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
    return(
        <>
        <div className={styles.filterOptions}>
                <button onClick={()=>setFilterWindow(!filterWindow)}>
                Filter 
                {
                allFilters.length?
                <span>{allFilters.length} active filters</span>
                :
                <span>Apply filters</span>
                }
                </button>
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
            </>
    )
}