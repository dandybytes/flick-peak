import mongoose from 'mongoose'

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    movies: [{type: String}]
  },
  {timestamps: true}
)

const Favorite = mongoose.model('Favorite', favoriteSchema)

export default Favorite
