const {Router} =require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    errorRegister: req.flash('errorRegister'),
    errorLogin: req.flash('errorLogin')

  })
})

router.get('/logout', async(req, res) => {
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
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    req.flash('errorRegister', 'Пользователь с таким email уже существует')
    res.redirect('/auth/login#register')
  } else {
    const {email, name, password} = req.body
    hashPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, name, password: hashPassword, cart: {items: []} })
    await user.save()
    res.redirect('/auth/login#login')
  }
})

module.exports = router