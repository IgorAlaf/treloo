import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import React, { useRef } from 'react'
import styles from './Comments.module.scss'
import cn from 'classnames'
import 'swiper/css'
import useResize from '../../../../hooks/useResize'
import star from './images/Star (1).svg'
import ava1 from './images/avator-1.png'
import ava2 from './images/avatar-2.png'
import prev from './images/prev.svg'
import next from './images/next.svg'
const data = [
  {
    title:
      'Our trip to Morocco was truly a onece in a lifetime experience and we are so grateful to everyone that made it happen seamlessly. Our travel planner, Jaouad, was increadible.',
    author: '-Vand D',
    image: <img src={ava1} alt='avatar'></img>,
    mark: '4.5',
  },
  {
    title:
      'Our trip to Morocco was truly a onece in a lifetime experience and we are so grateful to everyone that made it happen seamlessly. Our travel planner, Jaouad, was increadible.',
    author: '-Tru Vio',
    image: <img src={ava2} alt='avatar'></img>,
    mark: '4.9',
  },
  {
    title:
      'Our trip to Morocco was truly a onece in a lifetime experience and we are so grateful to everyone that made it happen seamlessly. Our travel planner, Jaouad, was increadible.',
    author: '-Vand D',
    image: <img src={ava2} alt='avatar'></img>,
    mark: '4.3',
  },
  {
    title:
      'Our trip to Morocco was truly a onece in a lifetime experience and we are so grateful to everyone that made it happen seamlessly. Our travel planner, Jaouad, was increadible.',
    author: '-Tru Vio',
    image: <img src={ava1} alt='avatar'></img>,
    mark: '5.0',
  },
]
const Comments = () => {
  const nextRef = useRef()
  const prevRef = useRef()
  const size = useResize()

  return (
    <div className={styles.wrapper} style={{ position: 'relative' }}>
      <div
        ref={nextRef}
        className={cn(
          styles['swiper-button'],
          styles['image-swiper-button-next'],
          'next-arrow'
        )}
      >
        <img src={next} alt='next' />
      </div>
      <div
        ref={prevRef}
        className={cn(
          styles['swiper-button'],
          styles['image-swiper-button-prev'],
          'prev-arrow'
        )}
      >
        <img src={prev} alt='prev' />
      </div>
      <Swiper
        navigation={{
          nextEl: '.next-arrow',
          prevEl: '.prev-arrow',
        }}
        slidesPerView={size.isScreenLg ? 2 : 1}
        spaceBetween={20}
        slidesPerGroup={size.isScreenLg ? 2 : 1}
        speed={600}
        loop={true}
        modules={[Navigation]}
        className={styles.swiperUp}
      >
        {data.map((item, key) => {
          return (
            <SwiperSlide key={key} style={{ paddingBottom: '45px' }}>
              <div className={styles.comment}>
                <blockquote>{item.title}</blockquote>
                <h4>{item.author}</h4>
                <span>Happy Treloo</span>
                <div className={styles['image-wrapper']}>
                  {item.image}
                  <div className={styles.mark}>
                    <img src={star} alt='))' />
                    {item.mark}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Comments
