const mongoose = require('mongoose')
const passport = require('passport')
const Users = mongoose.model('Users')
// const auth = require('../routes/auth')


exports.set_user = (req, res, next ) =>{
  console.log('jasonhere')
  console.log(req)
  const { body: { user } } = req

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    })
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    })
  }

  const finalUser = new Users(user)

  finalUser.setPassword(user.password)
  console.log('jasonpassport')
  console.log(finalUser)
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch((err)=>{
      console.log(err)
    })
}

//start

exports.login_user = (req, res, next ) =>{
  const { body: { user } } = req

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    })
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    })
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err)
    }

    if(passportUser) {
      const user = passportUser
      user.token = passportUser.generateJWT()

      return res.json({ user: user.toAuthJSON() })
    }

    return status(400).info
  })(req, res, next)
}

//GET current route (required, only authenticated users have access)
exports.current_user = (req, res, next, id ) =>{
  console.log('belowpayload')
  // console.log(req)
  // console.log(req.user)
console.log(id)
  // const { payload: { id } } = req
  console.log('payload above')
  console.log(id)
  // console.log(req)
  // console.log(id)

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        console.log('nouser')
        return res.sendStatus(400)
      }

      return res.json({ user: user.toAuthJSON() })
    })
}
