import React, { useState } from 'react'
import style from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchRegistration } from '../../../../store/AsyncFunctions'
const Register = () => {
  const [notice, setNotice] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async data => {
    const response = await dispatch(
      fetchRegistration(data.username, data.email, data.password)
    )
    if (response) {
      setError(response)
      setNotice(true)
    } else {
      navigate('/')
    }
  }
  const showNotification = () => {
    setTimeout(() => setNotice(false), 7000)
    return (
      <div className={style.notice}>
        <h3 className={style.notice__title}>Bad request</h3>
        <p className={style.notice__text}>{error}</p>
        <button
          onClick={() => setNotice(false)}
          className={style.notice__close}
        >
          X
        </button>
      </div>
    )
  }
  return (
    <div className={style.wrapper}>
      <div className={style['body-wrapper']}>
        <div className={style.top}>
          <h1 className={style.title}>Sign up to Treelo</h1>
          <h3 className={style.subtitle}>
            Already a member?{' '}
            <Link className={style['subtitle-link']} to={'/auth/signin'}>
              Log in
            </Link>
          </h3>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h5 className={style['input-title']}>Username</h5>
              <input
                className={style.input}
                {...register('username', {
                  required: 'username is required field',
                  minLength: {
                    value: 3,
                    message:
                      'username field should be constist at least 3 characters',
                  },
                })}
                type='text'
                placeholder='Loowodi'
              />
              {errors.username?.type === 'required' && (
                <div className={style.error}>{errors.username?.message}</div>
              )}
              {errors.username?.type === 'minLength' && (
                <div className={style.error}>{errors.username?.message}</div>
              )}
            </label>
            <label>
              <h5 className={style['input-title']}>E-mail</h5>
              <input
                className={style.input}
                type='email'
                {...register('email', {
                  required: 'email is required field',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'please inter valid email',
                  },
                })}
                placeholder='name@gmail.com'
              />
              {errors.email?.type === 'required' && (
                <div className={style.error}>{errors.email?.message}</div>
              )}
              {errors.email?.type === 'pattern' && (
                <div className={style.error}>{errors.email?.message}</div>
              )}
            </label>
            <label>
              <h5 className={style['input-title']}>Password</h5>
              <input
                className={style.input}
                {...register('password', {
                  required: 'password is required field',
                  minLength: {
                    value: 6,
                    message:
                      'Password should be consist of at least 6 characters',
                  },
                })}
                type='password'
                placeholder='6+ Characters - 234klasdfh2_1'
              />
              {errors.password?.type === 'required' && (
                <div className={style.error}>{errors.password?.message}</div>
              )}
              {errors.password?.type === 'minLength' && (
                <div className={style.error}>{errors.password?.message}</div>
              )}
            </label>

            <label className={style.check}>
              <input type='checkbox' />
              <span>
                I agree all statements in <span>Terms & Conditions</span>
              </span>
            </label>
            <button className={style.button} type='submit'>
              Create an account
            </button>
          </form>
        </div>
        {error && notice && showNotification()}
      </div>
    </div>
  )
}

export default Register
