const express = require('express')
const path = require('path')
const useragent = require('express-useragent')
const morgan = require('morgan')
const settings = require('./settings')
const router = require('./router')
const { throw404 } = require('./utils/throw404')
const app = express()

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
        throw404(req, res)
    })

    app.use('*', router)

    return app
}

module.exports = { createServer }
