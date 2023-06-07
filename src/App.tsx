import './App.css'
import { BrowserRouter , Routes , Route , Link } from 'react-router-dom'

import Home from './Components/home/Home'
import Movie from './Components/movie/Movie'

function App() {

  return (
    <div id="App" className='h100 lntxt'>
      <BrowserRouter>
        <Link className="lntxt flrow acen" id='Nav' to={"/"} ><img src="/QuadBCinemas.png" alt="logo" />QuadBCinemas</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
