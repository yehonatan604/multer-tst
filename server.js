import express from 'express';
const app = express();
import cors from 'cors';

import env from 'dotenv';
import auth from './mw/auth.js';
import { uploadFile } from './mw/upload.js';

env.config();
const { PORT } = process.env;

app.use(cors())

app.get('/', auth, (req, res) => {
    res.send('Hello World');
});

app.post('/upload/:path', auth, uploadFile, (req, res) => {
    console.log('File uploaded');
    res.send('File uploaded');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});