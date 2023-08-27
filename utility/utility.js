import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// @description - to hash and secure password
export const hashPassword = async (password) => {
  try {
    let saltRounds = 10
    let hash = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, hash)
    return hashedPassword
  } catch (e) {
    console.log(e)
  }
}

// @description - to decrypt and match password
export const validatePassword = async (password, hash) => {
  try {
    let isPasswordCorrect = await bcrypt.compare(password, hash)

    return isPasswordCorrect ? true : false
  } catch (error) {
    console.log(error)
  }
}

// @description - to generate token for authorization
export const generateToken = async (id, email) => {
 
  const token = jwt.sign({ id, email }, 'abc123', {
    expiresIn: '2h',
  })

  return token
}
