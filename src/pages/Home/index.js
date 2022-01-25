import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Tabela from "../../components/table";
import Navbar from "../../components/navbar";
import Cart from "../Cart";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [fruits, setFruits] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resp } = await axios.get(
          `https://cors-anywhere.herokuapp.com/http://www.fruityvice.com/api/fruit/all`,
          { headers: { "Access-Control-Allow-Origin": "*" } }
        );

        for (let i = 0; i < resp.length; i++) {
          resp[i].amount = 1;
        }
        setFruits(resp);
      } catch {
        console.log("Algo deu errado.");
      }
    };

    fetchData();
  }, []);

  const addItemCart = (product) => {
    const ProductExist = cart.find((item) => item.id === product.id);
    if (ProductExist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...ProductExist, amount: ProductExist.amount + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
    }
    toast.success("Item adicionado com sucesso!");
  };

  const removeItemCart = (product) => {
    const ProductExist = cart.find((item) => item.id === product.id);
    if (ProductExist.amount === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...ProductExist, amount: ProductExist.amount - 1 }
            : item
        )
      );
    }
    toast.success("Item removido com sucesso!");
  };

  const removeItemCartUnit = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
    toast.success("Item removido com sucesso!");
  };

  const finalizePurchase = () => {
    setCart([]);
    toast.success("Obrigado por comprar com a gente! Volte sempte.");
  };

  localStorage.setItem("COMPRAS", JSON.stringify(cart));
  if (!fruits) return null;

  return (
    <>
      <footer>TODOS OS DIREITOS RESERVADOS</footer>

      <Router>
        <ToastContainer />
        <Navbar />
        <Switch>
          <Route exact path="/cart/">
            <Cart
              addItemCart={addItemCart}
              removeItemCart={removeItemCart}
              removeItemCartUnit={removeItemCartUnit}
              finalizePurchase={finalizePurchase}
            />
          </Route>
          <Route exact path="/">
            <Tabela fruits={fruits} addItemCart={addItemCart} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Home;
