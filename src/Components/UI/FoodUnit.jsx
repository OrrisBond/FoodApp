import React, { useEffect, useRef, useState } from 'react'
import stylish from './FoodUnit.module.css'
 
function FoodUnit({ menuItem, onClick,  }) {
  const Number = useRef()
  useEffect(() => {
    Number.current.value=1
  },[])

  const submitHandler = (e) => {
    e.preventDefault()
     
    let menu = {
      id: menuItem.id,
      title: menuItem.title,
      img: menuItem.img,
      price: menuItem.price,
      qnty: Number.current.value
    }


    onClick(menu)
    Number.current.value = 1;
  }


  

  const increaseHandler = () => {
   let enteredValue = Number.current.value
    Number.current.value = +enteredValue +1
  }
  const decreaseHandler = () => {
    let enteredValue = Number.current.value
    Number.current.value = +enteredValue -1
  }

      return(<div className={stylish.cont} key={menuItem.id}>
        <img src={menuItem.img} alt="" />
        <div className={stylish.dits}>
          <h1>{menuItem.title}</h1>
          <p>{menuItem.desc}</p>
        <p className={stylish.price}>${menuItem.price}</p>
        </div>
        <div className={stylish.Add}>
        <form onSubmit={submitHandler}>
          <div className={stylish.math}>
            <button type='button'  onClick={decreaseHandler}>-</button>
            <input  type='number' id={menuItem.id}   ref={Number} min='1'/>
            <button type='button' onClick={increaseHandler}>+</button>
          </div>
          <button  type='submit' id={menuItem.id} className={stylish.carted} >Add to cart</button>
            </form>
            
        </div>
      </div>)
  }

export default FoodUnit