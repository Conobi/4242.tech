const express = require('express')
const path = require('path')
const useragent = require('express-useragent')
const fs = require('fs')
const morgan = require('morgan')
const settings = require('./settings')
const { renderMd } = require('./utils/renderMd')
const app = express()

const router = require('./routes/router')

const createServer = () => {

    // Load views && express settings
    app.locals = {
        ...settings,
    }
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, '/views'))
    app.use(express.static(path.join(__dirname, '/public')))
    // app.disable('view cache'); // Debug
    app.use(useragent.express()); // Init user agent for rendering purposes (e.g. curl or browser)
    app.use(morgan('tiny')); // HTTP request logger

    app.use((req, res, next) => {
        res.locals.path = req.path; // Set the path of request to use in template
        next()
    })

    // Router
    app.get('/404', async (req, res) => {
        if (req.useragent.isCurl) {
            let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8')
            res.send(await renderMd(file))
        } else {
            res.status(404).render('404.pug', { pageTitle: '404' })
        }
    })

    app.use('*', router)

    return app
}

module.exports = { createServer }
