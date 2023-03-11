import { body } from "express-validator";

export const registerVal = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password less than 6 characters').isLength({ min: 5}),
    body('fullName', 'Enter your name').isLength({ min: 3}),
    body('avatarUrl', 'Invalid link').optional().isURL(),
];

export const loginVal = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password less than 6 characters').isLength({ min: 5}),
];