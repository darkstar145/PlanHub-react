import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {button} from 'react-bootstrap'

import PropTypes from 'prop-types'
import * as routes from '../constants/routes'

const INITIAL_STATE = {
  buttons: []
}

class Groups extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groups: props.groups,
      ...INITIAL_STATE
    }
  }

  navToGroup = group => {
    const { history, setRoom } = this.props
    setRoom(group)
    history.push(routes.MESSAGES)
  };

  componentWillMount () {
    var groups = this.props.getRooms()

    let buttons = groups.map(group => {
      return (
        <button
          key={group}
          type='submit'
          onClick={() => this.navToGroup(group)}
          className='btn btn-primary mt-3 mb-3'
        >
          {group}
        </button>
      )
    })

    this.setState({ buttons: buttons })
  }

  render () {
    const {history} = this.props

    return (
      <div className='container d-flex flex-column ml-auto mr-auto w-75 h-100'>
        {this.state.buttons}
        <button type='button' className='btn btn-info mt-10 mb-10' id='addGroupBtn' onClick={() => history.push(routes.ADDGROUP)}>Add Group</button>
      </div>
    )
  }
}

Groups.propTypes = {
  groups: PropTypes.array,
  history: PropTypes.object,
  setRoom: PropTypes.func,
  getRooms: PropTypes.func
}

export default withRouter(Groups)
