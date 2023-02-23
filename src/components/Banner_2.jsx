import style from "./Banner_2.module.css"
import { Link } from "react-router-dom"
import { urlFor } from "../lib/Sanity"

const Banner_2 = ({product, i}) => {
  return (
    <>{
        product && (
            <div className={style.banner}>

                <div className={style.banner_text}>
                    <h2>{product.name}</h2>
                    <p>Ultimos produtos lançados</p>

                    <Link to={`product/${product._id}`} state={{ data: product}}>
                        Veja Mais
                    </Link>
                </div>

                <div className={style.img}>
                    <img src={urlFor(product.image[0].asset._ref)} alt="" />
                </div>

            </div>
            )

        }
    </>
  )
}

export default Banner_2