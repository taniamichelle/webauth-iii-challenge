const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1d',
    };
    //bring in secret from secrets file below
    return jwt.sign(payload, secrets.jwtSecret, options);
}

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "You can checkout any time you like, but you can never leave." });
            } else {
                res.status(200).json({ message: "Bye, thanks for playing!" });
            }
        })
    } else {
        res.status(200).json({ message: "You were never here to begin with..." });
    }
});

module.exports = router;
