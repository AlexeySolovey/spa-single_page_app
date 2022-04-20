const express = require('express');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('SPA');
});

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
});