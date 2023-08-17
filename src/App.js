import { useState } from "react";
import Foodsec from "./Components/UI/Foodsec";
import Navbar from "./Components/UI/Navbar";

function App() {
  const [carted, setCarted] = useState([]);
  const [cartedUp, setCartedUp] = useState(false);

  const toCart = (get) => {
    const prevItem = carted.find((item) => item.id == get.id)
      ? carted.find((item) => item.id == get.id)
      : { id: 0 };
    const prevItemIdex = carted.findIndex((item) => item.id == get.id);

    if (carted.length > 0) {
      if (get.id == prevItem.id) {
        const currentItem = carted[prevItemIdex];
        currentItem.qnty = +currentItem.qnty + +get.qnty;

        const allItems = carted;
        allItems[prevItemIdex] = currentItem;

        setCarted((prevState) => {
          return allItems;
        });
        setCartedUp((prev) => !prev);
        return;
      }
    }
    // console.log(prevItemIdex, prevItem);

    setCarted((prevState) => {
      return [...prevState, get];
    });
  };

  const changeHandler = (type) => {
    const index = carted.findIndex((item) => item.id == type.id);
    if (type.type == "plus" && type.btnId == type.id) {
      const currentItem = carted[index];
      currentItem.qnty = +currentItem.qnty + 1;

      const allItems = carted;
      allItems[index] = currentItem;

      setCarted((prevState) => {
        return allItems;
      });
      setCartedUp((prev) => !prev);
      return;
    } else if (type.type == "minus" && type.btnId == type.id) {
      const index = carted.findIndex((item) => item.id == type.id);
      const currentItem = carted[index];
      currentItem.qnty = +currentItem.qnty - 1;

      const allItems = carted;
      allItems[index] = currentItem;

      setCarted((prevState) => {
        return allItems;
      });
      setCartedUp((prev) => !prev);
      return;
    }
  };

  const RemoveItem = (e) => {
    const rest = carted.filter((cartItems) => {
      return cartItems.id !== +e.target.parentElement.id;
    });
    setCarted(rest);
    setCartedUp((prev) => !prev);
  };

  const clearCart = () => {
    setCarted([]);
  };
  return (
    <>
      <div className="background"></div>
      <div className="slogan">
        "Order and recieve your delicious food. here on react food we bring the
        best foods to your area."
      </div>
      <div>
        <Navbar
          passToCart={carted}
          RemoveItem={RemoveItem}
          changeHandler={changeHandler}
          clearCart={clearCart}
        />
        <Foodsec toCart={toCart} change={changeHandler} />
      </div>
    </>
  );
}

export default App;
