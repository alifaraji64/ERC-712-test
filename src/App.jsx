import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import MintPage from './pages/MintPage'
import Navbar from './components/Navbar'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<HomePage />}></Route>
      <Route index element={<MintPage />}></Route>
      <Route path='*' element={<Error />}></Route>
    </Route>
  )
)

function App() {

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
