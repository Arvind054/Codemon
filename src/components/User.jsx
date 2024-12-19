import React from 'react'
import Avatar from 'react-avatar'
import '../CSS/User.css'
const User = (props) => {
  return (
    <div className='UserListing'>
      <Avatar name= {props.username} size="70" round = "15px"/>
      <span>{props.username}</span>
    </div>
  )
}

export default User

