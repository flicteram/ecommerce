export default function advancedFilter(
    categoryArray,
    companyArray,
    colorArray,
    search,
    setDisplayProducts,
    products,
    setAllFilters,
    priceRange){

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