import fs from 'fs';
import express from 'express';
import renderTemplate from '../utils/templateRender.js';
import * as md from '../utils/renderMd.js';
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.useragent.isCurl) {
        let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8');
        res.send(md.renderMd(file));
    } else {
        renderTemplate(res, req, '404', '404 Not found');
    }
});

export default router;
