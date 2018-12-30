import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
// import Event from './Event.js'

class Calendar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      calendarOwner: '',
      calendarGroup: '',
      calendarEvents: [],
      newEventName: '',
      newEventDate: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.createEvent()
  }

  createEvent () {}

  render () {
    // const events = []

    // this.calendarEvents.forEach((event) => {  events.push(    <Event name={event.eventName}
    // date={event.eventStartDate} />  ); });

    return (
      <div className='Calendar'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='newEventName' bsSize='large'>
            <ControlLabel>Event Name</ControlLabel>
            <FormControl
              autoFocus='autoFocus'
              type='text'
              value={this.state.newEventName}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId='newEventDate' bsSize='large'>
            <ControlLabel>Event Date</ControlLabel>
            <FormControl
              autoFocus='autoFocus'
              type='date'
              value={this.state.newEventDate}
              onChange={this.handleChange} />
          </FormGroup>

        </form>
      </div>
    )
  }
}

export default Calendar
