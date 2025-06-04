import { useContext } from "react"
import { formatNumber } from "../utils"
import { motion, AnimatePresence } from "framer-motion"
import Store from "../context"


const OrderConfirmation = ({ confirm, setConfirm }) => {
    const { selected, setSelected } = useContext(Store)

    const startNewOrder = () => {
        setConfirm(false)
        setSelected({
            cart: [],
            total: 0
        })
    }

    return (
        <AnimatePresence>
            {
                confirm &&
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                    className="overlay"
                >
                    <motion.div
                        key="confirm box"
                        initial={window.innerWidth < 767 ? { y: 1000, opacity: 0 } : { scale: 0.9, opacity: 0 }}
                        animate={window.innerWidth < 767 ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 }}
                        exit={window.innerWidth < 767 ? { y: 1000, opacity: 0 } : { scale: 0.9, opacity: 0 }}
                        transition={{ ease: "easeOut", duration: window.innerWidth < 767 ? 0.2 : 0.1 }}
                        className="confirmation-box w-[500px] p-8 bg-white shadow rounded-lg max-md:w-full max-md:rounded-b-none"
                    >
                        <img className="w-10 mb-4" src="/images/icon-order-confirmed.svg" alt="Check Icon" />
                        <h2 className="text-Rose-900 font-bold text-3xl">Order Confirmed</h2>
                        <span className="text-Rose-500 text-sm mt-1 block">We hope you enjoy your food!</span>
                        {
                            selected.cart.length > 0 &&
                            <div className="order-list p-6 bg-Rose-50 rounded-lg mt-6">
                                {
                                    selected.cart.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-center pb-4 mb-4 border-b border-Rose-100">
                                            <img className="rounded-lg w-14 h-14" src={item.image.thumbnail} alt={item.name} />
                                            <div className="info flex flex-col gap-2 text-sm">
                                                <h3 className="font-bold text-Rose-900">{item.name}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-Red font-bold">{item.quantity}x</span>
                                                    <span className="text-Rose-500">@ {formatNumber.format(item.price)}</span>
                                                </div>
                                            </div>
                                            <span className="flex-grow text-end text-Rose-900 font-semibold">{formatNumber.format(item.price * item.quantity)}</span>
                                        </div>
                                    ))
                                }
                                <div className="flex items-center gap-2 justify-between mt-6">
                                    <span className="text-sm text-Rose-900">Order Total</span>
                                    <h3 className="font-bold text-2xl text-Rose-900">{formatNumber.format(selected.total)}</h3>
                                </div>
                            </div>
                        }
                        <button className="rounded-full p-3 px-4 text-center text-white bg-Red transition-all ease-out hover:bg-Rose-500 cursor-pointer w-full mt-6" onClick={startNewOrder}>Start New Order</button>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default OrderConfirmation