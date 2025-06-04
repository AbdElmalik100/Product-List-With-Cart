import { useContext, useEffect, useMemo, useState } from "react"
import Store from "../context"
import { formatNumber } from "../utils"
import OrderConfirmation from "./OrderConfirmation"


const Cart = () => {
    const { selected, reCalculate } = useContext(Store)
    const [confirm, setConfirm] = useState(false)

    const cartLength = useMemo(() => selected.cart.reduce((acc, curr) => acc + curr.quantity, 0), [selected.cart])

    const removeItem = (product) => reCalculate(selected.cart.filter(item => item.name !== product.name))

    const confirmOrder = () => {
        setConfirm(true)
    }

    useEffect(() => {
        confirm ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"
    }, [confirm])

    return (
        <div className="rounded-lg bg-white p-6 shadow-md flex-1/4 max-xl:flex-1/3 max-lg:flex-1/2 max-md:w-full">
            <h2 className="font-bold text-xl text-Red mb-6">Your Cart ({cartLength})</h2>
            {
                selected.cart.length > 0
                    ?
                    <div className="flex flex-col gap-3">
                        {
                            selected?.cart?.map((item, index) => (
                                <div key={index} className="item flex items-center gap-2 justify-between border-b border-Rose-100  pb-4">
                                    <div className="info">
                                        <h3 className="font-semibold text-Rose-900 mb-1">{item.name}</h3>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-Red font-bold">{item.quantity}x</span>
                                            <span className="text-Rose-400">@ {formatNumber.format(item.price)}</span>
                                            <span className="text-Rose-400 font-semibold">{formatNumber.format(item.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                    <button className="cursor-pointer rounded-full border p-1 border-Rose-300 transition-all ease-out hover:border-Red"
                                        onClick={() => removeItem(item)}>
                                        <img src="/images/icon-remove-item.svg" alt="Close Icon" />
                                    </button>
                                </div>
                            ))
                        }
                        <div className="order-summary mt-4">
                            <div className="flex items-center gap-2 justify-between">
                                <span className="text-sm text-Rose-900">Order Total</span>
                                <h3 className="font-bold text-2xl text-Rose-900">{formatNumber.format(selected.total)}</h3>
                            </div>
                            <div className="my-6 rounded-lg bg-Rose-100 p-4 justify-center flex items-center gap-2">
                                <img src="/images/icon-carbon-neutral.svg" alt="Carbon Neutral Icon" />
                                <p className="text-Rose-500 text-sm">
                                    This is a <span className="text-Rose-900">carbon-neutral</span> delivery
                                </p>
                            </div>
                            <button className="rounded-full p-3 px-4 text-center text-white bg-Red transition-all ease-out hover:bg-Rose-500 cursor-pointer w-full" onClick={confirmOrder}>Confirm Order</button>
                        </div>
                        <OrderConfirmation confirm={confirm} setConfirm={setConfirm} />
                    </div>
                    :
                    <div className="empty flex flex-col mb-4">
                        <img className="w-32 mx-auto mb-2" src="/images/illustration-empty-cart.svg" alt="Cart Empty Image" />
                        <p className="text-Rose-400 font-semibold text-sm text-center">Your added items will appear here</p>
                    </div>
            }
        </div>
    )
}

export default Cart