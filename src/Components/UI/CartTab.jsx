import React, { useEffect, useState } from 'react'
import classes from './CartTab.module.css'
import ReactDOM from 'react-dom'
import CartItem from '../Fuctional/CartItem'
import { useRef } from 'react'
import Input from "./Input";
import useInput from "./hooks/use-input";
import Error from './Error'


      
function CartTab({ insideCart, handler, RemoveItem, changeHandler, show,clearCart }) {
    
    const nameRef=useRef()
    const emailRef=useRef()
    const addressRef = useRef()
    const [order, setOrder] = useState(false)
    const [error, setError] = useState()
    

    const {
        changeHandler: nameCH,
        blurHandler: nameBH,
        error: nameError,
      } = useInput(() => {
        return nameRef.current.value.trim().length === 0;
      });
    
      const {
        changeHandler: emailCH,
        blurHandler: emailBH,
        error: emailError,
      } = useInput(() => {
        return (
          emailRef.current.value.trim().length === 0 ||
          !emailRef.current.value.includes("@")
        );
      });
    
      const {
        changeHandler: addCH,
        blurHandler: addBH,
        error: addError,
      } = useInput(() => {
        return addressRef.current.value.length === 0;
      });
     
      const totalize = (insideCart.map(item => {
        let total = item.price * item.qnty
        return +total
    }).reduce((a, b) => a + b, 0)).toFixed(2)
      
    
    const sendOrder = async () => {
        const name = nameRef.current.value
        const address = addressRef.current.value
        const email = emailRef.current.value
            const response = await fetch('https://react-backend-ba202-default-rtdb.firebaseio.com/Order.json',{
                method:'POST',
                headers: {
                    contentType: 'application/json'
                },
                body: JSON.stringify({
                    id: Math.random(100) + 1, 
                    name,
                    address,
                    email,
                    total:totalize,
                    order:[...insideCart]
                })
            })
            const data = await response.json()
            console.log(data)
         }

    const submitHandler = (e) => {
        e.preventDefault()
        const name = nameRef.current.value
        const address = addressRef.current.value
        const email = emailRef.current.value
        
        
        if (emailRef.current.value.trim().length > 0 &&
            emailRef.current.value.includes("@") && addressRef.current.value.length > 0 && nameRef.current.value.trim().length > 0) {
            
                let orderForm = {
                    name,
                    address,
                    email
            }  
            sendOrder()
            setOrder(false)
            clearCart()
        
            console.log(orderForm) 


            
            nameRef.current.value = ''
            addressRef.current.value = ''
            emailRef.current.value = ''
            
           return
        }
        
        if (name.trim().length === 0 | address.trim().length === 0 | email.trim().length === 0) {
            setError({
                title: 'Empty input fields',
                body:'Please enter information into all the feilds'
            })
            return
        }
        
    }


    const callForm = () => { 
           if (insideCart.length >0) {
            setOrder(true)   
           }
    }

    const closeHandler = () => {
        setError(null)
    }
    
    

    return ReactDOM.createPortal(<>
        {error && (
        <Error title={error.title} body={error.body} handler={closeHandler} />
      )}
        <div className={classes.back} id='cartModal' >
            <div className={classes.cont}>
                <div className={classes.top}>
                    <h1>Your Cart</h1>
                    <h1>${totalize}</h1>
                <button onClick={handler}>X</button>
                </div>
                {insideCart.map((cartItems) => {
                    return <CartItem cartItems={cartItems} RemoveItem={RemoveItem} key={cartItems.id} changeHandler={changeHandler}  />
                })}
                {order && <form className={classes.inputCont} onSubmit={submitHandler}>
                <Input
          label="Username"
          inputProps={{
            type: "text",
            min: "5",
            max: "15",
            required: false,
          }}
          ref={nameRef}
          error={nameError}
          onchange={nameCH}
          errorText="Name field can not be empty !"
          onblur={nameBH}
        />

        <Input
          label="Email"
          inputProps={{
            type: "email",
            min: "5",
            max: "15",
            required: false,
          }}
          ref={emailRef}
          error={emailError}
          onchange={emailCH}
          errorText="Enter a valid email address whcih contains '@'!"
          onblur={emailBH}
        />

        <Input
          label="Address"
          inputProps={{
            type: "text",
            min: "5",
            max: "15",
            required: false,
          }}
          ref={addressRef}
          error={addError}
          onchange={addCH}
          errorText="Please enter an address!"
          onblur={addBH}
        />
                    <button >Place Order</button>
                </form>}
                
                {show || !order && <button onClick={callForm}>Call Form</button>}
                
            </div>
            
      </div>
    </>,
    
      document.getElementById('portal')
  )
}

export default CartTab