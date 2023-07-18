import { Link } from 'react-router-dom'
import styles from './Discount.module.scss'
import { useSelector } from 'react-redux'
const Discount = () => {
  const { isAuth } = useSelector(store => store.userReducer)
  if (isAuth) {
    return ''
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Don’t Miss The 50% Discount if You register Today
        </h1>

        <Link to={'/auth/signup'}>
          <button className={styles.button}>Register Today</button>
        </Link>
      </div>
    </div>
  )
}

export default Discount
