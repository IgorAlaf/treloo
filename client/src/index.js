import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Review from './components/screens/Review'
import Tips from './components/screens/Tips'
import Alerts from './components/screens/Alerts'
import Blog from './components/screens/Blog'
import Profile from './components/screens/profile/Profile'
import Register from './components/screens/auth/signup/Register'
import Login from './components/screens/auth/signin/Login'
import { Provider } from 'react-redux'
import store from './store/store'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/review',
    element: <Review />,
  },
  {
    path: '/tips',
    element: <Tips />,
  },
  {
    path: '/alerts',
    element: <Alerts />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/auth/signup',
    element: <Register />,
  },
  {
    path: '/auth/signin',
    element: <Login />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
