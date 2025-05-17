import express from 'express'

import Favorite from '../models/favoriteModel.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

/**
 * @desc    ADD TO FAVORITE
 * @route   post: /api/favorites
 * @access  private
 */
router.route('/').post(authMiddleware, async (req, res) => {
  try {
    if (req.user == null) {
      console.log(`Missing user data. Not authorized to post favorite info.`)
      return res.status(401).json({
        success: false,
        message: `Not authorized.`
      })
    }

    const {movieId} = req.body

    if (movieId == null) {
      console.log(`Missing ID of movie to add to favorites.`)
      return res.status(400).json({
        success: false,
        message: `Missing ID of movie to add to favorites.`
      })
    }

    const updatedFavoriteInfo = await Favorite.findByIdAndUpdate(
      req?.user?._id,
      {
        $addToSet: {movies: movieId}
      },
      {new: true, upsert: true}
    )

    return res.status(201).json({
      success: true,
      message: `Movie ${movieId} added to user ${req.user.name}'s favorites.`,
      favorites: updatedFavoriteInfo.movies
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({success: false, message: error})
  }
})

/**
 * @desc    GET FAVORITES
 * @route   get: /api/favorites
 * @access  private
 */
router.route('/').get(authMiddleware, async (req, res) => {
  try {
    if (req.user == null) {
      console.log(`Missing user data. Not authorized to get favorite info.`)
      return res.status(401).json({
        success: false,
        message: `Not authorized.`
      })
    }

    const userID = req?.user?._id

    const existingFavorites = await Favorite.findById(userID)
    const favoriteMovies = existingFavorites?.movies ?? []

    return res.status(200).json({
      success: true,
      message: `Favorite movies found for user ${userID}`,
      favorites: favoriteMovies
    })
  } catch (error) {
    console.error(`Retrieving favorite movies has failed: `, error)
    return res.status(500).json({success: false, message: error})
  }
})

/**
 * @desc    REMOVE FROM FAVORITES
 * @route   patch: /api/favorites
 * @access  private
 */
router.route('/').patch(authMiddleware, async (req, res) => {
  try {
    if (req.user == null) {
      console.log(`Missing user data. Not authorized to update favorite info.`)
      return res.status(401).json({
        success: false,
        message: `Not authorized.`
      })
    }

    const {movieId} = req.body

    if (movieId == null) {
      console.log(`Missing ID of movie to remove from favorites.`)
      return res.status(400).json({
        success: false,
        message: `Missing ID of movie to remove from favorites.`
      })
    }

    const updatedFavoriteInfo = await Favorite.findByIdAndUpdate(
      req?.user?._id,
      {
        $pull: {movies: movieId}
      },
      {new: true}
    )

    return res.status(200).json({
      success: true,
      message: `Movie ${movieId} removed from favorites.`,
      favorites: updatedFavoriteInfo.movies
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({success: false, message: error})
  }
})

export default router
