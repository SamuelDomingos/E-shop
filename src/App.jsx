import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Cart from './pages/Cart'
import SingleDetalhes from './pages/SingleDetalhes'
import User from './pages/user/User'

import Header from "./components/Header"
import { useAuth } from './context/AuthContext';
import Footer from './components/Footer'
import Search from './pages/Search'
import Thanks from './pages/Thanks'

function App() {

  const {user} = useAuth();

  return (
    <div className='App'>
      <BrowserRouter>
          <div className='container'>
            <Header/>
            <Toaster/>

              <div>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/register' element={!user ? <Register /> : <Navigate to="/usuario"/>} />
                  <Route path='/login' element={!user ? <Login /> : <Navigate to="/usuario"/>} />
                  <Route path='/usuario' element={user ? <User /> : <Navigate to="/register"/>} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/product/:id' element={<SingleDetalhes />} />
                  <Route path='/search' element={<Search/>}/>
                  <Route path='/obrigada' element={<Thanks/>}/>
                </Routes>
              </div>
          </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
