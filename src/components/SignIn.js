import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {button, FormControl, FormGroup} from 'react-bootstrap'

import {SignUpLink} from './SignUp'
import {PasswordForgetLink} from './PasswordForget'
import {auth} from '../firebase'
import * as routes from '../constants/routes'

const SignInPage = ({history}) => <div className='container'>
  <SignInForm history={history} />
  <PasswordForgetLink />
  <SignUpLink />
</div>

const byPropKey = (propertyName, value) => () => ({[propertyName]: value})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = (event) => {
    const {email, password} = this.state
    const {history} = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE
        }))
        history.push(routes.GROUPS)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render () {
    const {email, password, error} = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type='text'
            placeholder='Email Address' />
          <br />
          <FormControl
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type='password'
            placeholder='Password' />
          <br />
          <button type='submit' className='btn btn-primary' disabled={isInvalid}>Sign In</button>
          {
            error && <div><br />
              <div className='alert alert-danger' role='alert'>
                {error.message}</div>
            </div>
          }
        </FormGroup>
      </form>
    )
  }
}

export default withRouter(SignInPage)

export {
  SignInForm
}
