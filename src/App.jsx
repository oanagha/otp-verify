
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { app } from './firebase.config'
function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/Home" element={<Home/>}></Route>

    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App