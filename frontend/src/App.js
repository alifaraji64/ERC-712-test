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
import { ContractContext, ContractProvider } from './context/contract'
import ProtectedRoute from './context/protectedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar/>}>
      <Route index element={<HomeScreen />} />
      <Route path='mint' element={<MintScreen />} loader={nftLoader}/>
      <Route path='minted' element={ <ProtectedRoute redirectTo={'/'}> <MintedScreen/> </ProtectedRoute> }/>
    </Route>
  )
)

function App () {
  return (
    <div className='App'>
      <ContractProvider>
        <br />
        <br />
        <br />
        <RouterProvider router={router} />
      </ContractProvider>
    </div>
  )
}

export default App
