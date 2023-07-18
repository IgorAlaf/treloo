import $api, { API_URL } from './../http/index'
import axios from 'axios'
import AuthService from '../services/AuthService'
import userSlice from './userSlice'

export const fetchLogin = (email, password) => async dispatch => {
  try {
    dispatch(userSlice.actions.loginFetch())
    const response = await AuthService.login(email, password)
    localStorage.setItem('token', response.data.accessToken)
    dispatch(userSlice.actions.loginFetchSuccess(response.data.user))
    return ''
  } catch (err) {
    let message = 'Error!!!'
    if (err instanceof Error) {
      message = err.message
    }
    dispatch(userSlice.actions.loginFetchError(message))
    return 'Email or password is not valid'
  }
}

export const fetchRegistration =
  (userName, email, password) => async dispatch => {
    try {
      dispatch(userSlice.actions.regFetch)
      const response = await AuthService.registration(userName, email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(userSlice.actions.loginFetchSuccess(response.data.user))
      return ''
    } catch (err) {
      let message = 'Error!!!'
      if (err instanceof Error) {
        message = err.message
      }
      dispatch(userSlice.actions.loginFetchError(message))
      return 'Candidate is already exists with the this email'
    }
  }

export const fetchLogout = () => async dispath => {
  try {
    dispath(userSlice.actions.logoutFetch())
    await AuthService.logout()
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    dispath(userSlice.actions.logoutFetchSuccess())
  } catch (err) {
    let message = 'Error!!!'
    if (err instanceof Error) {
      message = err.message
    }
    dispath(userSlice.actions.loginFetchError(message))
  }
}

export const fetchCheckAuth = () => async dispatch => {
  try {
    dispatch(userSlice.actions.checkAuth())
    const response = await axios.post(
      `${API_URL}/refresh`,
      {},
      {
        withCredentials: true,
      }
    )
    localStorage.setItem('token', response.data.accessToken)
    dispatch(userSlice.actions.checkAuthSuccess(response.data.user))
  } catch (err) {
    let message = 'Error!!!'
    if (err instanceof Error) {
      message = err.message
    }
    dispatch(userSlice.actions.checkAuthError(message))
  }
}

export const fetchOffer =
  (firstName, lastName, tripName, date, phone) => async dispatch => {
    try {
      dispatch(userSlice.actions.bookOffer())
      const response = await axios.post(
        `${API_URL}/offer`,
        { firstName, lastName, tripName, date, phone },
        {
          withCredentials: true,
        }
      )
      dispatch(userSlice.actions.bookOfferSuccess(response.data.message))
      return response.data.message
    } catch (e) {
      dispatch(userSlice.actions.bookOfferError('Bad request'))
    }
  }
export const fetchContact =
  (firstName, lastName, phone, date, time, message) => async dispatch => {
    try {
      dispatch(userSlice.actions.sendContact())
      const response = await axios.post(
        `${API_URL}/contact`,
        { firstName, lastName, phone, date, time, message },
        { withCredentials: true }
      )
      dispatch(userSlice.actions.sendContactSuccess(response.data.message))
      return response.data.message
    } catch (e) {
      dispatch(userSlice.actions.sendContactError('Bad request'))
    }
  }
export const fetchFlight =
  (livingFrom, goingTo, leave, returnTo) => async dispatch => {
    try {
      const response = await $api.post('/flight', {
        livingFrom,
        goingTo,
        leave,
        returnTo,
      })
      return response.data.message
    } catch (e) {
      console.log(e)
    }
  }
export const fetchBookHotel = (checkin, checkout, city) => async dispatch => {
  try {
    const response = await $api.post('/bookHotel', {
      checkin,
      checkout,
      city,
    })
    return response.data.message
  } catch (e) {
    console.log(e)
  }
}
