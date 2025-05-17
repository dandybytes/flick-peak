import jsonwebtoken from 'jsonwebtoken'

const generateJWT = userData => {
  return jsonwebtoken.sign(userData, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generateJWT
