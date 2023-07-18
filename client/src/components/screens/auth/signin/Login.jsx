import React, { useState } from 'react'
import style from '../signup/Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../../../store/AsyncFunctions'
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = async data => {
    const response = await dispatch(fetchLogin(data.email, data.password))
    if (response) {
      setNotice(true)
      setError(response)
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
          <h1 className={style.title}>Sign In</h1>
          <h3 className={style.subtitle}>
            Don't have an account yet?{' '}
            <Link className={style['subtitle-link']} to={'/auth/signup'}>
              Sign up
            </Link>
          </h3>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h5 className={style['input-title']}>E-mail</h5>
              <input
                className={style.input}
                type='email'
                placeholder='E-MAIL'
                {...register('email', {
                  required: 'email is required field',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'please inter valid email',
                  },
                })}
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
                type='password'
                placeholder='PASSWORD'
                {...register('password', {
                  required: 'password is required field',
                  minLength: {
                    value: 6,
                    message:
                      'Password should be consist of at least 6 characters',
                  },
                })}
              />
              {errors.password?.type === 'required' && (
                <div className={style.error}>{errors.password?.message}</div>
              )}
              {errors.password?.type === 'minLength' && (
                <div className={style.error}>{errors.password?.message}</div>
              )}
            </label>
            <button className={style.button} type='submit'>
              SIGN IN
            </button>
          </form>
          {error && notice && showNotification()}
          <p className={style.back}>
            back to main page{' '}
            <Link to={'/'} style={{ color: '#397EF6' }}>
              Treelo
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
