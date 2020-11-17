import React from 'react'
import '../index.css'

const Notification = ({ message, alertType }) => {
  if(message === null) {
    return null
  }
  else if (alertType === 0) {
    return (
      <div className='greenalert'>
        {message}
      </div>
    )
  }
  else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

export default Notification