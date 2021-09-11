const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send({
        text: 'test'
    })
})

router.use('/auth', require('./auth'));
router.use('/api', require('./api'));

module.exports = router;