import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './Navigation'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import PasswordForgetPage from './PasswordForget'
import HomePage from './Home'
import AccountPage from './Account'
import Messages from './Messages'
import Groups from './Groups'
import AddGroupPage from './AddGroup'
import ManageGroupPage from './ManageGroup'
import { auth, db } from '../firebase'
import * as routes from '../constants/routes'

import withAuthentication from './withAuthentication'

import './App.css'

const scrollToBottom = () => {
  if (document.getElementById('messageList')) {
    const objDiv = document.getElementById('messageList')
    objDiv.scrollTop = objDiv.scrollHeight
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authorized: false,
      email: '',
      name: '',
      messages: {},
      rooms: [],
      adminRooms: [],
      room: ''
    }
    this.setRoom = this.setRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.isAdmin = this.isAdmin.bind(this)
  }

  componentDidMount () {
    auth.au.onAuthStateChanged(
      function (user) {
        if (user) {
          this.setState({
            email: user.email,
            name: user.displayName,
            authorized: true
          })
        }
      }.bind(this)
    )

    let msgs = {}

    db.ref().on(
      'value',
      function (rooms) {
        let rms = []
        let adminRms = []
        let email = this.state.email
        rooms.forEach(function (room) {
          let users = room.val().Users
          let admin = room.val().Admin

          if (users.includes(email) || admin.includes(email)) {
            if (admin.includes(email)) {
              adminRms.push(room.key)
            }
            var roomMsgs = []
            room.forEach(function (message) {
              let k = message.key
              if (
                k !== 'Admin' &&
                k !== 'Messages Are Above' &&
                k !== 'Users'
              ) {
                let msg = {
                  image: message.val().Aimage || '',
                  date: message.val().date,
                  text: message.val().text,
                  time: message.val().time,
                  email: message.val().email,
                  id: message.id
                }
                roomMsgs.push(msg)
              }
            })
            msgs[room.key] = roomMsgs
            rms.push(room.key)
          }
        })
        this.setState({
          messages: msgs,
          rooms: rms,
          adminRooms: adminRms
        })
      }.bind(this)
    )
  }

  componentDidUpdate () {
    scrollToBottom()
  }

  isAdmin () {
    return this.state.adminRooms.includes(this.state.room)
  }

  setRoom (rm) {
    this.setState({ room: rm })
  }

  getRooms () {
    return this.state.rooms
  }

  setAuthorization (authorized) {
    this.setState({ authorized: authorized })
  }

  render () {
    return (
      <Router>
        <React.Fragment>
          <Navigation isAdmin={this.isAdmin} />
          <div className='wrapper'>
            <Route
              exact
              path={routes.LANDING}
              component={() => <LandingPage />}
            />
            <Route
              exact
              path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact
              path={routes.SIGN_IN}
              component={() => <SignInPage setEmail={this.setEmail} />}
            />
            <Route
              exact
              path={routes.PASSWORD_FORGET}
              component={() => <PasswordForgetPage />}
            />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route
              exact
              path={routes.ACCOUNT}
              component={() => <AccountPage />}
            />
            <Route
              exact
              path={routes.MANAGEGROUPS}
              component={() => <ManageGroupPage group={this.state.room} />}
            />
            <Route
              exact
              path={routes.MESSAGES}
              component={() => (
                <Messages
                  email={this.state.email}
                  messages={this.state.messages}
                  room={this.state.room}
                />
              )}
            />
            <Route
              exact
              path={routes.GROUPS}
              component={() => (
                <Groups
                  getRooms={this.getRooms}
                  setRoom={this.setRoom}
                  email={this.state.email}
                />
              )}
            />
            <Route
              exact
              path={routes.ADDGROUP}
              component={() => <AddGroupPage email={this.state.email} />}
            />
          </div>
        </React.Fragment>
      </Router>
    )
  }
}

export default withAuthentication(App)
