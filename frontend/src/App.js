import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './App.css'
import HomeScreen from './pages/HomeScreen'
import MintScreen, { nftLoader } from './pages/MintScreen'
import MintedScreen from './pages/MintedScreen'
import Navbar from './components/Navbar'
import { ContractProvider } from './context/contract'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<HomeScreen />} />
      <Route path='mint' element={<MintScreen />} loader={nftLoader}/>
      <Route path='minted/:address' element={<MintedScreen />} />
    </Route>
  )
)

function App () {
  return (
    <div className='App'>
      <ContractProvider>
        <Navbar />
        <br />
        <br />
        <br />
        <RouterProvider router={router} />
      </ContractProvider>
    </div>
  )
}

export default App
