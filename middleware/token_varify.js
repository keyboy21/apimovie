const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-accses-token'] || req.body.token || req.query.token
    if (token) {
        jwt.verify(token, req.app.get('_api_secret_key'), (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: "Kirish mumkin emas.Token xato"
                })
            }
            else {
                req.decoded = decoded
                next()

            }
        })
    }
    else {
        res.json({
            status: false,
            message: "Token topilmadi"
        })
    }

}