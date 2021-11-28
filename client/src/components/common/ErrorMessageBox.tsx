import {FunctionComponent} from 'react'

import './ErrorMessageBox.scss'

type EMBProps = {
  message: string
}

const ErrorMessageBox: FunctionComponent<EMBProps> = ({message}) => {
  return <div className='error-message-box'>{message}</div>
}

export default ErrorMessageBox
