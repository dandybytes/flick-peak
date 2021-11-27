import {FunctionComponent, useEffect, useState} from 'react'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'

import './App.scss'

import {isMobileDevice, isSmallScreen} from '../utils'

import NotificationContainer from './common/notifications/NotificationContainer'
import Modal from './common/Modal'
import Header from './Header'
// import Footer from './Footer'
// import HomePage from './pages/HomePage'
import FavoriteMoviePage from './pages/FavoriteMoviePage'
import MovieListPage from './pages/MovieListPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
// import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import PublicOnlyRoute from '../routes/PublicOnlyRoute'
import PrivateOnlyRoute from '../routes/PrivateOnlyRoute'

const App: FunctionComponent = () => {
  const location = useLocation()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isMobileDevice() || isSmallScreen()) setShowModal(true)
  }, [])

  return (
    <div className='app'>
      <Header />

      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Redirect from='/' exact to='/movies' />
          {/* <Route path='/' exact component={HomePage} /> */}
          <Route path='/movies' component={MovieListPage} />
          <Route path='/movie/:movieID' component={MovieDetailsPage} />
          <PrivateOnlyRoute path='/favorite' component={FavoriteMoviePage} />
          <PublicOnlyRoute path='/signup' component={RegistrationPage} />
          <PublicOnlyRoute path='/login' component={LoginPage} />
          {/* <Route path='/about' component={AboutPage} /> */}
          <Route component={NotFoundPage} />
        </Switch>
      </AnimatePresence>

      {/* <Footer /> */}

      <NotificationContainer />

      {showModal && (
        <Modal hideModal={() => setShowModal(false)} status='warning'>
          <div
            style={{
              margin: '0 0 1em',
              fontSize: '4vmin',
              fontWeight: 500,
              letterSpacing: 0,
              textTransform: 'none',
              textAlign: 'justify'
            }}
          >
            <p>
              This site doesn't yet support mobile devices. Please give us a try on a computer while
              our team works hard to provide you with seamless user experience on mobile devices!
            </p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default App
