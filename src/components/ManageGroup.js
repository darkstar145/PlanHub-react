import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {db} from '../firebase'

import {button, FormControl, FormGroup} from 'react-bootstrap'

import * as routes from '../constants/routes'

const byPropKey = (propertyName, value) => () => ({[propertyName]: value})

class ManageGroupPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newUsers: '',
      banUsers: '',
      error: ''
    }
  }

  addUsers = (e) => {
    const {history, group} = this.props
    const {newUsers} = this.state

    e.preventDefault()

    db.ref().child(group).once('value').then(function (snapshot) {
      let currentUsers = snapshot.val().Users

      let newUsrs = currentUsers.includes(newUsers) ? currentUsers : currentUsers + ' ' + newUsers
      let update = {}
      update['Users'] = newUsrs

      db.ref().child(group).update(update)

      history.push(routes.MESSAGES)
    })
  }

  banUsers = (e) => {
    const {history, group} = this.props
    const {banUsers} = this.state
    let toBan = banUsers.split(' ')

    e.preventDefault()

    db.ref().child(group).once('value').then(function (snapshot) {
      let currentUsers = snapshot.val().Users.split(' ')
      let newUsrs = ''

      for (var i = 0; i < currentUsers.length; i++) {
        let usr = currentUsers[i]
        if (!toBan.includes(usr)) {
          newUsrs += ' ' + usr
        }
      }

      let update = {}
      update['Users'] = newUsrs.replace(/\s+/g, ' ')

      db.ref().child(group).update(update)

      history.push(routes.MESSAGES)
    })
  }

  deleteGroup = (e) => {
    e.preventDefault()
    const { history, group } = this.props
    db.ref().child(group).remove()
    history.push(routes.GROUPS)
  }

  render () {
    const {newUsers, banUsers, error} = this.state

    const isInvalid = (field) => field === ''

    return (
      <div className='container'>
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <a className='nav-link active' id='add-users-tab' href='#add-users' data-toggle='tab' role='tab' aria-controls='add-users' aria-selected='true'>Add Users</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' id='ban-users-tab' href='#ban-users' data-toggle='tab' role='tab' aria-controls='ban-users' aria-selected='false'>Ban Users</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' id='delete-group-tab' href='#delete-group' data-toggle='tab' role='tab' aria-controls='delete-group' aria-selected='false'>Delete Group</a>
          </li>
        </ul>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='add-users' role='tabpanel' aria-labelledby='add-users-tab'>
            <form onSubmit={this.addUsers}>
              <FormGroup>
                <FormControl
                  value={newUsers}
                  onChange={event => this.setState(byPropKey('newUsers', event.target.value))}
                  type='text'
                  placeholder='Emails, separated by spaces' />
                <br />
                <button type='submit' className='btn btn-primary' disabled={isInvalid(newUsers)}>Add Users</button>
                {
                  error && <div><br />
                    <div className='alert alert-danger' role='alert'>
                      {error.message}</div>
                  </div>
                }
              </FormGroup>
            </form>
          </div>
          <div className='tab-pane fade' id='ban-users' role='tabpanel' aria-labelledby='ban-users-tab'>
            <form onSubmit={this.banUsers}>
              <FormGroup>
                <FormControl
                  value={banUsers}
                  onChange={event => this.setState(byPropKey('banUsers', event.target.value))}
                  type='text'
                  placeholder='Emails, separated by spaces' />
                <br />
                <button type='submit' className='btn btn-primary' disabled={isInvalid(banUsers)}>Ban Users</button>
                {
                  error && <div><br />
                    <div className='alert alert-danger' role='alert'>
                      {error.message}</div>
                  </div>
                }
              </FormGroup>
            </form>
          </div>
          <div className='tab-pane fade show' id='delete-group' role='tabpanel' aria-labelledby='delete-group-tab'>
            <form onSubmit={this.deleteGroup}>
              <button type='submit' className='btn btn-primary'>Delete Group?</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ManageGroupPage)
