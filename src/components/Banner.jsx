import {BsSearch} from "react-icons/bs"
import {AiFillGithub, AiFillLinkedin} from "react-icons/ai"

import "./Banner.css";
import { Link, useNavigate } from "react-router-dom";
import { urlFor } from "../lib/Sanity";
import { useState } from "react";

const Banner = ({product, i}) => {

  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/search?q=" + query);
  }

  return (
    <div className='banner flex'>

        <div className="camp-search">
            <h2>Pesquise seu produto aqui</h2>

                <form onSubmit={handleSubmit}>
                <label htmlFor="search" className="button-search flex">

                  <BsSearch/>

                  <input 
                  type="text" 
                  name="search"
                  onChange={(e) => setQuery(e.target.value)}
                  id="search" placeholder="pesquise seu produto favorito" />
                  </label>        
                </form>
        </div>


        <div className="card-banner flex-column">
          {
            product && (
              <Link to={`product/${product._id}`} state={{ data: product}}>
                <img src={urlFor(product.image[0].asset._ref)} alt="" />
                <p>{product.name}</p>
              </Link>
            )}
        </div>

        <div className="links_banner">
              <AiFillLinkedin/>
              <AiFillGithub/>
        </div>
    </div>
  )
}

export default Banner