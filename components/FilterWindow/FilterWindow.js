import {useState} from 'react'
import styles from '../../styles/FilterWindow.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';


export default function FilterWindow(){
    const [filterActive,setFilterActive]=useState(false)
    return(
        <div className={filterActive?styles.filterActive: styles.filterNoActive}>
            <FilterAltIcon 
             sx={{color:'red'}}
             onClick={()=>setFilterActive(!filterActive)}/>
        </div>
    )
}