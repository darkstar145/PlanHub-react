import React, {Component} from 'react'

import {Button, FormControl, FormGroup} from 'react-bootstrap'

import {auth} from '../firebase'

const byPropKey = (propertyName, value) => () => ({[propertyName]: value})

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = (event) => {
    const {passwordOne} = this.state

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE
        }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render () {
    const {passwordOne, passwordTwo, error} = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type='password'
            placeholder='New Password' />
          <br />
          <FormControl
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type='password'
            placeholder='Confirm New Password' />
          <br />
          <Button disabled={isInvalid} type='submit'>Reset My Password</Button>

          {error && <p>{error.message}</p>}
        </FormGroup>
      </form>
    )
  }
}

export default PasswordChangeForm
