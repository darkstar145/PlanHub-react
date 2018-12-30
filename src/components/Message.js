import React from 'react'
import PropTypes from 'prop-types'

class Message extends React.Component {
  render () {
    const {email, text, date, time, image} = this.props

    let img = 'data:image/bmp;base64,' + image

    return (
      <React.Fragment>
        <h6 className='date mb-2 mt-5 text-muted'>{date.concat(' ', time)}</h6>
        <div className='card bg-light mb-5'>
          {
            image && <img className='card-img-top' src={img} />
          }
          <div className='card-header h5'>{email}</div>
          <div className='card-body'>
            <p className='card-text'>{text}</p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Message.propTypes = {
  email: PropTypes.string,
  text: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string
}

Message.defaultProps = {
  text: '',
  email: '',
  time: '',
  date: ''
}

export default Message
