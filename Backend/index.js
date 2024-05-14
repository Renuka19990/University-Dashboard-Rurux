const express = require('express');
const { connectToDb } = require('./src/Config/config');
const cors = require('cors');
const { adminRouter } = require('./src/Router/admin.routes');
const { studentRouter } = require('./src/Router/student.routes');


const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.use('/adminApi', adminRouter);
app.use('/studentApi', studentRouter);


app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, async () => {
    await connectToDb();
    console.log(`Your server is running on http://localhost:${PORT}`);
});
