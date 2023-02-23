import { useStateContext } from "../context/StateContext";
import { useAuth } from '../context/AuthContext';

import GetStripe from "../lib/GetStripe";
import { urlFor } from "../lib/Sanity";
import {useNavigate} from "react-router-dom"

//firebase
import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import { toast } from "react-hot-toast";

import "./Cart.css"

const Cart = () => {

  const {cartItems, decQty, incQty, removeItem, totalPrice} = useStateContext();
  const {user} = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = async () => {
    if (user === null) {
      navigate("/register");
      toast('Preciso ter uma conta para realizar compra');
    } else {
      const stripe = await GetStripe();
      
      const requestBody = {
        email: user.email,
        cartItems: cartItems,
      };

      const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
  
      if(response.statusCode === 200) return;
  
      const data = await response.json();
  
      toast.loading("Carregando...");
  
      stripe.redirectToCheckout({ sessionId: data.id });

      const addPurchase = async () => {
        const userRef = doc(db, 'usuarios', user.uid);
        const userDoc = await getDoc(userRef);
      
        if (userDoc.exists()) {
          try {
            // Add the purchase to the user's "compras" collection
            const comprasCollectionRef = collection(userRef, 'compras');
            await addDoc(comprasCollectionRef, { items: cartItems });
          } catch (error) {
            console.error("Error adding purchase to Firestore", error);
          }
        }
      };

      addPurchase();

    }

  };  
  

  return (
    <div className='cart-layout'>
    {
      cartItems.length < 1 ? (
        <div className="flex">
            <h2>Carrinho vazio!</h2>
        </div>
      ) : (
        <div className="flex-column">
          {cartItems.map((item, index) => (
            <div className='item-cart flex' key={item._id}>
              <div className='item-img-cart'>
                <img src={urlFor(item.image[0].asset._ref)} alt="" />
              </div>

              <div className='item-container flex-column'>
                <h2>{item.name}</h2>
                <p>R$ {item.price}</p>

                <div className="container-qty flex">
                  <button onClick={() => decQty(index)} className="decrease-btn flex">-</button>
                  <span className="qty flex">{item.quantity}</span>
                  <button onClick={() => incQty(index)} className="increase-btn flex">+</button>
                </div>

                <button onClick={() => removeItem(index)} className='delet'>Excluir</button>
              </div>
            </div>
          ))}
          

          <div className="container-prices">
            <ul className='flex'>
                <li className='flex'>
                  <span>SubTotal:</span> R${totalPrice}</li>
                <li className='flex'>
                  <span>Frete:</span> R$50
                  </li>
                <li className='flex'>
                  <span>Total:</span>R${totalPrice + 50}</li>
            </ul>
          </div>

          <button className='checkout' onClick={handleCheckout}>Comprar</button>
        </div>
      )
    }
    </div>
  )
}

export default Cart