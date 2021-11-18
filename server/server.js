import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

const port = process.env.PORT || 5005

dotenv.config()

const app = express()

// enable accepting JSON data in the body
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API running')
})

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

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`))
