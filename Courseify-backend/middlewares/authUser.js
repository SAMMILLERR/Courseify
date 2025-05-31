// middleware/authUser.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1️⃣  Get the token from your custom header
  const token = req.headers.token;          // <–– you said you’ll send it here
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // 2️⃣  Verify and decode
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  // 3️⃣  Ensure it’s a student
  if (payload.role !== 'student') {
    return res.status(403).json({ error: 'Please login as student' });
  }

  // 4️⃣  Attach user info downstream
  req.user = { id: payload.id, role: payload.role };

  next();
};
