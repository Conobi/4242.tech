const path = require('path')
const { renderMd } = require('../utils/renderMd')
const settings = require('../settings')

async function helpRenderer(req, res, splited) {
	if (!req.useragent.isCurl)
		return res.render(path.resolve(`./src/views/help.pug`), { props: settings.docs['/help']})
	let md = `
Welcome on **42.kiyo.ooo**! Here is the list of the available commands:

\`42.kiyo.ooo\`
`
	Object.keys(settings.docs).map((page, index) => {
		let prefix = '├── '
		md += `${prefix}\`/${settings.docs[page].helpEndpoint}\` - *${settings.docs[page].helpDesc}*\n`
	})
	Object.keys(settings.utils).map((page, index) => {
		let prefix = (index != Object.keys(settings.utils).length - 1) ? '├── ' : '└── '
		md += `${prefix}\`/${settings.utils[page].helpEndpoint}\` - *${settings.utils[page].helpDesc}*\n`
	})
	return res.send(await renderMd(md, req))
}

module.exports = {
    helpRenderer
}
