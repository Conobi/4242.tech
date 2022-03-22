const express = require('express')
const path = require('path')
const { docs } = require ('./routes/docs')
const { fetchUser } = require ('./routes/user')
const { fetchBusSchedule } = require ('./routes/bus')
const { fetchChecklists } = require ('./routes/checklists')
const { helpRenderer } = require ('./routes/help')
const router = express.Router()

router.get('/', async (req, res) => {
    const splited = res.locals.path.split('/')

    if (!req.useragent.isCurl && splited[1] === '') {
            return res.render(path.resolve(`./src/views/index.pug`), {
                props: {
                    title: "Home",
                    helpDesc: "Your favorites cheatsheets for 42 school!"
                }
            })
    }
    if (req.useragent.isCurl && splited[1] == '')
        splited[1] = 'help'
    switch (splited[1]) {
        case 'help':
            return helpRenderer(req, res, splited)
        case 'checklists':
            return fetchChecklists(req, res, splited)
        case 'user':
            return fetchUser(req, res, splited)
        case 'bus':
            return fetchBusSchedule(req, res, splited)
        default:
            return docs(req, res, splited)
    }
})

module.exports = router
