const Api42 = require('42-api.js');
const { renderMd } = require('../utils/renderMd.js');
const json2md = require("json2md");
const client = new Api42({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });

async function fetchUser(req, res, splited) {
    const fetchedUser = await client.GetUserCursus(splited[2]);

    if (fetchedUser.error) return res.status(404).send({'error': 'User not found'});

    const tableCursus = () => {
        let table = {
            headers: [],
            levels: []
        };
        fetchedUser.map(cursus => {
            table.headers.push(cursus.cursus.name);
            table.levels.push(`Level: ${cursus.level}`);
        });
        return table;
    };

    const table = tableCursus();
    const md = json2md([
        { "h1": fetchedUser[0].user.displayname },
        { "p": `📧 Email: ${fetchedUser[0].user.email}` },
        { "p": `📱 Phone: ${fetchedUser[0].user.phone}` },
        { "p": `📝 Correction point: ${fetchedUser[0].user.correction_point}` },
        { "p": `💰 Wallet: ${fetchedUser[0].user.wallet}` },
        { "p": `📍 Location: ${fetchedUser[0].user.location || 'Disconnected'}` },
        { "table": {
            headers: table.headers,
            rows: [table.levels]
        }}
    ]);
    res.send(renderMd(md))
}

module.exports = {
    fetchUser
};
