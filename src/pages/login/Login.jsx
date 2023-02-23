import {HiOutlineMail} from "react-icons/hi"
import {RiLockPasswordLine} from "react-icons/ri"

import {signInWithEmailAndPassword} from "firebase/auth";

import { useAuth } from '../../context/AuthContext';

import { toast } from "react-hot-toast";

import { useNavigate, Link } from 'react-router-dom';

import "./Login.css"

const Login = () => {

  const navigate = useNavigate();
  const { setUser, auth } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    const { email, senha } = event.target.elements;

    try {
      await signInWithEmailAndPassword(auth, email.value, senha.value);

      setUser(auth.currentUser); // atualiza o usuário no contexto

      toast.success('Bem vindo!')

      navigate('/usuario');

    } catch (error) {

      console.log(error.code);

      if (error.code === "auth/invalid-email") {
          toast.error("O endereço de e-mail fornecido não é válido.");
        } else if(error.code === "auth/wrong-password"){
          toast.error("senha incorreta!");
        } else if (error.code === "auth/user-not-found"){
          toast.error("usuario não encontrado");
        } else if(error.code === "auth/too-many-requests"){
          toast.error("Muitas tentativas, tente depois!");
        }

    }
  };

  return (
    <div className="flex-column login">
        <h1>Entrar na conta</h1>
        <form className="flex-column" onSubmit={(event) => handleLogin(event)}>
            <label className="flex">
                <span><HiOutlineMail/></span>
                <input type="email" name="email" required placeholder="Email do usuario" />
            </label>
            <label className="flex">
                <span><RiLockPasswordLine/></span>
                <input type="password" name="senha" required placeholder="Digite sua senha" />
            </label>

            <div className="btn-form flex">
                <button className="btn-register">Entrar na conta</button>
                <p>Ainda não tem uma conta? <br/>
                    <Link to="/register">Clique aqui!</Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Login