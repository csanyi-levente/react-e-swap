import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Please enter a valid password')
    ],
    async (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email address already taken!');
    }

    const user = User.build({ email, password});

    const userToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);

    req.session = {
        jwt: userToken
    };

    await user.save();

    res.status(201).send({user});
})

export { router as signUpRouter };