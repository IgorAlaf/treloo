import styles from './Offer.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import lona from './images/lona.png'
import beach from './images/beach.png'
import river from './images/river.png'
import Select from 'react-select'
import Modal from './modal/Modal'

const data = [
  {
    filter: 'Team',
    image: 'lona',
    data: '14 FEB 2022',
    type: 'Relax',
    time: '3 Days, 3 Nights',
    title: 'Loga Sea',
    price: '700',
  },
  {
    filter: 'Team',
    image: 'beach',
    data: '18 JUN 2022',
    type: 'Adventure',
    time: '4 Days, 3 Nights',
    title: 'Ansgar Scheffold',
    price: '400',
  },
  {
    filter: 'Team',
    image: 'river',
    data: '22 DEC 2022',
    type: 'Relax',
    time: '7 Days, 6 Nights',
    title: ' Lona X',
    price: '340',
  },
  {
    filter: 'Couple',
    image: 'lona',
    data: '14 FEB 2022',
    type: 'Adventure',
    time: '3 Days, 3 Nights',
    title: 'Climbing',
    price: '210',
  },
  {
    filter: 'Couple',
    image: 'river',
    data: '22 DEC 2022',
    type: 'Relax',
    time: '7 Days, 6 Nights',
    title: 'Ocean travel',
    price: '970',
  },
  {
    filter: 'Couple',
    image: 'beach',
    data: '18 JUN 2022',
    type: 'Adventure',
    time: '4 Days, 3 Nights',
    title: 'Night mare',
    price: '634',
  },
  {
    filter: 'Family',
    image: 'beach',
    data: '18 JUN 2022',
    type: 'Relax',
    time: '4 Days, 3 Nights',
    title: 'Cruise',
    price: '590',
  },
  {
    filter: 'Family',
    image: 'lona',
    data: '14 FEB 2022',
    type: 'Relax',
    time: '3 Days, 3 Nights',
    title: 'Black Sea',
    price: '1000',
  },
  {
    filter: 'Family',
    image: 'river',
    data: '22 DEC 2022',
    type: 'Relax',
    time: '7 Days, 6 Nights',
    title: 'Baikal',
    price: '150',
  },
]

const Offer = () => {
  const [filter, setFilter] = useState('Team')
  const [showModal, setShowModal] = useState(false)
  const [dataBook, setDataBook] = useState(data[0])
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
    <div className={styles.offer}>
      <h1 className={styles['offer-title']}>Special Upcoming Offers</h1>
      <div className={styles.pagination}>
        <ul>
          <li
            onClick={e => {
              e.preventDefault()
              setFilter('Team')
            }}
            className={cn(styles.item, {
              [styles['item-active']]: filter === 'Team',
            })}
          >
            <a href='!#'>Team</a>
          </li>
          <li
            onClick={e => {
              e.preventDefault()
              setFilter('Couple')
            }}
            className={cn(styles.item, {
              [styles['item-active']]: filter === 'Couple',
            })}
          >
            <a href='!#'>Couple</a>
          </li>
          <li
            onClick={e => {
              e.preventDefault()
              setFilter('Family')
            }}
            className={cn(styles.item, {
              [styles['item-active']]: filter === 'Family',
            })}
          >
            <a href='!#'>Family</a>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <ul className={styles['content-list']}>
          {data.map((item, key) => {
            if (item.filter === filter) {
              return (
                <li key={key} className={styles['content-item']}>
                  <div className={styles.top}>
                    <div>
                      <img
                        src={
                          item.image === 'beach'
                            ? beach
                            : item.image === 'river'
                            ? river
                            : lona
                        }
                        alt='review'
                        className={styles['top-img']}
                      />
                    </div>
                    <span className={styles['top-data']}>{item.data}</span>
                  </div>
                  <div className={styles.about}>
                    {item.type === 'Relax' ? (
                      <span className={styles.relax}>Relax</span>
                    ) : (
                      <span className={styles.adventure}>Adventure</span>
                    )}
                    <span className={styles.time}>{item.time}</span>
                  </div>
                  <div className={styles.bottom}>
                    <h4>{item.title}</h4>
                    <div>
                      <h5 className={styles.price}>
                        <span>{item.price}$</span>/Person
                      </h5>
                      <button
                        onClick={() => {
                          setDataBook(item)
                          setShowModal(true)
                        }}
                        className={styles.book}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </li>
              )
            }
            return ''
          })}
        </ul>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          item={dataBook}
          setNotice={setNotice}
          setMessage={setMessage}
        />
      )}
      {notice && showNotification()}
    </div>
  )
}

export default Offer
