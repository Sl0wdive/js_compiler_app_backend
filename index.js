import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { password, monURL } from './passwords.js';
import { registerVal, loginVal } from './validations/auth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import { register, login } from './controlers/UserControler.js';
import chauth from './utils/chauth.js';
import { create, getOne } from './controlers/DraftControler.js';

mongoose.connect(monURL)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.post('/login', loginVal, handleValidationErrors, login);
app.post('/register', registerVal, handleValidationErrors, register);

app.post('/', chauth, create);
app.get('/', getOne);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});