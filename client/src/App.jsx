import './App.css'
import {Routes, Route} from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import axios from 'axios'
import {Toaster} from "react-hot-toast"

axios.defaults.baseURL = 'htttp://localhost:8000'; //route to the backend
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <Nav />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
