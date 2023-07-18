import style from './Modal.module.scss'
import { useForm } from 'react-hook-form'
import { fetchOffer } from '../../../../../store/AsyncFunctions'
import { useDispatch } from 'react-redux'
const Modal = ({ setShowModal, item, setNotice, setMessage }) => {
  const dispatch = useDispatch()
  const onSubmit = async data => {
    const response = await dispatch(
      fetchOffer(
        data.firstName,
        data.lastName,
        item.title,
        item.data,
        data.phone
      )
    )
    setShowModal(false)
    setNotice(true)
    setMessage(response)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  return (
    <div className={style.wrapper}>
      <div className={style.overlay}>
        <div className={style.modal}>
          <div className={style.asdf}>
            <h1 className={style.title}>Fill in your booking information</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
              <div>
                <label>
                  <h5 className={style['input-title']}>First Name</h5>
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
                  <h5 className={style['input-title']}>Last Name</h5>
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
              <label>
                <h5 className={style['input-title']}>Trip name</h5>
                <input
                  className={style.input}
                  type='text'
                  placeholder='Trip name'
                  value={item.title}
                  readOnly
                />
              </label>
              <label>
                <h5 className={style['input-title']}>Date</h5>
                <input
                  className={style.input}
                  type='text'
                  placeholder='Date'
                  value={item.data}
                  readOnly
                />
              </label>
              <div>
                <label>
                  <h5 className={style['input-title']}>Price</h5>
                  <input
                    className={style.input}
                    type='text'
                    placeholder='Price'
                    value={`${item.price}$`}
                    readOnly
                  />
                </label>
                <label>
                  <h5 className={style['input-title']}>Travel time</h5>
                  <input
                    className={style.input}
                    type='text'
                    value={item.time}
                    placeholder='Travel time'
                    readOnly
                  />
                </label>
              </div>
              <label>
                <h5 className={style['input-title']}>Mobile phone</h5>
                <input
                  className={style.input}
                  type='tel'
                  placeholder='Mobile phone'
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
              <button onClick={handleSubmit(onSubmit)} type='submit'>
                Send booking request
              </button>
            </form>
            <button className={style.close} onClick={() => setShowModal(false)}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
