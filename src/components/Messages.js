import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import Message from './Message'
import { db } from '../firebase'

const scrollToBottom = () => {
  if (document.getElementById('messageList')) {
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }
}

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: props.messages,
      room: props.room,
      imageInput: '',
      chatInput: ''
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.imageSubmitHandler = this.imageSubmitHandler.bind(this)
  }

  textChangeHandler (event) {
    this.setState({ chatInput: event.target.value })
  }

  pushMessage (image, text) {
    const room = this.state.room
    var d = new Date()

    var date = d.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    })

    var time = d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })

    var message = {
      email: this.props.email,
      text: text,
      Aimage: image,
      time: time,
      date: date
    }

    /* Send the message to Firebase */
    db
      .ref()
      .child(room)
      .push(message)
  }

  submitHandler (e) {
    e.preventDefault()
    this.pushMessage(null, this.state.chatInput)
    this.setState({ chatInput: '' })
  }

  imageSubmitHandler (files) {
    var self = this
    this.setState({
      imageInput: files[0]
    })
    var reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = function (e) {
      var str = reader.result
      str = str.substring(str.indexOf(',') + 1)
      self.pushMessage(str, null)
    }
  }

  componentDidMount () {
    scrollToBottom()
  }

  componentDidUpdate () {
    scrollToBottom()
  }

  render () {
    let messages = this.state.messages

    let msgs = []

    for (var room in messages) {
      if (room === this.state.room) {
        msgs = messages[room]
      }
    }

    const roomMsgs = msgs.map((message, i) => {
      return (
        <Message
          key={i}
          email={message.email}
          date={message.date}
          time={message.time}
          text={message.text}
          image={message.image}
        />
      )
    })

    return (
      <div className='container d-flex flex-column ml-auto mr-auto w-75 h-100'>
        <div className='messageList' id='messageList'>
          {roomMsgs}
        </div>
        <Dropzone
          multiple={false}
          accept='image/*'
          onDrop={this.imageSubmitHandler.bind(this)}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        <form onSubmit={this.submitHandler}>
          <div className='form-group fixed-bottom w-75 ml-auto mr-auto' id='messageInput'>
            <input
              type='text'
              className='form-control'
              onChange={this.textChangeHandler}
              value={this.state.chatInput}
              placeholder='Write a message...'
              required='required'
            />
          </div>
        </form>
      </div>
    )
  }
}

Messages.propTypes = {
  messages: PropTypes.object,
  room: PropTypes.string
}

export default Messages
