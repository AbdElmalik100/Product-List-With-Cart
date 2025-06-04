import { useState } from "react"
import Cart from "./components/Cart"
import Products from "./components/Products"
import Store from "./context"


function App() {
  const [selected, setSelected] = useState({
    cart: [],
    total: 0
  })

  const reCalculate = (cartItems) => {
    const validItems = cartItems.filter(item => item && item.quantity > 0)
    const total = validItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)

    setSelected({ cart: validItems, total })
  }

  return (
    <Store.Provider value={{ selected, setSelected, reCalculate }}>
      <main className="min-h-screen">
        <div className="container min-h-screen py-12 flex gap-8 items-start max-md:flex-col">
          <Products />
          <Cart />
        </div>
      </main>
    </Store.Provider>
  )
}

export default App
