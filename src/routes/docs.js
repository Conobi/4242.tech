const fs = require('fs')
const { renderMd } = require('../utils/renderMd')
const { throw404 } = require('../utils/throw404')
const settings = require('../settings')

async function docs(req, res, splited) {
    let _path

    if (splited[splited.length - 1] === '')
        _path = splited.slice(0, splited.length - 1).join('/')
    else
        _path = res.locals.path
    if (_path === '/')
        _path = '/help'

    const fileExists = Object.keys(settings.docs).includes(_path) && fs.existsSync(`./src/markdown${_path}.md`)
    if (!fileExists || (!req.useragent.isCurl && !settings.docs[_path].web))
        return throw404(req, res)
    const file = fs.readFileSync(`./src/markdown${_path}.md`, 'utf-8')

    if (req.useragent.isCurl)
        res.send(await renderMd(file, req))
    else
        res.render('md.pug', {
            props: settings.docs[_path],
            md: await renderMd(file, req)
        })
}

module.exports = {
    docs
}
