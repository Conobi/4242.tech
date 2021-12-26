import express from 'express';
import path from 'path';
import useragent from 'express-useragent';
import fs from 'fs';
import settings from './settings.js'
const __dirname = path.resolve();
const app = express();

// Routes
import indexRouter from './routes/index.js';
import helpRouter from './routes/help.js'
import badRouter from './routes/404.js';
import renderUtils from './routes/utils.js'
import renderFun from './routes/fun.js'

const createServer = () => {

    // Load views && express settings
    app.locals = {
        ...settings,
    };
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './src/views'));
    app.use(express.static(path.join(__dirname, './src/public')));
    app.disable('view cache');
    app.use(express.json());
    app.use(useragent.express());
    app.use(express.urlencoded({ extended: false }));

    app.use(function (req, res, next) {
        res.locals.path = req.path;
        next();
    });

    // Router
    app.get('/statut', (req, res) => {
        res.status(200).send('alive\n');
    });

    app.use('/', indexRouter);
    app.use('/help', helpRouter);
    app.use('/404', badRouter);

    app.get('/:name(int|ctypes)?', (req, res) => {
        let name = req.params.name;
        renderUtils(req, res, name);
    });

    app.get('/:name(waifu)?', (req, res) => {
        let name = req.params.name;
        renderFun(req, res, name);
    });


    app.get('*', (req, res) => {
        if (req.query.json === 'true') {
            res.json({ "error": "404 Not Found" });
        } else {
            if (req.useragent.isCurl) {
                let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8');
                res.send(file);
            } else {
                res.redirect('/404');
            }
        }
    });

    return app;
};
export { createServer };
