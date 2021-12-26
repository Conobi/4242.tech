import fs from 'fs';

function renderUtils(req, res, name) {

    if (req.query.json === 'true') {
        let file = fs.readFileSync(`./src/json/${name}.json`, 'utf-8');
        res.json(JSON.parse(file));
    } else {
        if (req.useragent.isCurl) {
            let file = fs.readFileSync(`./src/markdown/${name}.md`, 'utf-8');
            res.send(file);
        } else {
            return (res.redirect('/'));
        }
    }
}

export default renderUtils;
