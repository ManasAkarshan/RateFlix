import './App.css'
import {Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './pages/auth/Index'
import Home from './pages/home/Index'
import Movie from './pages/movie/Index'
import TvShow from './pages/tvshow/Index'
import Rated from './pages/rated/Index'


function App() {

 

  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/auth' element={<Auth></Auth>}></Route>
          <Route path='/rated' element={<Rated/>}></Route>
          <Route path='/movie/:id' element={<Movie></Movie>}></Route>
          <Route path='/tvshow/:id' element={<TvShow></TvShow>}></Route>

        </Routes>
      </Router>
    </div>
  )
}

export default App
