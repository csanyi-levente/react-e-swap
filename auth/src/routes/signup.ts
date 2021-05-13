import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Please enter a valid password')
    ], (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }


    throw new DatabaseConnectionError();

    const { email, password } = req.body;
    res.send('Hello World!');

})

export { router as signUpRouter };