import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import User from '../models/userModel.js'
import generateJWT from '../utils/jwt.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

/**
 * @desc    REGISTRATION
 * @route   post: /api/users
 * @access  public
 */
router.route('/').post(async (req, res) => {
  try {
    const {name, email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `User with email ${email} already exists.`
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    if (!hashedPassword) {
      console.error('Password hashing failed.')
      return res.status(500).json({
        success: false,
        message: 'Internal server error.'
      })
    }

    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword
    })

    if (newUser == null) {
      console.error(`DB failed to create new user ${email}.`)
      return res.status(500).json({
        success: false,
        message: 'Saving the user failed.'
      })
    }

    return res.status(201).json({
      success: true,
      message: `User ${email} created.`,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateJWT({
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        })
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({success: false, message: error})
  }
})

/**
 * @desc    LOGIN
 * @route   post: /api/users/login
 * @access  public
 */
router.route('/login').post(async (req, res) => {
  try {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (!existingUser) {
      console.log(`User ${email} could not be found.`)
      return res.status(401).json({
        success: false,
        message: `Wrong user name or password.`
      })
    }

    const passwordMatched = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatched) {
      console.log(`Wrong password provided for ${email}.`)
      return res.status(401).json({
        success: false,
        message: `Wrong user name or password.`
      })
    }

    const token = generateJWT({
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    })

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      // should detailed user info be sent in the response?
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        token
      }
    })
  } catch (error) {
    console.error('Sign-in failed: ', error)
    return res.status(500).json({success: false, message: error})
  }
})

/**
 * @desc    PROFILE
 * @route   get: /api/users/profile
 * @access  private
 */
// execute the authentication middleware first on this protected route
router.route('/profile').get(authMiddleware, async (req, res) => {
  try {
    if (req.user == null) {
      console.log(`Missing user data. Not authorized to get profile info.`)
      return res.status(401).json({
        success: false,
        message: `Not authorized.`
      })
    }

    const existingUser = await User.findById(req?.user?._id)

    if (!existingUser) {
      console.log(`The user could not be found in the database.`)
      return res.status(404).json({
        success: false,
        message: `User not found.`
      })
    }

    return res.status(200).json({
      success: true,
      message: `Data for user ${existingUser._id} successfully retrieved.`,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
      }
    })
  } catch (error) {
    console.error(`Retrieving user profile has failed: `, error)
    return res.status(500).json({success: false, message: error})
  }
})

export default router
