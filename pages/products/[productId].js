import { useRouter } from 'next/router'

export default function ProductDetails(){

    const router = useRouter()
    const { productId } = router.query

    console.log(productId)
    return (
        <h1>{productId}</h1>
    )
}