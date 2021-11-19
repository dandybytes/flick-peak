import mongoose from 'mongoose'

const connectDB = async databaseURL => {
  try {
    await mongoose.connect(databaseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log('Database connection successful')
  } catch (error) {
    console.error('Database connection has failed', error)
    process.exit(1)
  }
}

export default connectDB
