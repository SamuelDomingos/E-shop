import { Link } from 'react-router-dom';
import { urlFor } from "../lib/Sanity";

import "./Product.css";

const Product = ({product, i}) => {
  
  return (
    <div className="product">
      <Link to={`product/${i}`} state={{ data: product}}>

        <div className="product-img">
          <img src={urlFor(product.image[0].asset._ref)} alt="" />
        </div>

        <h2>{product.name}</h2>
        <p>R${product.price}</p>
      </Link>

    </div>
  )
}

export default Product