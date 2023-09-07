import { useState } from "react"
import { useRouter } from "next/router"
export default function useLoadingSRR(){
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleProductDetails = (id) =>{
      return ()=>{
          setLoading(true)
          router.push(`products/${id}`)
      }
  }

  const handleNavigateToProducts = () =>{
    return ()=>{
      setLoading(true)
      router.push(`products`)
    }
}

  return {
    loading,
    handleProductDetails,
    handleNavigateToProducts
  }
}