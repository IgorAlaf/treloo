import React, { useState } from 'react'
import styles from './Recommended.module.scss'
import cn from 'classnames'
import star from './images/Star.svg'
import bg1 from './images/bg-1.png'
import bg2 from './images/bg-2.png'
import bg3 from './images/bg-3.png'
import bg4 from './images/bg-4.png'
const data = [
  {
    filter: 'Popular',
    img: <img src={bg1} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '3.4',
  },
  {
    filter: 'Popular',
    img: <img src={bg2} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '4.5',
  },
  {
    filter: 'Popular',
    img: <img src={bg3} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '4.2',
  },
  {
    filter: 'Popular',
    img: <img src={bg4} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '3.5',
  },
  {
    filter: 'Adventure',
    img: <img src={bg4} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '3.5',
  },
  {
    filter: 'Adventure',
    img: <img src={bg1} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '3.4',
  },
  {
    filter: 'Adventure',
    img: <img src={bg3} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '4.2',
  },
  {
    filter: 'Adventure',
    img: <img src={bg2} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '4.5',
  },
  {
    filter: 'Beath',
    img: <img src={bg1} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '3.4',
  },

  {
    filter: 'Beath',
    img: <img src={bg4} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '3.5',
  },

  {
    filter: 'Beath',
    img: <img src={bg2} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '4.5',
  },

  {
    filter: 'Beath',
    img: <img src={bg3} alt='bg'></img>,
    title: 'Kina Mountain',
    place: 'Cambodia',
    mark: '4.2',
  },
]
const Recommended = () => {
  const [filter, setFilter] = useState('Popular')
  return (
    <div className={styles.recommended}>
      <h1 className={styles['recommended-title']}>Recommended Destination</h1>
      <div className={styles.pagination}>
        <ul>
          <li
            onClick={e => {
              e.preventDefault()
              setFilter('Popular')
            }}
            className={cn(styles.item, {
              [styles['item-active']]: filter === 'Popular',
            })}
          >
            <a href='!#'>Popular</a>
          </li>
          <li
            onClick={e => {
              e.preventDefault()
              setFilter('Adventure')
            }}
            className={cn(styles.item, {
              [styles['item-active']]: filter === 'Adventure',
            })}
          >
            <a href='!#'>Adventure</a>
          </li>
          <li
            onClick={e => {
              e.preventDefault()
              setFilter('Beath')
            }}
            className={cn(styles.item, {
              [styles['item-active']]: filter === 'Beath',
            })}
          >
            <a href='!#'>Beath</a>
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
                    <div>{item.img}</div>
                    <span className={styles['top-mark']}>
                      <img src={star} alt='star'></img>
                      {item.mark}
                    </span>
                  </div>
                  <div className={styles.about}>
                    <h4>{item.title}</h4>
                    <span className={styles.place}>{item.place}</span>
                  </div>
                </li>
              )
            }
            return ''
          })}
        </ul>
      </div>
    </div>
  )
}

export default Recommended
