const router   = require('express').Router();
const Purchase = require('../models/Purchase');
const Uauth    = require('../middlewares/authUser');

router.use(Uauth);

/* ------------------------------------------------------------------ */
/*  POST /api/purchase   – buy a course                                */
/* ------------------------------------------------------------------ */
router.post('/', async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) return res.status(400).json({ error: 'courseId required' });

  try {
    // avoid duplicates
    const exists = await Purchase.findOne({ userId: req.user.id, courseId });
    if (exists) return res.status(409).json({ error: 'Already purchased' });

    // 2-year validity
    const now       = new Date();
    const validTill = new Date(now);
    validTill.setFullYear(now.getFullYear() + 2);

    const purchase = await Purchase.create({
      userId:   req.user.id,
      courseId,
      validTill,
    });

    return res.status(201).json({ message: 'Course purchased', purchase });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/* ------------------------------------------------------------------ */
/*  GET /api/purchase   – list active purchases                        */
/* ------------------------------------------------------------------ */
router.get('/', async (req, res) => {
  try {
    const now = new Date();

    const purchases = await Purchase.find({
      userId:   req.user.id,
      validTill: { $gte: now },       // only still-valid
    }).populate('courseId');

    const courses = purchases.map(p => ({
      course:    p.courseId,
      validTill: p.validTill,
    }));

    return res.json({ purchasedCourses: courses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
