import {FunctionComponent} from 'react'

import './NotFoundPage.scss'

import PageContainer from './PageContainer'

const NotFoundPage: FunctionComponent = () => {
  return (
    <PageContainer classNames='not-found-page'>
      <div className='error-message-box'>
        <p>Ooops... This page doesn't exist.</p>
      </div>
    </PageContainer>
  )
}

export default NotFoundPage
