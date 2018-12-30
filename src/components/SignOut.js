import React from 'react'

import { NavItem } from 'react-bootstrap'

import { auth } from '../firebase'

const SignOut = () =>

  <NavItem
    primaryText='Sign out'
    onClick={auth.doSignOut}
  />

export default SignOut
