import {Component} from 'react'

class Event extends Component {
  constructor (props) {
    super(props)

    this.state = {
      eventName: '',
      eventGroups: [],
      eventParticipants: [],
      eventStartDate: '',
      eventStartTime: '',
      eventIsAllDay: '',
      eventEndDate: '',
      eventEndTime: ''
    }
  }
}

export default Event
