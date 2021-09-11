const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');

const secret = require('../config/keys').secret;

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashCost = 10;

    console.log('test1');

    try {
        const passwordHash = await bcrypt.hash(password, hashCost);
        const userDocument = new UserModel({ username, passwordHash });
        await userDocument.save();

        console.log('test2');

        res.status(200).send({username});
    } catch(error) {
        res.status(400).send({
            error: 'Something wrong',
        })
    }
});

router.post('/login', (req, res, done) => {
    console.log('login');
    passport.authenticate(
        'local',
        { session: false },
        (error, user) => {
            if (error || !user) {
                console.log('asdfasdf')
                return res.status(400).send({ error: 'teste' });
            }

            const payload = {
                username: user.username,
                expires: Date.now() + 100000,
            };
            
            req.login(payload, {session: false}, (error) => {
                if (error) {
                    res.send(400).send({ error });
                }

                const token = jwt.sign(JSON.stringify(payload), secret);

                res.cookie('jwt', token, { httpOnly: true, secure: true});
                res.status(200).send({ token });
            });
        }
    )(req, res, done);
});

module.exports = router;