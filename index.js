import express from 'express';
import mongoose from 'mongoose';

import { password, monURL } from './passwords.js';
import { registerVal, loginVal } from './validations/auth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import { register, login, me } from './controlers/UserControler.js';
import chauth from './utils/chauth.js';
import { create, getOne, getAll, deleteOne } from './controlers/DraftControler.js';
import cors from 'cors';

mongoose.connect(monURL)
.then(() => console.log('DB OK'))
.catch((err) => console.log('DB ERROR', err));

const app = express();
app.use(cors());

app.use(express.json());

app.post('/login', loginVal, handleValidationErrors, login);
app.post('/register', registerVal, handleValidationErrors, register);
app.get('/me', chauth, me);

app.post('/', chauth, create);
app.get('/:id', getOne);
app.get('/', chauth, getAll);
app.delete('/:id', chauth, deleteOne);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});