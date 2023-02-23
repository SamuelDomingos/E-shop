import { useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

import { urlFor } from "../lib/Sanity";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";

import { useStateContext } from "../context/StateContext";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";

import "./SingleDetalhes.css";

const SingleDetalhes = () => {
  
  const {decQty, incQty, qty, onAdd} = useStateContext();

  const location = useLocation();

  const data = location.state?.data;


  return (
    <div className="singleDefault flex">


      <div className="img-carousel">
      <Swiper
        style={{
          "--swiper-navigation-color": "#d8768d",
          "--swiper-pagination-color": "#d8768d",
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper">
        {data.image.map((images, i) => (
          <SwiperSlide key={i}>
            <img src={urlFor(images.asset._ref)}/>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      {/* */}

        <div className="text-single">
          <h2>{data.name}</h2>
          <p className="price">R$ {data.price}</p>
          <p className="description">{data.description}</p>

            <div className="purchase flex">

              <span>Quantidade: </span>
              
              <div className="input-container flex">
                <button onClick={decQty} className="decrease-btn flex">-</button>

                <span className="qty flex">{qty}</span>

                <button onClick={incQty} className="increase-btn flex">+</button>
              </div>

                <button onClick={() => onAdd(data, qty)}className="cart">Carrinho</button>
                <button className="pursh">Comprar</button>

            </div>
        </div>
    </div>
  )
}

export default SingleDetalhes