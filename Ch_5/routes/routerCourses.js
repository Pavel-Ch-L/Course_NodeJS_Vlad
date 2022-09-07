const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth.js')

router.get('/', async(req, res) => {
 const courses = await Course.find()
 res.render('courses', {
  title: 'Курсы',
  isCourses: true,
  courses
 })
})

router.get('/:id', async(req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: course.title,
    course
  })
})

router.get('/:id/edit', auth, async(req, res) => {
  if(req.query.allow === 'true') {
    const course = await Course.findById(req.params.id)
    res.render('course-edit', {
      title: 'Редактировать курс',
      course
    })
  } else {
    res.redirect('/')
  }
})

router.post('/edit', auth, async(req, res) => {
  const {id} = req.body
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
})

router.post('/remove', auth, async( req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id
    })
    res.redirect('/courses')
  } catch (error) {
    console.log(error);
  }
})

module.exports = router