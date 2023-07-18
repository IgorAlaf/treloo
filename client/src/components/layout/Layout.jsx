import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import styles from './Layout.module.scss'
const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
