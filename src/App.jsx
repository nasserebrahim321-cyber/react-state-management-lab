import { useState } from "react"

function App() {
  const initItems = [
    {
      id: 1,
      name: "Black T shirt",
      price: 5
    },
    {
      id: 2,
      name: "Hanger Set",
      price: 8
    },
    {
      id: 3,
      name: "Thoub",
      price: 12
    },
    {
      id: 4,
      name: "Computer Bag",
      price: 20
    },
    {
      id: 5,
      name: "Couch",
      price: 50
    },
    {
      id: 6,
      name: "Gaming Chair",
      price: 70
    }
  ]
  const [availableItems, setAvailableItems] = useState(initItems)

  const [shoppingCart, setShoppingCart] = useState([])

  const [availableBalance, setAvailableBalance] = useState(100)

  const [warningMessage, setWarningMessage] = useState(null)

  function handleAddToCart(item) {
    if (item.price <= availableBalance) {
      setAvailableItems(availableItems.filter((i) => {
        return i.id !== item.id
      }))
      setShoppingCart([...shoppingCart, item])

      setAvailableBalance(availableBalance - item.price)
    }
    else {
      setWarningMessage("Insufficient funds. Your balance is too low to purchase this item")
      setTimeout(() => {
        setWarningMessage(null);
      }, 4000);

    }
  }

  function handleRemoveFromShoppingCart(item) {
    setShoppingCart(shoppingCart.filter((i) => {
      return i.id !== item.id
    }))
    setAvailableItems([...availableItems, item])
    setAvailableBalance(availableBalance + item.price)
  }
  return (
    <>
      <h1>Zaid's Closet</h1>
      {warningMessage ? <p>{warningMessage}</p> : null}

      <h2>Your Balance: {availableBalance} BD</h2>

      <h2>Available Items</h2>
      {availableItems.map((item) =>
        <div key={item.id}>
          <p>
            item name: {item.name} & it's price {item.price} || <button onClick={() => { handleAddToCart(item) }} >Add to Cart</button>
          </p>
        </div>)}

      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0 ? <p> please add items to the cart </p> : null}
      {shoppingCart.map((item) =>
        <div key={item.id}>
          <p>
            item name: {item.name} & it's price {item.price} || <button onClick={() => { handleRemoveFromShoppingCart(item) }} >remove from cart</button>
          </p>
        </div>)}
    </>
  )
}

export default App
