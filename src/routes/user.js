const Api42 = require('42-api.js')
const { renderMd } = require('../utils/renderMd')
const json2md = require('json2md')
const fs = require('fs')
const axios = require('axios')
const client = new Api42({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET })

async function fetchUser(req, res, splited) {
    const fetchedUser = await client.GetUserCursus(splited[2])

    if (fetchedUser.error && req.query.json)
        return res.status(404).send({'error': 'User not found'})
    else if (fetchedUser.error)
    {
        let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8')
        return res.send(await renderMd(file))
    }
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

    fetchedUser[0].blackhole_days = ((Date.parse(fetchedUser[0].blackholed_at) - Date.now()) / 86400000).toFixed(1)
    if (fetchedUser[0].blackhole_days > 0)
        bh_printer = `🕳 Days until blackhole: ${fetchedUser[0].blackhole_days}`
    else
       bh_printer = `🕳 Finished the cursus since: ${fetchedUser[0].blackhole_days * -1} days`

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
        { table: {
            headers: table.headers,
            rows: [table.levels]
        }}
    ])
    if (req.query.json)
        res.json(fetchedUser[0])
    else
        res.send(await renderMd(md))
}

module.exports = {
    fetchUser
}
