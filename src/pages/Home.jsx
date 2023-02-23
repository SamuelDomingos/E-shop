import Banner from "../components/Banner"
import Banner_2 from "../components/Banner_2";
import Product from "../components/Product"

import "./Home.css";

import { useFetch } from "../hook/useFetch";
import { URL2 } from "../lib/Sanity";

const Home = () => {

  const {data: products, loading, error} = useFetch(URL2);

  const randomProduct = products && products.result ? products.result[Math.floor(Math.random() * products.result.length)] : null;

  const randomProduct2 = products && products.result ? products.result[Math.floor(Math.random() * products.result.length)] : null;

  const randomIndex = products && products.result ? products.result.findIndex(product => product === randomProduct) : null;

  const randomIndex2 = products && products.result ? products.result.findIndex(product => product === randomProduct) : null;

  return (
    <div>
        <Banner product={randomProduct} i={randomIndex} />

      <div className="listproducts flex">

      {products && products.result &&
      products.result.map((product, i) => (
            <Product i={product._id} key={i} product={product}/>
      ))}

      </div>

        <Banner_2 product={randomProduct2} i={randomIndex2} />

    </div>
  )
}

export default Home