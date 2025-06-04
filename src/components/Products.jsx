import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"


const Products = () => {
    const [products, setProducts] = useState(null)

    const getProducts = async () => {
        const data = await (await fetch('data.json')).json()
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className="products flex-3/4 max-lg:w-full">
            <h1 className="text-4xl font-bold mb-6">Desserts</h1>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                {
                    products &&
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products