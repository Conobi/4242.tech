const express = require('express');
const { docsCurl, docsBrowser } = require ('./docs');
const { funCurl } = require ('./fun');
const { fetchUser } = require ('./api');
const { fetchBusSchedule } = require ('./bus');
const router = express.Router();

router.get('/', async (req, res) => {
    const splited = res.locals.path.split('/');

    if (req.useragent.isCurl) {
        if (splited[1] === 'f') return funCurl(req, res, splited);
        if (splited[1] === 'user') return fetchUser(req, res, splited);
        if (splited[1] === 'bus') return fetchBusSchedule(req, res, splited);
        docsCurl(req, res, splited);
    } else {
        docsBrowser(req, res, splited);
    }
});

module.exports = router;
