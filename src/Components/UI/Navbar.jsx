import React from 'react'
import Cart from '../Fuctional/Cart'
import stylish from './Navbar.module.css'
function Navbar({ passToCart , RemoveItem, changeHandler , clearCart}) {

  return (
      <div className={stylish.cont}>
          <h1 >react food</h1>
          
      <Cart passToCart={passToCart} RemoveItem={RemoveItem } changeHandler={changeHandler} clearCart={clearCart} />
    </div>
  )
}
  
export default Navbar