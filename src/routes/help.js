import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.json === 'true') {
        let file = fs.readFileSync(`./src/json/help.json`, 'utf-8');
        res.json(JSON.parse(file));
    } else {
        if (req.useragent.isCurl) {
            let file = fs.readFileSync(`./src/markdown/help.md`, 'utf-8');
            res.send(file);
        } else {
            res.render('help', { pageTitle: 'Documentation' });
        }
    }
});

export default router;
