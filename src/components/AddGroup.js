import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { db } from '../firebase'

import {button, FormControl, FormGroup} from 'react-bootstrap'

import * as routes from '../constants/routes'

const AddGroupPage = ({history, email}) =>
  <div className='container'>
    <AddGroupForm history={history} email={email} />
  </div>

const byPropKey = (propertyName, value) => () => ({[propertyName]: value})

const INITIAL_STATE = {
  name: '',
  users: '',
  error: null
}

class AddGroupForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = (event) => {
    const {name, users} = this.state
    const {history, email} = this.props
    event.preventDefault()

    let group = {
      Admin: email,
      Users: users
    }

    let msgKey = name
    let newGroup = {}
    newGroup[msgKey] = group

    db.ref().update(newGroup)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE
        }))
        history.push(routes.GROUPS)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
  }

  render () {
    const {name, users, error} = this.state

    const isInvalid = name === '' || users === ''

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            value={name}
            onChange={event => this.setState(byPropKey('name', event.target.value))}
            type='text'
            placeholder='Group Name' />
          <br />
          <FormControl
            value={users}
            onChange={event => this.setState(byPropKey('users', event.target.value))}
            type='text'
            placeholder='Users' />
          {
            error && <div><br />
              <div className='alert alert-danger' role='alert'>
                {error.message}</div>
            </div>
          }
          <br />
          <button type='submit' className='btn btn-primary' disabled={isInvalid}>Add Group</button>
        </FormGroup>
      </form>
    )
  }
}

export default withRouter(AddGroupPage)

export {
  AddGroupForm
}
