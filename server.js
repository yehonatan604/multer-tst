import express from 'express';
const app = express();
import cors from 'cors';

import env from 'dotenv';
import auth from './mw/auth.js';
import { uploadFile } from './mw/upload.js';
import { getFile } from './services/AccessData.service.js';

env.config();
const { PORT } = process.env;

app.use(cors())

app.get('/', auth, (req, res) => {
    res.send('Hello World');
});

app.post('/upload/:path', auth, uploadFile, (req, res) => {
    console.log('File uploaded');
    console.log(req.file.destination);

    res.send('File uploaded');
});

app.get("/:path/:filename", auth, async (req, res) => {
    try {
        const item = await getFile(
            req.user.companyId,
            req.params.path,
            req.params.filename
        );
        if (!item) {
            return res.status(404).json({ error: "File not found" });
        }
        return res.send(item);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});