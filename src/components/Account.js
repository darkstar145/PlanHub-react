import React from 'react'
import PropTypes from 'prop-types'

import PasswordChangeForm from './PasswordChange'
import UsernameChangeForm from './UsernameChange'
import withAuthorization from './withAuthorization'

const AccountPage = () => <div className='container'>
  <PasswordChangeForm />
  <br />
  <UsernameChangeForm />
</div>

AccountPage.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountPage)
