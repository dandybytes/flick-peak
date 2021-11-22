import {SyntheticEvent, FunctionComponent} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './RegistrationPage.scss'

import {createNotification, registerUser, RootState} from '../../state'

import PageContainer from './PageContainer'
import AuthForm from '../AuthForm'
import {isValidEmail} from '../../utils'

const minimumPasswordLength = 8

const RegistrationPage: FunctionComponent = () => {
  const dispatch = useDispatch()

  const isFetching: boolean = useSelector((state: RootState) => state?.user?.registration?.fetching)

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      name: {value: string}
      email: {value: string}
      password: {value: string}
      confirm: {value: string}
    }

    const name = target.name.value
    const email = target.email.value
    const password = target.password.value
    const confirm = target.confirm.value

    if (!name || !email || !password || !confirm) {
      return dispatch(
        createNotification(
          'To register, please fill out all the fields!', //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    if (!isValidEmail(email)) {
      return dispatch(
        createNotification(
          'Please provide a valid email address!', //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    if (password !== confirm) {
      return dispatch(
        createNotification(
          'Passwords do not match.', //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    if (password.length < minimumPasswordLength) {
      return dispatch(
        createNotification(
          `The password must be at least ${minimumPasswordLength} characters long.`, //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    if (!/\d/.test(password)) {
      return dispatch(
        createNotification(
          `The password must contain at least one digit.`, //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    if (!/[A-Z]/.test(password)) {
      return dispatch(
        createNotification(
          `The password must contain at least one uppercase letter.`, //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    if (!/[a-z]/.test(password)) {
      return dispatch(
        createNotification(
          `The password must contain at least one lowercase letter.`, //message
          'warning', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    dispatch(registerUser(email, password, name))
  }

  return (
    <PageContainer classNames='registration-page'>
      <AuthForm handleSubmit={handleSignUp} isLoginForm={false} isBusy={isFetching} />
    </PageContainer>
  )
}

export default RegistrationPage
