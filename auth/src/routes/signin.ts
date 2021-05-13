import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    const { email, password } = req.body;
    res.send('Hello World!');
})

export { router as signInRouter };