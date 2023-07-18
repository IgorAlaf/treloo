import userService from '../services/user-service.js'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error.js'
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Error validation', errors.array()))
      }
      const { email, password, userName } = req.body
      const userData = await userService.registration(email, password, userName)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(201).json(userData)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Error validation', errors.array()))
      }
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(201).json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      if (!req.cookies.refreshToken) {
        throw ApiError.unauthorizedError()
      }
      const { refreshToken } = req.cookies

      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json({ success: true })
    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async editAccount(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Error validation', errors.array()))
      }
      const id = req.params.id
      const { userName, email, password, newPass } = req.body
      const userData = await userService.edit(
        userName,
        email,
        id,
        password,
        newPass
      )
      res.json(userData)
    } catch (e) {
      next(e)
    }
  }
  async contact(req, res, next) {
    try {
      const { firstName, lastName, phone, date, time, message } = req.body
      const response = await userService.contact(
        firstName,
        lastName,
        phone,
        date,
        time,
        message
      )
      res.json(response)
    } catch (e) {
      next(e)
    }
  }
  async offer(req, res, next) {
    try {
      const { firstName, lastName, tripName, date, phone } = req.body
      const response = await userService.offer(
        firstName,
        lastName,
        tripName,
        date,
        phone
      )
      res.json(response)
    } catch (e) {
      next(e)
    }
  }
  async fligth(req, res, next) {
    try {
      const { livingFrom, goingTo, leave, returnTo } = req.body
      const response = await userService.flight(
        livingFrom,
        goingTo,
        leave,
        returnTo
      )
      res.json(response)
    } catch (e) {
      next(e)
    }
  }
  async bookHotel(req, res, next) {
    const { checkin, checkout, city } = req.body
    const response = await userService.bookHotel(checkin, checkout, city)
    res.json(response)
  }
}

export default new UserController()
