const fs = require('fs')
const { renderMd } = require('./renderMd')

async function throw404(req, res) {
	if (req.useragent.isCurl) {
		let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8')
		return res.send(await renderMd(file, req))
	} else if (req.query.json) {
		return res.json({error: '404'})
	} else {
		res.status(404).render('404.pug', {
			props: {
				title: "404",
				helpDesc: "The page you are searching for doesn't exist."
			}
		})
	}
}

module.exports = {
    throw404
}
