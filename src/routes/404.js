import fs from 'fs';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.json === 'true') {
        res.json({ "error": "404 Not Found" });
    } else {
        if (req.useragent.isCurl) {
            let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8');
            res.send(file);
        } else {
            return (res.render('404', { pageTitle: '404 Not found' }));
        }
    }
});

export default router;
