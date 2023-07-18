import { Router } from 'express'
import userContoller from '../controllers/user-contoller.js'
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/auth-middleware.js'

const router = new Router()
const {
  registration,
  login,
  logout,
  refresh,
  editAccount,
  contact,
  offer,
  fligth,
  bookHotel,
} = userContoller

router.post(
  '/registration',
  body('email')
    .isEmail()
    .isLength({ min: 6, max: 50 })
    .matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  body('userName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z0-9-]*$/),
  body('password').isLength({ min: 6, max: 50 }),
  registration
)
router.post(
  '/login',
  body('email')
    .isEmail()
    .isLength({ min: 6, max: 50 })
    .matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  body('password').isLength({ min: 6, max: 50 }),
  login
)
router.get('/logout', logout)
router.post('/refresh', refresh)
router.put(
  '/account/:id/edit',
  body('email')
    .isEmail()
    .isLength({ min: 6, max: 50 })
    .matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  body('userName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-z]*$/),
  body('password').isLength({ min: 6, max: 50 }),
  body('newPass').isLength({ min: 6, max: 50 }),
  authMiddleware,
  editAccount
)
router.post('/contact', contact)
router.post('/offer', offer)
router.post('/flight', authMiddleware, fligth)
router.post('/bookHotel', authMiddleware, bookHotel)

export default router
