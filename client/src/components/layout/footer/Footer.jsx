import React from 'react'
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.copy}>© 2022 Treloo LLC - All right reserved.</p>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} to={'/review'}>
              Review
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to={'/tips'}>
              Tips
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to={'/alerts'}>
              Alerts
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to={'/blog'}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Footer
