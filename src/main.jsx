import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout'
import PrivateRoute from './layouts/PrivateRoute'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import OrderHistory from './pages/OrderHistory'
import OrderDetails from './pages/OrderDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products/:productId',
        element: <ProductDetailsPage />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'login/register',
        element: <Register />
      },
      {
        path: 'order-history',
        element: (
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        )
      },
      {
        path: 'orderdetails/:orderId',
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
