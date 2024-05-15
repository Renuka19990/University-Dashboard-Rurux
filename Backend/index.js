const express = require('express');
const cors = require('cors');
const { studentRouter } = require('./src/Router/student.routes');
const { connectToDb } = require('./src/Config/config');
const { adminRouter } = require('./src/Router/admin.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Allow specific origins
// const allowedOrigins = ['http://localhost:5173', 'https://university-dashboard-rurux.onrender.com'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };



// Logging middleware to confirm origins
// app.use((req, res, next) => {
//   console.log('Request Origin:', req.headers.origin);
//   console.log('Request Headers:', req.headers);
//   next();
// });

app.use('/studentApi', studentRouter);
app.use('/adminApi',adminRouter);

app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Your server is running on http://localhost:${PORT}`);
});
