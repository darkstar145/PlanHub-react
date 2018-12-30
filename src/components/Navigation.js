import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as auth from '../firebase/auth'

const navStyle = {
  zIndex: 1
}

const Navigation = (props, { authUser, isAdmin }) => (
  <nav
    className='navbar navbar-expand-lg navbar-dark bg-primary'
    style={navStyle}
  >
    <a className='navbar-brand' href='/'>
      PlanHub
    </a>
    <button
      className='navbar-toggler'
      type='button'
      data-toggle='collapse'
      data-target='#collapsibleNavbar'
    >
      <span className='navbar-toggler-icon' />
    </button>
    {authUser ? <Authed isAdmin={props.isAdmin} /> : <NonAuthed />}
  </nav>
)

Navigation.contextTypes = {
  authUser: PropTypes.object
}

const Authed = ({isAdmin}) => {
  return (
    <div className='collapse navbar-collapse' id='collapsibleNavbar'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link className='nav-link' to='/groups'>
            Groups
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/calendar'>
            Calendar
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/files'>
            Files
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/gallery'>
            Gallery
          </Link>
        </li>
        <li className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='navbarDropdownMenuLink'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            Menu
          </a>
          <div
            className='dropdown-menu'
            aria-labelledby='navbarDropdownMenuLink'
          >
            <Link className='dropdown-item' to='/account'>
              Account Settings
            </Link>
            {
              isAdmin() && <Link className='dropdown-item' to='/group-settings'>
                  Group Settings
              </Link>
            }
            <Link className='dropdown-item' to='/' onClick={auth.doSignOut}>
              Sign Out
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}

const NonAuthed = () => {
  return (
    <div className='collapse navbar-collapse' id='collapsibleNavbar'>
      <ul className='navbar-nav mr-auto '>
        <li className='nav-item'>
          <Link className='nav-link' to='/signin'>
            Sign In
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
