import jsonwebtoken from 'jsonwebtoken'
import User from '../models/userModel.js'

export default async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      req.user = null
      return next()
    }

    const receivedUserJWT = req.headers.authorization.split(' ')[1]
    const userDataFromJWT = jsonwebtoken.verify(receivedUserJWT, process.env.JWT_SECRET)
    // retrieve user data by ID from JWT and pass on everything except the password
    req.user = await User.findById(userDataFromJWT.id).select('-password')

    next()
  } catch (error) {
    console.error(`Auth middleware error: `, error)
    return res.status(401).json({
      success: false,
      message: 'Token authorization has failed'
    })
  }
}
