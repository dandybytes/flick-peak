import {SyntheticEvent, FunctionComponent} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './LoginPage.scss'

import {createNotification, logUserIn, RootState} from '../../state'

import PageContainer from './PageContainer'
import AuthForm from '../AuthForm'

const LoginPage: FunctionComponent = () => {
  const dispatch = useDispatch()

  const isFetching: boolean = useSelector((state: RootState) => state?.user?.fetching)

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      email: {value: string}
      password: {value: string}
    }

    const email = target.email.value
    const password = target.password.value

    if (!email || !password) {
      return dispatch(
        createNotification(
          'Missing email or password', //message
          'error', // notification type
          10000 // duration (setting to 0 will make it never expire)
        )
      )
    }

    dispatch(logUserIn(email, password))
  }

  return (
    <PageContainer classNames='login-page'>
      <AuthForm handleSubmit={handleLogin} isLoginForm={true} isDisabled={isFetching} />
    </PageContainer>
  )
}

export default LoginPage
