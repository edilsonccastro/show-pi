import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Admin from './routes/Admin.tsx'
import Cart from './routes/Cart.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/admin",
    element: <Admin />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
