const router = require('express').Router();
const Course = require('../models/Courses');
const Aauth = require('../middlewares/authAdmin');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    return res.json(courses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.sendStatus(404);
    return res.json(course);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID format.' });
    }
    return res.status(500).json({ message: err.message });
  }
});

router.use(Aauth);

router.post('/create', async (req, res) => {
  console.log("inside route");
  try {
    const { title, description, price, contentUrl } = req.body;
    const course = await Course.create({ title, description, price, contentUrl });
    return res.status(201).json(course);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updates = req.body;
    const options = {
      new: true,
      runValidators: true
    };
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updates, options);
    if (!updatedCourse) return res.sendStatus(404);
    return res.json(updatedCourse);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID format.' });
    }
    return res.status(400).json({ message: e.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.sendStatus(404);
    return res.json({ message: 'Course deleted', course: deletedCourse });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID format.' });
    }
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
