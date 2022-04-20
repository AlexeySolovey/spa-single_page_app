const fs = require('fs');
const jwt = require('jsonwebtoken');

const db = JSON.parse(fs.readFileSync(`${__dirname}/../database.json`));

exports.signup = (req, res) => {

    const user = db.find(el => el.email === req.body.email);
    if(user) {
        return res.status(401).json({
            status: 'fail',
            message: 'User with given email already exist.'
        });
    }

    const newUser = ({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    db.push(newUser);

    fs.writeFile(`${__dirname}/../database.json`, JSON.stringify(db), err => {
        const token = jwt.sign({id: newUser.id}, 'secret', {
            expiresIn: '30d'
        });

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    });
}

exports.login = (req, res) => {

    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password'
        })
    }
    
    const user = db.find(el => el.email === req.body.email);

    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'User with given email does not exist.'
        });
    };

    const userPassword = db.find(el => el.password === req.body.password);

    if (!userPassword) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect password.'
        });
    };

    const token = jwt.sign({id: user.id}, 'secret', {
        expiresIn: '30d'
    });

    res.status(200).json({
        status: 'success',
        token
    })
}