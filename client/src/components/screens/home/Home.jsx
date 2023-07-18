import React from 'react'
import Introduction from './introduction/Introduction'
import Flight from './flight/Flight'
import Offer from './offers/Offer'
import Contact from './contact-us/Contact'
import Recommended from './recommended/Recommended'
import Comment from './comments/Comments'
import Discount from './discount/Discount'
const Home = () => {
  return (
    <div>
      <Introduction />
      <Flight />
      <Offer />
      <Contact />
      <Recommended />
      <Comment />
      <Discount />
    </div>
  )
}

export default Home
