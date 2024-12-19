
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Start from './components/Start'
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom'
import Home from './components/Home'

function App() {
  const router = createBrowserRouter(
    [{ path : "/",
      element: <Start/>

    },
    {
       path:"/createRoom",
       element: <CreateRoom/>
    },
    {
      path: "/joinRoom",
      element: <JoinRoom/>
    },
    {
      path:"/editor/:id",
      element: <Home/>
    }]
  )

  return (
    <>
     
     <RouterProvider router={router}/>
    </>
  )
}

export default App
