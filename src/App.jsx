import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import axios from 'axios'
import Footer from './components/Footer'
import Quran from './pages/Quran'

axios.defaults.baseURL = 'https://mp3quran.net/api/v3';
function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quran' element={<Quran />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
