const Api42 = require('42-api.js')
const json2md = require('json2md')
const { renderMd } = require('../utils/renderMd')
const { throw404 } = require('../utils/throw404')
const settings = require('../settings')
const client = new Api42({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET })

function logtimeMonth(logtime) {
    const re = new RegExp((new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)) + '-[0-9]{2}')
    // const logtimeLastMonth = Object.keys(logtime).filter(day => re.test(day))
    const logtimeSeconds = Object.keys(logtime).map((key) => {
        if (re.test(key)) {
            let split = logtime[key].split(':')
            return parseInt(split[0]) * 3600 + parseInt(split[1]) * 60 + parseInt(split[2])
        }
        return 0
    })
    return logtimeSeconds.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) / 3600
}

function logtimeDay(logtime) {
    const date = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + new Date().getDate()
    // const logtimeLastMonth = Object.keys(logtime).filter(day => re.test(day))
    const logtimeSeconds = Object.keys(logtime).map((key) => {
        if (key == date) {
            let split = logtime[key].split(':')
            return parseInt(split[0]) * 3600 + parseInt(split[1]) * 60 + parseInt(split[2])
        }
        return 0
    })
    return logtimeSeconds.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) / 3600
}

function mandatLogtime(year, month) {
    return (
        new Array(32 - new Date(year, month, 32).getDate())
        .fill(1)
        .filter(
            (id, index) =>
                [0, 6].indexOf(
                    new Date(year, month, index + 1).getDay()) === -1
                ).length
        ) * 7
}

async function fetchUser(req, res, splited) {
    const fetchedUser = await client.GetUserCursus(splited[2])

    if (fetchedUser.error && req.query.json)
        return res.status(404).send({'error': 'User not found'})
    else if (fetchedUser.error)
        return throw404(req, res)
    fetchedUser[0].user.logtime = await client.GetUserLocationStats(splited[2])

    const tableCursus = () => {
        let table = {
            headers: [],
            levels: []
        }
        fetchedUser.map(cursus => {
            table.headers.push(cursus.cursus.name)
            table.levels.push(`Level: ${cursus.level.toFixed(2)}`)
        })
        return table
    }
    fetchedUser[0].logtime_month = logtimeMonth(fetchedUser[0].user.logtime)
    fetchedUser[0].logtime_day = logtimeDay(fetchedUser[0].user.logtime)
    fetchedUser[0].logtime_todo = mandatLogtime(new Date().getFullYear(), new Date().getMonth())
    fetchedUser[0].logtime_ratio = fetchedUser[0].logtime_month / fetchedUser[0].logtime_todo * 100
    // console.log([new Date().getFullYear(), new Date().getMonth()])
    fetchedUser[0].blackhole_days = ((Date.parse(fetchedUser[0].blackholed_at) - Date.now()) / 86400000)
    if (fetchedUser[0].blackhole_days === NaN)
        bh_printer = `🕳 No blackhole, not a student`
    else if (fetchedUser[0].blackhole_days > 0)
        bh_printer = `🕳 Days until blackhole: ${fetchedUser[0].blackhole_days.toFixed(2)}`
    else
       bh_printer = `🕳 Finished the cursus since: ${(fetchedUser[0].blackhole_days * -1).toFixed(2)} days`
    const table = tableCursus()
    const md = json2md([
        { img:
            [{ title: fetchedUser[0].user.displayname, source: `https://cdn.intra.42.fr/users/medium_${fetchedUser[0].user.login}.jpg` }]
        },
        { h1:
            { link:
                [{ title: fetchedUser[0].user.displayname, source: `https://profile.intra.42.fr/users/${fetchedUser[0].user.login}`}]
            }
        },
        { p: `📧 Email: ${fetchedUser[0].user.email}` },
        { p: `📱 Phone: ${fetchedUser[0].user.phone}` },
        { p: `📝 Correction point: ${fetchedUser[0].user.correction_point}` },
        { p: `💰 Wallet: ${fetchedUser[0].user.wallet}` },
        { p: `📍 Location: ${fetchedUser[0].user.location || 'Disconnected'}` },
        { p: `📆 Pool: ${fetchedUser[0].user.pool_month + " " + fetchedUser[0].user.pool_year}` },
        { p: bh_printer },
        { p: `⌚️ Logtime of current month: ${fetchedUser[0].logtime_month.toFixed(1) + ' h / ' + fetchedUser[0].logtime_todo} h (${fetchedUser[0].logtime_ratio.toFixed(1)}%)`},
        { p: `⌚️ Today's logtime: ${fetchedUser[0].logtime_day.toFixed(1)}h` },
        { table: {
            headers: table.headers,
            rows: [table.levels]
        }}
    ])
    if (req.useragent.isCurl)
        res.send(await renderMd(md, req))
    else if (req.query.json)
        res.json(fetchedUser[0])
    else
        res.render('md.pug', { md: await renderMd(md, req), props: settings.utils['user']})
}

module.exports = {
    fetchUser
}
