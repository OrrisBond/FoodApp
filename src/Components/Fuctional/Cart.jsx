import React , {useState} from 'react'
import { BsCart4 } from 'react-icons/bs'
import stylish from './Cart.module.css'
import CartTab from '../UI/CartTab'


function Cart({passToCart ,RemoveItem, changeHandler, clearCart}) {
  const [carted, setCarted] = useState(false)
  const [show, setShow] = useState(false)
  const [refresh , setRefresh]=useState(false)


  const closeHandler = () => {
    setCarted(false)
  }

  const openCart = () => {
    setCarted(true)
    if (passToCart.length > 0) {
      setShow(false)
    } 
    if (passToCart.length <= 0) {
      setShow(true)
    }
    setRefresh((prev)=>!prev)
  }

  const totalItems = passToCart.map(item => {
    return [item.qnty]
  }).reduce((a, b) => parseInt(a) + parseInt(b), 0)
  

  return (<>
    {carted && <CartTab insideCart={passToCart} handler={closeHandler} RemoveItem={RemoveItem} changeHandler={changeHandler} show={show} clearCart={clearCart} />}
      <button onClick={openCart} className={stylish.cartBtn}>
      <BsCart4 className={stylish.cart} />
      <p className={stylish.text}>Your Cart</p>
      <p className={stylish.counter}>{totalItems}</p>
    </button>
  </>
  )
}

export default Cart