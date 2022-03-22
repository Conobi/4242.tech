const axios = require('axios')
const { renderMd } = require('../utils/renderMd')
const { throw404 } = require('../utils/throw404')
const settings = require('../settings')

// Fetch Github API
async function apiFetch(url) {
	return axios
	.get(url)
	.then(response => response.data)
	.catch((err) => 'rip')
}

async function fetchChecklists(req, res, splited) {
	const data = await apiFetch('https://api.github.com/repos/mharriso/school21-checklists/git/trees/master')
	if (!data.tree)
		return throw404(req, res)
	let fileList = data.tree.map(x => x['path'])
	let md = `# List of all evaluation subjects
We share these from the [mharriso's repo school21-checklists](https://github.com/mharriso/school21-checklists).
Feel free to contribute to it.
**\`Warning:\`** *These subjects are often updated by 42 pedago, these pages might be outdated.*
*Tip: You can search for a subject by typing \n\`curl 4242.tech/checklists/<part of the project name>\`*
## Subject list:
`
	const rawLink = 'https://raw.githubusercontent.com/mharriso/school21-checklists/master/'
	if (typeof splited[2] !== 'undefined' && fileList.includes(splited[2]))
		return res.redirect(rawLink + splited[2])
	else if (typeof splited[2] !== 'undefined' && !fileList.includes(splited[2]))
	{
		let fileListbak = fileList
		fileList = []
		fileListbak.map((key) => {
			if (key.includes(splited[2]))
				fileList.push(key)
		})
	}
	// md.push(
	// 	{ h1: 'List of all the evaluation subjects'},
	// 	{ p: [
	// 		'We share these from ',
	// 		{
	// 		[{ title: 'mharriso\'s repo school21-checklists', source: 'https://github.com/mharriso/school21-checklists'}]
	// 		]
	// 	})
	if (!fileList.length)
		return throw404(req, res)
	const redirLink = 'https://4242.tech/checklists/'
	fileList.forEach(element => {
		let link = redirLink + encodeURIComponent(element).replace(/'/g, "%27")
		md += `- **${element.replace(/\.[^/.]+$/, '')}**: \n\t- [${link}](${link})\n`
	})
	if (req.useragent.isCurl)
		res.send(await renderMd(md, req))
	else
		res.render('md.pug', { props: settings.utils['checklists'], md: await renderMd(md, req)})
}

module.exports = {
    fetchChecklists
}
