import React from 'react'
import style from './Profile.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Profile = () => {
  const { user } = useSelector(store => store.userReducer)
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <nav className={style.nav}>
          <Link className={style.treloo} to={'/'}>
            Treloo
          </Link>
          <ul className={style.list}>
            <li>
              <Link className={style.link} to={'/review'}>
                Review
              </Link>
            </li>
            <li>
              <Link className={style.link} to={'/alerts'}>
                Alerts
              </Link>
            </li>
            <li>
              <Link className={style.link} to={'/blog'}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={style.container}>
        <h1 className={style.title}>Profile</h1>
        <form className={style.form}>
          <label>
            <h5 className={style['input-title']}>User name</h5>
            <input
              className={style.input}
              type='text'
              value={user.userName}
              readOnly
            />
          </label>
          <label>
            <h5 className={style['input-title']}>E-mail</h5>
            <input
              className={style.input}
              type='email'
              value={user.email}
              readOnly
            />
          </label>
        </form>
      </div>
    </div>
  )
}

export default Profile
