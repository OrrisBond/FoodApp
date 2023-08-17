import react from 'react'
import stylish from './Foodsec.module.css'
import FoodUnit from './FoodUnit'
import { useState } from 'react';
import { useEffect } from 'react';

function Foodsec({ toCart, change }) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [meals, setMeals] = useState([])
  
  const menu = [
    {
      id: 1,
      title: 'Burger',
      quantity:1,
      price: 15.99,
      img: 'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg',
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
      btnID:1
    },
    {
      id: 2,
      title: 'Burrito',
      quantity:1,
      price: 13.99,
      img: 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1572_2_1437661500.jpg?tr=w-800,h-800',
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
      btnID:2
    },
    {
      id: 3,
      title: 'Pizza',
      quantity:1,
      price: 7.99,
      img: 'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
      btnID:3
    },
    {
      id: 4,
      title: 'Pancake',
      quantity:1,
      price: 20.99,
      img: 'https://hips.hearstapps.com/hmg-prod/images/best-homemade-pancakes-index-640775a2dbad8.jpg?crop=0.6667877686951256xw:1xh;center,top&resize=1200:*',
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
      btnID:4
    },
  ];  

  
  const fetchMeals = async () => {
  try {
   
      const response =await fetch('https://react-backend-ba202-default-rtdb.firebaseio.com/food.json')
      let data = [] 
        data = await response.json()
        data.shift()
        
        setMeals(data)
        
     
  } catch (error) {
    console.log('failed to fetch')
    setError(true)
    return
    }
    setLoading(false)}

  
    fetchMeals()
  
  if (loading) {
    return <p>Food is being prepared</p>
  }

  if (error) {
    return <p>Something went wrong.</p>
  }
  
  let pushing = (item) => {
    toCart(item)
  }
  return (
    <div className={stylish.cont}>
      {meals.map((menuItem) => {
        return <FoodUnit menuItem={menuItem} key={menuItem.id} onClick={pushing }  change={change}/>
      })}
      
    </div>
  )
}

export default react.memo(Foodsec)