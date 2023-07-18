import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'
import useResize from '../../../hooks/useResize'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogout } from '../../../store/AsyncFunctions'
const Header = () => {
  const { isAuth } = useSelector(store => store.userReducer)
  const [active, setActive] = useState(false)
  const size = useResize()
  const dispatch = useDispatch()
  const handleExit = e => {
    e.preventDefault()
    const response = dispatch(fetchLogout())
  }
  useEffect(() => {
    if (size.width > 916) {
      document.body.style.overflow = 'auto'
      setActive(false)
    }
  }, [size])
  if (active) {
    document.body.style.overflow = 'hidden'
  }
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [active])
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <Link to={'/'} className={styles['title-link']}>
          Treloo
        </Link>
      </h1>
      <div
        onClick={e => {
          setActive(prev => !prev)
        }}
        className={styles['menu-btn']}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={cn(styles.menu, { [styles.active]: active })}>
        <nav className={styles.burger}>
          <ul>
            <li>
              <Link to={'/review'}>Review</Link>
            </li>
            <li>
              <Link to={'/tips'}>Tips</Link>
            </li>
            <li>
              <Link to={'/alerts'}>Alerts</Link>
            </li>
            <li>
              <Link to={isAuth ? '/profile' : '/auth/signup'}>
                {isAuth ? 'Blog' : 'Sign up'}
              </Link>
            </li>
            {isAuth && (
              <li>
                <button className={styles['logout-nav']} onClick={handleExit}>
                  Log out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to={'/review'} className={styles.link}>
              Review
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={'/tips'} className={styles.link}>
              Tips
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={'/alerts'} className={styles.link}>
              Alerts
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={'/blog'} className={styles.link}>
              Blog
            </Link>
          </li>
          <Link
            to={isAuth ? '/profile' : '/auth/signup'}
            className={styles.item}
          >
            <span className={styles.link}>{isAuth ? 'Blog' : 'Sign up'}</span>
          </Link>
          {isAuth && (
            <li>
              <button className={styles.logout} onClick={handleExit}>
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Header
