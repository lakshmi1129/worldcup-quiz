
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Quizz from './components/Quizz'
import Home from './components/Home'

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path='/quiz' element={<Quizz />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
