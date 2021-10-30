import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.scss'

import Header from './Header'
import Footer from './Footer'
import HomePage from './pages/HomePage'
import MovieListPage from './pages/MovieListPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />

        <main className='main'>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/movies' exact component={MovieListPage} />
            <Route path='/movie/:movieID' exact component={MovieDetailsPage} />
            <Route path='/about' exact component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
