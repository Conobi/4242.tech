import express from 'express';
import fs from 'fs';
import renderTemplate from '../utils/templateRender.js';
import * as md from '../utils/renderMd.js';
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.useragent.isCurl) {
        let file = fs.readFileSync(`./src/markdown/help.md`, 'utf-8');
        res.send(md.renderMd(file));
    } else {
        if (!req.isAuthenticated()) res.redirect('/login');
        renderTemplate(res, req, 'account', 'Account');
    }
});

export default router;
