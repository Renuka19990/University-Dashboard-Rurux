const express = require('express');
const { connectToDb } = require('./src/Config/config');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const StudentRoute = require('./src/Router/Student.router');
const adminRouter = require('./src/Router/admin.router');

app.use(cors());
app.use(express.json());

app.use('/api', StudentRoute); // Use StudentRoute without destructuring
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, async () => {
    await connectToDb();
    console.log(`Your server is running on http://localhost:${PORT}`);
});
