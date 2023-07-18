import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: {
      userName: '',
      email: '',
      id: 0,
    },
    isAuth: false,
    isLoading: false,
    errors: '',
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
    loginFetch(state) {
      state.isLoading = true
    },
    loginFetchSuccess(state, action) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    loginFetchError(state, action) {
      state.isLoading = false
      state.errors = action.payload
    },
    regFetch(state) {
      state.isLoading = true
    },
    regFetchSuccess(state, action) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    regFetchError(state, action) {
      state.isLoading = false
      state.errors = action.payload
    },
    logoutFetch(state) {
      state.isLoading = true
    },
    logoutFetchSuccess(state) {
      state.isLoading = false
      state.isAuth = false
      state.user = {}
    },
    logoutFetchError(state, action) {
      state.isLoading = false
      state.errors = action.payload
    },
    checkAuth(state) {
      state.isLoading = true
    },
    checkAuthSuccess(state, action) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    checkAuthError(state, action) {
      state.isLoading = false
      state.errors = action.payload
    },
    sendContact(state) {
      state.isLoading = true
    },
    sendContactSuccess(state, action) {
      state.isLoading = false
    },
    sendContactError(state, action) {
      state.isLoading = false
      state.errors = action.payload
    },
    bookOffer(state) {
      state.isLoading = true
    },
    bookOfferSuccess(state, action) {
      state.isLoading = false
    },
    bookOfferError(state, action) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

export default userSlice
