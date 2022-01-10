import {db,storage} from '../../firebase'
import {useEffect, useState} from 'react'
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes,ref, getDownloadURL } from 'firebase/storage';

export default function AddItems(){
    const [name,setName] = useState('')
    const [price,setPrice]=useState(0)
    const [image,setImage]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('')
    const [colors,setColors]=useState([])
    const [description, setDescription]=useState('')

    async function handleSubmit(e){
        e.preventDefault()
        const docRef = await addDoc(collection(db,"products"),{
            name:name,
            price:price,
            image:image,
            category:category,
            company:company,
            colors:colors.split(' '),
            description:description
        })
        setPrice(0)
        setName('')
        setImage('')
        setCategory('')
        setCompany('')
        setColors('')
        setDescription('')
    }
    function handleFile(e){
        let file = e.target.files[0]

        const storageRef = ref(storage, file.name)
        uploadBytes(storageRef,file).then((snapshot)=>{
            console.log('Uploaded')
        })
        .then(()=>{
            getDownloadURL(ref(storage,file.name))
            .then((url)=>{
                setImage(url)
            })
        })
    }
    return (
        <div>
            <form onSubmit={e=>handleSubmit(e)}>
                <input 
                type="text" 
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder='Product name'
                />
                <input 
                type="text"
                value={price}
                onChange={e=>setPrice(e.target.value)}
                placeholder='Product price'    
                />
                <input 
                type="text"
                value={category}
                onChange={e=>setCategory(e.target.value)}
                placeholder='Product Category'    
                />
                <input 
                type="text"
                value={company}
                onChange={e=>setCompany(e.target.value)}
                placeholder='Product Company'    
                />
                <input 
                type="text"
                value={colors}
                onChange={e=>setColors(e.target.value)}
                placeholder='Product Colors'    
                />
                <input 
                type="text"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                placeholder='Product Description'    
                />
                <input 
                type='file'
                value={''}
                onChange={e=>handleFile(e)}/>
                <button>Add product</button>
            </form>
        </div>
    )
}