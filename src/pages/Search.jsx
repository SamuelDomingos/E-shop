import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";
import { URL2, urlFor } from "../lib/Sanity";

import "./Search.css"

const Search = () => {

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("q"); // Obtém o valor do parâmetro 'q' da URL
    const { data: products, loading, error } = useFetch(URL2);
    
    const filteredProducts = products && products.result.filter(produto => produto.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="search">

        <h2>Produtos: <span>{searchTerm}</span></h2>

        <div className="flex">
            { filteredProducts && filteredProducts.length ? (
                filteredProducts.map((product, i) => (
                <div className="product" key={i}>
                    <Link to={`http://localhost:5173/product/${product._id}`} state={{ data: product }}>
                    <div className="product-img">
                        <img src={urlFor(product.image[0].asset._ref)} alt="" />
                    </div>
                    <h2>{product.name}</h2>
                    <p>R${product.price}</p>
                    </Link>
                </div>
                ))
            ) : (
                <div>
                    <h2>Produto não encontrado!</h2>
                </div>
            )}
        </div>

    </div>
  );
};

export default Search;