const fs = require('fs');
const express = require('express');
const path = require('path');
const renderMd = require('../utils/renderMd.js');
const renderFun = require('./fun.js');
const router = express.Router();

router.get('/', async (req, res) => {
    const splited = res.locals.path.split('/');
    if (splited[1] === 'f' && splited[2] === 'waifu') return renderFun(req, res, splited[2]);
    if (req.useragent.isCurl) {
        if (fs.existsSync(`./src/markdown${res.locals.path}.md`)) {
            let file = fs.readFileSync(`./src/markdown${res.locals.path}.md`, 'utf-8');
            res.send(renderMd(file));
        } else {
            let file = fs.readFileSync(`./src/markdown/help.md`, 'utf-8');
            res.send(renderMd(file));
        }
    } else {
        let data;
        if (res.locals.path === '/') {
            data = {
                "template": '/index',
                "pageTitle": 'Home'
            }
        } else {
            data = {
                "template": res.locals.path,
                "pageTitle": splited[splited.length - 1].charAt(0).toUpperCase() + splited[splited.length - 1].slice(1) // Capitalize first letter of endpoint to display as siteTitle
            }
        }
        if (fs.existsSync(`./src/views${data.template}.pug`)) {
            res.render(path.resolve(`./src/views${data.template}.pug`), { pageTitle: data.pageTitle });
        } else {
            res.redirect('/404');
        }
    }
});

module.exports = router;
