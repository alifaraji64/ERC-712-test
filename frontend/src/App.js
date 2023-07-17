import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './App.css'
import HomeScreen from './pages/HomeScreen'
import MintScreen from './pages/MintScreen'
import MintedScreen from './pages/MintedScreen'
import Navbar from './components/Navbar'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<HomeScreen />} />
      <Route path='mint' element={<MintScreen />} />
      <Route path='minted/:address' element={<MintedScreen />} />
    </Route>
  )
)

function App () {
  return (
    <div className='App'>
      <Navbar/>
      <br/>
      <br/>
      <br/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
