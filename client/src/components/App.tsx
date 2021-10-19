import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.scss'

import Header from './Header'
import Footer from './Footer'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />

        <main>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
