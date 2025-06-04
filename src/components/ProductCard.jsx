import { useContext, useMemo } from "react"
import { formatNumber } from "../utils"
import Store from "../context"

const ProductCard = ({ product }) => {
    const { selected, reCalculate } = useContext(Store)

    const findCartItem = useMemo(() => selected.cart.find(item => item.name === product.name), [selected.cart, product.name])

    const addToCart = () => {
        const newCart = [...selected?.cart, { ...product, quantity: 1 }]
        reCalculate(newCart)
    }

    const incrementItem = () => {
        const itemIncrement = selected.cart.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)
        reCalculate(itemIncrement)
    }

    const decreamentItem = () => {
        const itemDecrement = selected.cart
            .map(item => {
                if (item.name === product.name) {
                    const newQty = item.quantity - 1
                    return newQty > 0 ? { ...item, quantity: newQty } : null
                }
                return item
            })
            .filter(Boolean) // removes nulls

        reCalculate(itemDecrement)
    }

    return (
        <div className="product-card">
            <div className={`img-container rounded-xl relative mb-6`}>
                <div className={`img-wrapper rounded-xl overflow-hidden border-2 ${findCartItem ? 'border-Red' : 'border-transparent'}`}>
                    <picture>
                        <source media="(min-width:992px)" srcSet={product.image.desktop} />
                        <source media="(min-width:469px)" srcSet={product.image.tablet} />
                        <source media="(max-width:468px)" srcSet={product.image.mobile} />
                        <img src={product.image.desktop} alt={product.name} className="w-full" />
                    </picture>
                </div>
                {
                    findCartItem
                        ?
                        <div className="absolute w-3/4 text-white -bottom-5 left-1/2 -translate-x-1/2 rounded-4xl border border-Red bg-Red transition-all ease-out flex items-center gap-2 justify-between p-2.5 px-4 font-semibold">
                            <button className="group cursor-pointer transition-all ease-out rounded-full w-6 h-6 grid place-items-center border border-white hover:bg-white" onClick={decreamentItem}>
                                <img className="transition-all ease-out group-hover:invert" src="/images/icon-decrement-quantity.svg" alt="Decrement Quantity Icon" />
                            </button>
                            <span>{findCartItem.quantity}</span>
                            <button className="group cursor-pointer transition-all ease-out rounded-full w-6 h-6 grid place-items-center border border-white hover:bg-white" onClick={incrementItem}>
                                <img className="transition-all ease-out group-hover:invert" src="/images/icon-increment-quantity.svg" alt="Increment Quantity Icon" />
                            </button>
                        </div>
                        :
                        <button onClick={addToCart} className="absolute w-max -bottom-5 left-1/2 -translate-x-1/2 rounded-4xl border border-Rose-500 transition-all ease-out hover:text-Red hover:border-Red bg-white cursor-pointer flex items-center gap-2 p-2.5 px-6 justify-center font-semibold">
                            <img src="/images/icon-add-to-cart.svg" alt="Add to cart icon" />
                            <span>Add to Cart</span>
                        </button>
                }
            </div>
            <span className="cate text-sm text-Rose-400">{product.category}</span>
            <h2 className="name text-lg text-Rose-900 font-semibold">{product.name}</h2>
            <span className="price text-Red font-medium">{formatNumber.format(product.price)}</span>
        </div>
    )
}

export default ProductCard