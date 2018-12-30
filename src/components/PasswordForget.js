import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FormControl, FormGroup } from 'react-bootstrap'

import { auth } from '../firebase'

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
)

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetForm extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  };

  render () {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            value={this.state.email}
            onChange={event =>
              this.setState(byPropKey('email', event.target.value))
            }
            type='text'
            hintText='Email Address'
          />
        </FormGroup>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to='/pw-forget'>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }
