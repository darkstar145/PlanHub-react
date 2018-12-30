import React, { Component } from 'react'

import { Button, FormControl, FormGroup } from 'react-bootstrap'

import { auth } from '../firebase'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  usernameOne: '',
  usernameTwo: '',
  error: null
}

class UsernameChangeForm extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { usernameOne } = this.state

    auth.doSetDisplayName(usernameOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render () {
    const {
      usernameOne,
      error
    } = this.state

    const isInvalid =
      usernameOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            value={usernameOne}
            onChange={event => this.setState(byPropKey('usernameOne', event.target.value))}
            type='username'
            placeholder={auth.getDisplayName()}
          />
          <br />
          <Button disabled={isInvalid} type='submit'>Change Username</Button>

          { error && <p>{error.message}</p> }
        </FormGroup>
      </form>
    )
  }
}

export default UsernameChangeForm
