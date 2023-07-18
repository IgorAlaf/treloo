import React, { useState } from 'react'
import styles from './Contact.module.scss'
import image from '../../../../assets/contact-us.png'
import ModalContacts from './modal/ModalContacts'
const Contact = () => {
  const [showModal, setShowModal] = useState(false)
  const [notice, setNotice] = useState(false)
  const [message, setMessage] = useState('')
  const showNotification = () => {
    setTimeout(() => setNotice(false), 12000)
    return (
      <div className={styles.notice}>
        <h3 className={styles.notice__title}>You've created a query</h3>
        <p className={styles.notice__text}>{message}</p>
        <button
          onClick={() => setNotice(false)}
          className={styles.notice__close}
        >
          X
        </button>
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles['image-wrapper']}>
        <img src={image} alt='contact' />
        <span className={styles['item-first']}>
          <span className={styles.number}>300+</span>
          <span>DESTINATIONS</span>
        </span>
        <span className={styles['item-second']}>
          <span className={styles.number}>5000+</span>
          <span>TOURISTS</span>
        </span>
        <span className={styles['item-third']}>
          <span className={styles.number}>150+</span>
          <span>HOTELS</span>
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>Travel Any Corner of The World With Us</h3>
        <p className={styles.text}>
          Would you explore nature paradise in the world, let’s find the best
          destination in world with us, Would you explore nature paradise in the
          world, let’s find the best destination in world with us. Would you
          explore nature paradise in the world, let’s find the best destination
          in world with us. <br />
          <br />
          Would you explore nature paradise in the world, let’s find the best
          destination in world with us.
        </p>
        <button onClick={() => setShowModal(true)} className={styles.button}>
          {' '}
          Contact Us
        </button>
      </div>
      {showModal && (
        <ModalContacts
          setShowModal={setShowModal}
          setNotice={setNotice}
          setMessage={setMessage}
        />
      )}
      {message && notice && showNotification()}
    </div>
  )
}

export default Contact
