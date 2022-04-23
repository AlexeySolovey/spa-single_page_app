const fs = require('fs');
const jwt = require('jsonwebtoken');

const db = JSON.parse(fs.readFileSync(`${__dirname}/../database.json`));

exports.getAllProducts = (req, res) => {
    try {
        const verificationToken = jwt.verify(req.params.token, 'secret', (error, decoded) => {
            if(!error) {
                return decoded;
            }
        });

        if(!verificationToken) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }

        const products = db.products;

        if(!products) {
            return res.status(401).json({
                status: 'fail',
                message: 'There are no products.'
            });  
        }

        res.status(200).json({
            status: 'success',
            products
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong with getting on the products.'
        })
    }
}