import axios from 'axios'
import $api from '../http'
import { API_URL } from '../http'
export default class AuthService {
  static async login(email, password) {
    const response = await $api.post('/login', {
      email,
      password,
    })
    localStorage.setItem('user_id', response.data.user.id)
    return response
  }
  static async registration(userName, email, password) {
    const response = await $api.post('/registration', {
      userName,
      email,
      password,
    })
    localStorage.setItem('user_id', response.data.user.id)
    return response
  }
  static async logout() {
    return $api.post('/logout')
  }
}
