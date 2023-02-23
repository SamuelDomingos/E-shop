import "./Footer.css";

const Footer = () => {
  return (
    <footer className="flex">
        <div>
            <div className="logo"><h2>E-shop</h2></div>
            <p>E-commecer &copy; 2023</p>
        </div>

        <div className="contato flex-column">
            <h2>Contato</h2>
            <a href="mailto:fsdomingoss09@gmail.com">Gmail: fsdomingoss09@gmail.com</a>
            <a href="https://github.com/SamuelDomingos">GitHub</a>
        </div>

    </footer>
  )
}

export default Footer