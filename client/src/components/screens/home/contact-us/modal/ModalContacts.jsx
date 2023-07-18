import React from 'react'
import style from './ModalContact.module.scss'
import { fetchContact } from '../../../../../store/AsyncFunctions'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
const ModalContacts = ({ setShowModal, setNotice, setMessage }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const onSubmit = async data => {
    const response = await dispatch(
      fetchContact(
        data.firstName,
        data.lastName,
        data.phone,
        data.date,
        data.time,
        data.message
      )
    )
    if (response) {
      setMessage(response)
    }
    setShowModal(false)
    setNotice(true)
  }
  return (
    <div className={style.wrapper}>
      <div className={style.overlay}>
        <div className={style.modal}>
          <div className={style.asdf}>
            <h1 className={style.title}>Contact Us</h1>
            <p className={style.subtitle}>
              Our friendly team would love to hear from you!
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
              <div>
                <label>
                  <h5 className={style['input-title']}>First name</h5>
                  <input
                    className={style.input}
                    type='text'
                    placeholder='First name'
                    {...register('firstName', {
                      required: 'firstName is required field',
                      minLength: {
                        value: 3,
                        message:
                          'firstName field should be constist at least 3 characters',
                      },
                    })}
                  />
                  {errors.firstName?.type === 'required' && (
                    <div className={style.error}>
                      {errors.firstName?.message}
                    </div>
                  )}
                  {errors.firstName?.type === 'minLength' && (
                    <div className={style.error}>
                      {errors.firstName?.message}
                    </div>
                  )}
                </label>
                <label>
                  <h5 className={style['input-title']}>Last name</h5>
                  <input
                    className={style.input}
                    type='text'
                    placeholder='Last name'
                    {...register('lastName', {
                      required: 'lastName is required field',
                      minLength: {
                        value: 3,
                        message:
                          'lastName field should be constist at least 3 characters',
                      },
                    })}
                  />
                  {errors.lastName?.type === 'required' && (
                    <div className={style.error}>
                      {errors.lastName?.message}
                    </div>
                  )}
                  {errors.lastName?.type === 'minLength' && (
                    <div className={style.error}>
                      {errors.lastName?.message}
                    </div>
                  )}
                </label>
              </div>
              <div className={style.unique}>
                <label className={style.label}>
                  <h5 className={style['input-title']}>Phone</h5>
                  <input
                    className={style.input}
                    type='tel'
                    placeholder='Phone'
                    {...register('phone', {
                      required: 'phone is required field',
                      pattern: {
                        value: /^\+[1-9]{1}[0-9]{3,14}$/,
                        message: 'please enter valid number',
                      },
                    })}
                  />
                  {errors.phone?.type === 'required' && (
                    <div className={style.error}>{errors.phone?.message}</div>
                  )}
                  {errors.phone?.type === 'pattern' && (
                    <div className={style.error}>{errors.phone?.message}</div>
                  )}
                </label>
              </div>
              <div>
                <label>
                  <h5 className={style['input-title']}>Date of call</h5>
                  <input
                    className={style.input}
                    type='date'
                    placeholder='Date of call'
                    min='2023-07-18'
                    max='2024-01-01'
                    {...register('date', {
                      required: 'date is required field',
                    })}
                  />
                  {errors.date?.type === 'required' && (
                    <div className={style.error}>{errors.date?.message}</div>
                  )}
                </label>
                <label>
                  <h5 className={style['input-title']}>Call time</h5>
                  <input
                    className={style.input}
                    type='tel'
                    placeholder='9:00 - 18:00'
                    {...register('time', {
                      required: 'call time is required field',
                    })}
                  />
                  {errors.time?.type === 'required' && (
                    <div className={style.error}>{errors.time?.message}</div>
                  )}
                </label>
              </div>
              <label>
                <h5 className={style['input-title']}>Message(optional)</h5>
                <textarea
                  {...register('message', {
                    required: false,
                  })}
                ></textarea>
              </label>
              <button
                type='submit'
                onClick={handleSubmit(onSubmit)}
                className={style.button}
              >
                submit an application
              </button>
            </form>
            <button onClick={() => setShowModal(false)} className={style.close}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalContacts
