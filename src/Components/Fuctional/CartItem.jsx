import React, { useRef, useState } from 'react'
import stylish from './CartItem.module.css'

function CartItem({ cartItems, RemoveItem, changeHandler }) {
  const counter = useRef() 
  const [total , setTotal] = useState((cartItems.price * cartItems.qnty).toFixed(2))
  
  
  const increaseHandler = (e) => {
    let enteredValue = counter.current.innerHTML
     counter.current.innerHTML = +enteredValue +1
   let target = e.target.id
    let price = +cartItems.price

    let qnty = +counter.current.innerHTML

    let total = price*qnty
    setTotal(total.toFixed(2))

    let type = {
      type: 'plus',
      id: cartItems.id,
      btnId: target
    }
     changeHandler(type)
  }
  
  const decreaseHandler = (e) => {
     if (counter.current.innerHTML == 1) {
     return
     }
     let enteredValue = counter.current.innerHTML
       counter.current.innerHTML = +enteredValue - 1
    let target = e.target.id
    let price = +cartItems.price
    let qnty = +counter.current.innerHTML

    let total = price*qnty
    setTotal(total.toFixed(2))
    let type = {
      type: 'minus',
      id:cartItems.id,
      btnId: target,
    }
     changeHandler(type)
   }
  
  
    
        return  <div className={stylish.cont} key={cartItems.id} id={cartItems.id}>
              <img src={cartItems.img} alt="" />
              <div className={stylish.dits}>
                <h1>{cartItems.title}</h1>
             
              </div>
            
                    <div className={stylish.math}>
              <button onClick={increaseHandler} id={cartItems.id}>+</button>
            <span ref={counter} className={stylish.counter}>{cartItems.qnty}</span>
            <button onClick={decreaseHandler} id={cartItems.id}>-</button>    
          </div>
          <p className={stylish.price}>${total}</p>
              <button onClick={RemoveItem} className={stylish.remove}>X</button>
            </div>
          }

export default CartItem