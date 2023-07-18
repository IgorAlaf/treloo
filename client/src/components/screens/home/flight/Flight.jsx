import styles from './Flight.module.scss'
import flight2 from '../../../../assets/flight-2.png'
import search from '../../../../assets/search.svg'
import time from '../../../../assets/time.png'
import Select from 'react-select'
import { useState } from 'react'
import hotel from '../../../../assets/hotel.svg'
import cn from 'classnames'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useDispatch } from 'react-redux'
import { fetchBookHotel, fetchFlight } from '../../../../store/AsyncFunctions'
import { useForm } from 'react-hook-form'
const today = dayjs()
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
}
const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
)
const cities = [
  { value: 'Moscow', label: 'Moscow' },
  { value: 'Bangkok', label: 'Bangkok' },
  { value: 'London', label: 'London' },
  { value: 'Paris', label: 'Paris' },
  { value: 'Dubai', label: 'Dubai' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Kuala', label: 'Kuala' },
  { value: 'Osaka', label: 'Osaka' },
  { value: 'Seoul', label: 'Seoul' },
  { value: 'Amsterdam', label: 'Amsterdam' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Las Vegas', label: 'Las Vegas' },
  { value: 'Prague', label: 'Prague' },
  { value: 'Shanghai', label: 'Shanghai' },
  { value: 'Miami', label: 'Miami' },
]

const Flight = () => {
  const [filter, setFilter] = useState('flight')
  const [except, setExcept] = useState('Moscow')
  const [notice, setNotice] = useState(false)
  const [livingFrom, setLivingFrom] = useState('Moscow')
  const [goingTo, setGoingTo] = useState('Dubai')
  const [leave, setLeave] = useState(today)
  const [returnTo, setReturnTo] = useState(today)
  const [message, setMessage] = useState('')
  const [checkin, setCheckin] = useState(today)
  const [checkout, setCheckout] = useState(today)
  const [city, setCity] = useState('Moscow')
  const dispatch = useDispatch()
  const onSubmit = async e => {
    e.preventDefault()
    if (filter === 'flight') {
      const response = await dispatch(
        fetchFlight(livingFrom, goingTo, leave, returnTo)
      )
      if (response) {
        setMessage(response)
      } else {
        setMessage('error')
      }
      setNotice(true)
    } else {
      const response = await dispatch(fetchBookHotel(checkin, checkout, city))
      if (response) {
        setMessage(response)
      } else {
        setMessage('error')
      }
      setNotice(true)
    }
  }
  const showNotification = () => {
    setTimeout(() => {
      setNotice(false)
      setMessage('')
    }, 10000)
    return message === 'error' ? (
      <div className={styles['notice-err']}>
        <h3 className={styles['notice-err__title-err']}>
          You are unauthorized
        </h3>
        <p className={styles['notice-err__text-err']}>
          You must be logged in to our service to submit a flight or book a
          hotel request
        </p>
        <button
          onClick={() => setNotice(false)}
          className={styles['notice-err__close-err']}
        >
          X
        </button>
      </div>
    ) : (
      <div className={styles.notice}>
        <h3 className={styles.notice__title}>
          You've created a query to book service
        </h3>
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.flight}>
        <div className={styles.pick}>
          <div
            onClick={() => setFilter('flight')}
            className={cn(styles['pick-select'], {
              [styles['pick-select-active']]: filter === 'flight',
            })}
          >
            <a href='#!'>Flight</a>
          </div>
          <div
            onClick={() => setFilter('hotel')}
            className={cn(styles['pick-select'], {
              [styles['pick-select-active']]: filter !== 'flight',
            })}
          >
            <a href='#!'>Hotel</a>
          </div>
        </div>

        <div className={styles.cruise}>
          <div className={styles.settings}>
            <div className={styles.department}>
              {filter === 'flight' ? (
                <div>
                  <h4>Living From</h4>
                  <h3>
                    <Select
                      formatGroupLabel={formatGroupLabel}
                      options={cities.filter(item => {
                        return item.value !== except
                      })}
                      defaultValue={cities[0]}
                      onChange={e => {
                        setExcept(e.value)
                        console.log(e.value)
                      }}
                    />
                  </h3>
                </div>
              ) : (
                <div>
                  <h4>Check in</h4>
                  <h3>
                    <DatePicker
                      defaultValue={today}
                      disablePast
                      views={['year', 'month', 'day']}
                      onChange={e => setCheckin(e.value)}
                    />
                  </h3>
                </div>
              )}
              {filter === 'flight' ? (
                <img src={flight2} alt='plane' />
              ) : (
                <img src={hotel} alt='hotel' />
              )}
              {filter === 'flight' ? (
                <div>
                  <h4>Going to</h4>
                  <h3>
                    <Select
                      formatGroupLabel={formatGroupLabel}
                      defaultValue={cities[4]}
                      options={cities.filter(item => {
                        return item.value !== except
                      })}
                      onChange={e => {
                        setExcept(e.value)
                        setGoingTo(e.value)
                      }}
                    />
                  </h3>
                </div>
              ) : (
                <div>
                  <h4>Check out</h4>
                  <h3>
                    <DatePicker
                      defaultValue={today}
                      disablePast
                      views={['year', 'month', 'day']}
                      onChange={e => setCheckout(e.value)}
                    />
                  </h3>
                </div>
              )}
            </div>
            {filter === 'flight' ? (
              <div className={styles['time-to-department']}>
                <div>
                  <h4>Leave</h4>
                  <h3>
                    <DatePicker
                      defaultValue={today}
                      disablePast
                      views={['year', 'month', 'day']}
                      onChange={e => {
                        setLeave(e.value)
                      }}
                    />
                  </h3>
                </div>
                <img src={time} alt='time' />
                <div>
                  <h4>Return</h4>
                  <h3>
                    <DatePicker
                      defaultValue={today}
                      disablePast
                      onChange={e => setReturnTo(e.value)}
                      views={['year', 'month', 'day']}
                    />
                  </h3>
                </div>
              </div>
            ) : (
              <div className={styles['time-to-department']}>
                <div>
                  <h5>City</h5>
                  <h3>
                    <Select
                      formatGroupLabel={formatGroupLabel}
                      options={cities}
                      defaultValue={cities[0]}
                      onChange={e => setCity(e.value)}
                    />
                  </h3>
                </div>
              </div>
            )}
          </div>
          <button onClick={onSubmit} className={styles.search}>
            <img src={search} alt='search' />
          </button>
        </div>
        <div onClick={onSubmit} className={styles.wrap}>
          <button className={styles['search-btn']}>search</button>
        </div>
        {notice && message && showNotification()}
      </div>
    </LocalizationProvider>
  )
}

export default Flight
