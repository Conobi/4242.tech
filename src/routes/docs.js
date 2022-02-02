const fs = require('fs');
const path = require('path');
const { renderMd } = require('../utils/renderMd.js');

function docsCurl(req, res, splited) {
    if (splited[splited.length - 1] === '') _path = splited.slice(0, splited.length - 1).join('/');
    else _path = res.locals.path;

    if (fs.existsSync(`./src/markdown${_path}.md`)) {
        let file = fs.readFileSync(`./src/markdown${_path}.md`, 'utf-8');
        res.send(renderMd(file));
    } else {
        let file = fs.readFileSync(`./src/markdown/help.md`, 'utf-8');
        res.send(renderMd(file));
    }
}

function docsBrowser(req, res, splited) {
    if (splited[splited.length - 1] === '') {
        _path = splited.slice(0, splited.length - 1).join('/');
        _name = splited[splited.length - 2];
        console.log('name' + _name)
    } else {
        _path = res.locals.path;
        _name = splited[splited.length - 1];
    }

    if (res.locals.path === '/') {
        data = {
            "template": '/index',
            "pageTitle": 'Home'
        }
    } else {
        data = {
            "template": _path,
            // Capitalize first letter of endpoint to display as siteTitle
            "pageTitle": _name.charAt(0).toUpperCase() + _name.slice(1)
        }
    }
    console.log(_path)
    if (fs.existsSync(`./src/views${data.template}.pug`)) {
        res.render(path.resolve(`./src/views${data.template}.pug`), { pageTitle: data.pageTitle });
    } else {
        res.redirect('/404');
    }
}

module.exports = {
    docsCurl,
    docsBrowser
};
