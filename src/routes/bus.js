const superagent = require('superagent')
const json2md = require('json2md')
const { renderMd } = require('../utils/renderMd')
const { throw404 } = require('../utils/throw404')
const settings = require('../settings')


// Format date for API request (YYYYMMDDTHHMMSS)
function formatApiDate(date) {
    const month = () => {
        let month = date.getMonth() + 1
        if (month < 10) return `0${month}`
        return month
    }

    const day = () => {
        let day = date.getDate()
        if (day < 10) return `0${day}`
        return day
    }

    const hours = () => {
        let hours = date.getHours()
        if (hours < 10) return `0${hours}`
        return hours
    }

    const minutes = () => {
        let minutes = date.getMinutes()
        if (minutes < 10) return `0${minutes}`
        return minutes
    }

    const seconds = () => {
        let seconds = date.getSeconds()
        if (seconds < 10) return `0${seconds}`
        return seconds
    }

    return `${date.getFullYear()}${month()}${day()}T${hours()}${minutes()}${seconds()}`
}

// Get current time in HH:MM format
function formatDate(date) {
    let _date = date.slice(9)

    let hour = _date.slice(0, 2)
    let minute = _date.slice(2, 4)
    return `${hour}:${minute}`

}

// Fetch tcl API
async function apiFetch(date, options) {
    return new Promise(async (resolve, reject) => {
        superagent
            .get(`https://carte.tcl.fr/api/schedules?${options}&date=${date}`)
            .set({ 'Referer': 'tcl.fr' })
            .set('accept', 'json')
            .end((err, res) => {
                // if (err) return
                if (res.statusCode != 200) return resolve({
                    'error': res.status
                })
                resolve(res.body)
            })
    })
}

async function fetchBusSchedule(req, res, splited) {
    const date = formatApiDate(new Date())
    // Get schedules for Gorge de loup -> Campus
    const gc = await apiFetch(date, `stop=stop_point:tcl:SP:39474&route=route:tcl:86-F`)
    // Get schedules for Campus -> Gorge de loup
    const cg = await apiFetch(date, `stop=stop_point:tcl:SP:2010&route=route:tcl:86-B`)

    if (gc.error || cg.error)
        return throw404(req, res)

    // Get all schedules for the given stop point
    const schedules = (data) => {
        let rows = []
        data.map(item => {
            rows.push(formatDate(item.date_time))
        })
        return rows
    }

    // Parse data to get [['a', 'b'], ['a', 'b']] format
    const finalRows = () => {
        const gcRows = schedules(gc)
        const cgRows = schedules(cg)

        let finalRows = []
        for (i = 0; i < (cgRows.length > gcRows.length ? cgRows.length : gcRows.length); i++) {
            let _1 = gcRows[i] ? gcRows[i] : '-'
            let _2 = cgRows[i] ? cgRows[i] : '-'
            finalRows.push([_1, _2])
        }
        return finalRows
    }

    const md = json2md([
        { "h1": `Bus 86` },
        { "p": `🚌 Schedule for ${new Date().toLocaleTimeString('fr', { hour: 'numeric', minute: 'numeric'})}` },
        { "table": {
            headers: ['Gorge de loup -> Campus', 'Campus -> Gorge de loup'],
            rows: finalRows()
        }}
    ])
    if (req.useragent.isCurl)
        res.send(await renderMd(md, req))
    else if (req.query.json)
        res.json({
            '86': {
                'Gorge de loup -> Campus': schedules(gc),
                'Campus -> Gorge de loup': schedules(cg),
            }
        })
    else
        res.render('md.pug', { props: settings.utils['bus86'], md: await renderMd(md, req)})}

module.exports = {
    fetchBusSchedule
}
