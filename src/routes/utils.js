import fs from 'fs';
import * as md from '../utils/renderMd.js';

function renderUtils(req, res, name) {
    if (req.useragent.isCurl) {
        let file = fs.readFileSync(`./src/markdown/${name}.md`, 'utf-8');
        res.send(md.renderMd(file));
    } else {
        return (res.redirect('/'));
    }
}

export default renderUtils;
