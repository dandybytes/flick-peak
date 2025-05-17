import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './services/db.js'
import {notFoundHandler, errorHandler} from './middleware/error.js'
import userRoutes from './routes/userRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

dotenv.config()

const port = process.env.PORT || 5000

connectDB(process.env.DATABASE_URL)

const app = express()

app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
)

app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API running')
})

app.use('/api/users', userRoutes)
app.use('/api/favorites', favoriteRoutes)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  // Set the static asset directory
  app.use(express.static('client/build'))

  // Serve index.html on all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// handle routes that don't exist
app.use(notFoundHandler)

// error-handling middleware
app.use(errorHandler)

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`))
