import {FC, SyntheticEvent, useState} from 'react'
import {Link} from 'react-router-dom'

import './AuthForm.scss'

import LoadingIndicator from './common/LoadingIndicator'

type AuthFormProps = {
  isLoginForm: boolean
  handleSubmit: (event: SyntheticEvent) => void
  isBusy: boolean
}

const AuthForm: FC<AuthFormProps> = ({handleSubmit, isLoginForm, isBusy}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  return (
    <div className='form-container'>
      <h1 className='form-headline'>{isLoginForm ? 'Log In' : 'Create Account'}</h1>
      <form
        className='form-body'
        onSubmit={event => {
          if (isBusy) return event.preventDefault()
          handleSubmit(event)
        }}
      >
        {!isLoginForm && (
          <input
            name='name'
            type='text'
            placeholder='name'
            className='form-input'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        )}
        <input
          name='email'
          type='email'
          placeholder='email'
          className='form-input'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          className='form-input'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        {!isLoginForm && (
          <input
            name='confirm'
            type='password'
            placeholder='confirm password'
            className='form-input'
            value={confirmedPassword}
            onChange={event => setConfirmedPassword(event.target.value)}
          />
        )}
        <button className='submit-button' type='submit' disabled={isBusy}>
          {isLoginForm ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      {isLoginForm ? (
        <p className='form-footer'>
          Don't have an account yet? <Link to={'/signup'}>Sign Up</Link>
        </p>
      ) : (
        <p className='form-footer'>
          Already have an account? <Link to={'/login'}>Log In</Link>
        </p>
      )}

      <div className={`form-overlay ${isBusy ? ' visible' : ''}`}>
        <LoadingIndicator />
      </div>
    </div>
  )
}

export default AuthForm
