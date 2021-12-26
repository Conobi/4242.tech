import fs from 'fs';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.json === 'true') {
        res.json({ "statut": "alive" });
    } else {
        if (req.useragent.isCurl) {
            let file = fs.readFileSync(`./src/markdown/help.md`, 'utf-8');
            res.send(file);
        } else {
            return (res.render('index', { pageTitle: 'Home' }));
        }
    }
});

export default router;
