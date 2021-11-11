import React from 'react'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'

import './App.scss'

import Header from './Header'
// import Footer from './Footer'
// import HomePage from './pages/HomePage'
import MovieListPage from './pages/MovieListPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
// import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

const App: React.FunctionComponent = () => {
  const location = useLocation()

  return (
    <div className='app'>
      <Header />

      <main className='main'>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Redirect from='/' exact to='/movies' />
            {/* <Route path='/' exact component={HomePage} /> */}
            <Route path='/movies' component={MovieListPage} />
            <Route path='/movie/:movieID' component={MovieDetailsPage} />
            {/* <Route path='/about' component={AboutPage} /> */}
            <Route component={NotFoundPage} />
          </Switch>
        </AnimatePresence>
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default App
