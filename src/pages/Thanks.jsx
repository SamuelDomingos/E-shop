import style from "./Thanks.module.css"
import {AiFillCheckCircle} from "react-icons/ai"
import { Link } from "react-router-dom";

import runFirewords from "../lib/Utils";
import { useEffect } from "react";

const Thanks = () => {

    useEffect(() => {
        runFirewords();
    })

  return (
    <div className={style.thanks_layout}>
      <div className={style.card_thanks}>
            <AiFillCheckCircle/>
            <h2>Muito obrigada por ter comprado com a E-shop :)</h2>
            <p>Se tiver qualquer duvida entre em contato <a href="#">fsdomingoss09@gmail.com</a></p>

            <Link to={"/"}>Continue comprando</Link>
      </div>
    </div>
  );
};

export default Thanks;
