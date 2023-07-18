import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './components/screens/home/Home'
import { fetchCheckAuth } from './store/AsyncFunctions'
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const { isAuth } = useSelector(store => store.userReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    async function check() {
      if (localStorage.getItem('token')) {
        await dispatch(fetchCheckAuth())
      }
    }
    check()
  }, [])
  return (
    <div className='app'>
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}

export default App
