import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

const port = process.env.PORT || 5005

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// enable accepting JSON data in the body
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API running')
})

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`))
