
import {HiOutlineMail} from "react-icons/hi"
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri"
import {BiUser} from "react-icons/bi"

//firebase
import { db } from '../../firebase/Config';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

//React-Router
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import { toast } from "react-hot-toast";

import "./Register.css"

const Register = () => {

    const navigate = useNavigate();

    const { setUser, auth } = useAuth();

    const handleRegister = async (event, navigate) => {
        event.preventDefault();
        
        const { nome, email, senha, confirmsenha} = event.target.elements;

        if (senha.value !== confirmsenha.value) {
            toast.error("senhas não estão iguais!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, senha.value);
            const uid = userCredential.user.uid; // obtém o ID do usuário criado

            await setDoc(doc(db, "usuarios", uid), {
                nome: nome.value,
                email: email.value
            });
            
            setUser(userCredential.user);
            toast.success('Sua conta foi criado com sucesso!')

            navigate("/usuario");
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                toast.error("O endereço de e-mail fornecido não é válido.");
              } else if (error.code === "auth/email-already-in-use") {
                toast.error("Este endereço de e-mail já está sendo usado.");
              } else if (error.code === "auth/weak-password"){
                toast.error("Senha com menos de 6 caracteres");
              } else {
                toast.error("Ocorreu um erro ao registrar o usuário.");
              }
        }

      };

  return (
    <div className="flex-column register">
        <h1>Crie sua conta agora</h1>
        <form className="flex-column" onSubmit={(event) => handleRegister(event, navigate)}>
            <label className="flex">
                <span><BiUser/></span>
                <input type="text" name="nome" required placeholder="Nome de usuario" />
            </label>
            <label className="flex">
                <span><HiOutlineMail/></span>
                <input type="email" name="email" required placeholder="Email do usuario" />
            </label>
            <label className="flex">
                <span><RiLockPasswordLine/></span>
                <input type="password" name="senha" required placeholder="Digite sua senha" />
            </label>
            <label className="flex">
                <span><RiLockPasswordFill/></span>
                <input type="password" name="confirmsenha" required placeholder="Confirmar senha" />
            </label>

            <div className="btn-form flex">
                <button className="btn-register">Registrar usuario</button>
                <p>Ja tem uma conta? <br/>
                    <Link to="/login">Clique aqui!</Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Register