// 1) Load .env (must be first!)
require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors=require('cors');

const userRoutes   = require('./routes/user');
const adminRoutes=require('./routes/admin');
const courseRoutes=require('./routes/course');
const purchaseRoutes=require('./routes/purchase');




const app = express();
app.use(express.json());
app.use(cors());

// 2) Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// 3) Mount your routers
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/purchase',purchaseRoutes);


// 4) Start server
app.listen(process.env.PORT, () =>
  console.log(`Server on http://localhost:${process.env.PORT}`)
);
