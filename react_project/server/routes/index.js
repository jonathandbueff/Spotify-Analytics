const Router = require('express').Router;
const router = Router();

const api = require('./api');
const login = require('./login');
const callback = require('./callback');

router.use('/api', api);
router.use('/callback', callback);
router.use('/login', login);

router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;
