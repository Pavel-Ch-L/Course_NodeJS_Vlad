const {Router} =require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mailTransport = require('../emails/mailTranspot')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')


router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    errorRegister: req.flash('errorRegister'),
    errorLogin: req.flash('errorLogin')

  })
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async(req, res) => {
  const user = await User.findOne({'email': req.body.email})
  if (!user) {
    req.flash('errorLogin', 'Пользователь с таким email не существует')
    res.redirect('/auth/login#login')
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user
      req.session.isAuthenticated = true
      req.session.save(err => {
        if (err) {
          throw err
        }
        res.redirect('/')
      })
    } else {
      req.flash('errorLogin', 'Не правильный пароль')
      res.redirect('/auth/login#login')
    }
  } 
})

router.post('/register', async(req, res) => {
  if (req.body.password === req.body.confirm) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
      req.flash('errorRegister', 'Пользователь с таким email уже существует')
      res.redirect('/auth/login#register')
    } else {
      const {email, name, password} = req.body
      hashPassword = await bcrypt.hash(password, 10)
      const user = new User({ email, name, password: hashPassword, cart: {items: []} })
      await user.save()
      res.redirect('/')
      await mailTransport(regEmail(email, name))
    }
  } else {
    req.flash('errorRegister', 'Повторно введенный пароль не совпадает !')
    res.redirect('/auth/login#register')
  }
})

router.get('/reset', (req, res) => {
  res.render('auth/reset', {
    title: 'Восстановление пароля',
    error: req.flash('error')
  })
})

router.get('/password/:token', async(req, res) => {
  if (!req.params.token) {
    return res.redirect('auth/login')
  } else {
    try {
      const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExp: {$gt: Date.now()}
      }) 
      if (!user) {
        return res.redirect('auth/login')
      } else {
        res.render('auth/password', {
          title: 'Обновление пароля',
          error: req.flash('error'),
          userId: user._id.toString(),
          token: req.params.token
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})

router.post('/reset', (req, res) => {
  try {
    crypto.randomBytes(32, async(err, buffer) => {
      if (err) {
        req.flash('error', 'Что-то пошло не так, повторите попытку позже')
        res.redirect('/auth/reset')
      } else {
        const token = buffer.toString('hex')
        const candidate = await User.findOne({email: req.body.email})
        if (candidate) {
          candidate.resetToken = token
          candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
          await candidate.save()
          await mailTransport(resetEmail(candidate.email, candidate.name, token))
          res.redirect('/auth/login')
        } else {
          req.flash('error', 'Такой email не найден')
          res.redirect('/auth/reset')
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
})

router.post('/password', async(req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: {$gt: Date.now()}
    })
    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10)
      user.resetToken = undefined
      user.resetTokenExp = undefined
      await user.save()
      res.redirect('/auth/login')
    } else {
      req.flash('loginError', 'Время жизни токена истекло')
      res.redirect('/auth/login')
    }
  } catch (error) {
    console.log(error);
  }
})

module.exports = router