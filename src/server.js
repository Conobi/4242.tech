import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import useragent from 'express-useragent';
import fs from 'fs';
fs.readdir.promises;
import url from 'url';
import passport from 'passport';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import FortyTwoStrategy from 'passport-42'
import settings from './settings.js'
import * as md from './utils/renderMd.js';
const __dirname = path.resolve();
const app = express();
const MemoryStore = createMemoryStore(session);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

//42 Strategy
passport.use(new FortyTwoStrategy({
    clientID: process.env.UID,
    clientSecret: process.env.SECRET,
    callbackURL: `${process.env.BASE_URL}/login/callback`,
    profileFields: {
        'id': function (obj) { return String(obj.id); },
        'username': 'login',
        'displayName': 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
        'profileUrl': 'url',
        'emails.0.value': 'email',
        'phoneNumbers.0.value': 'phone',
        'photos.0.value': 'image_url'
      }
},
(accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));
}));

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
import indexRouter from './routes/index.js';
import helpRouter from './routes/help.js'
import badRouter from './routes/404.js';
import accountRouter from './routes/account.js';
import renderUtils from './routes/utils.js'
import renderFun from './routes/fun.js'

const createServer = () => {

    // Load views && express settings
    app.locals = {
        ...settings,
    };
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '/src/views'));
    app.use(express.static(path.join(__dirname, '/src/public')));
    app.disable('view cache');
    app.use(useragent.express());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        res.locals.path = req.path;
        next();
    });

    // Router
    app.get('/statut', (req, res) => {
        res.status(200).send('alive\n');
    });

    app.use('/', indexRouter);
    app.use('/404', badRouter);
    app.use('/help', helpRouter);
    app.use('/account', accountRouter);

    app.get('/login', (req, res, next) => {
        if (req.session.backURL) {
            req.session.backURL = req.session.backURL;
        } else if (req.headers.referer) {
            const parsed = url.parse(req.headers.referer);
            if (parsed.hostname === app.locals.domain) {
                req.session.backURL = parsed.path;
            }
        } else {
            req.session.backURL = "/";
        }

        next();
    },
    passport.authenticate('42'));

    app.get('/login/callback', passport.authenticate('42', { failureRedirect: "/" }), (req, res) => {
        if (req.session.backURL) {
            const url = req.session.backURL;
            req.session.backURL = null;
            res.redirect(url);
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(() => {
            req.logout();
            res.redirect('/');
        });
    });

    const mdEndpoints = [];
    const getAllFiles = (dirPath, arrayOfFiles) => {
        let files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];
        files.forEach((file) => {
            if (fs.statSync(dirPath + '/' + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
            } else {
                arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
            }
        });
        return arrayOfFiles;
    }

    function result() {
        getAllFiles('./src/markdown').forEach((f) => {
            if (path.extname(f) === '.md') {
                let newFile = f.replace(`${path.join(__dirname, '/src/markdown/')}`, '').replace(/\.[^/.]+$/, '');
                mdEndpoints.push(newFile);
            }
        });
    }
    result()

    const endpoints = mdEndpoints.join('|');
    console.log(endpoints);

    app.get(`/:name(${endpoints})`, function(req, res) {
        let name = req.params.name;
        renderUtils(req, res, name);
    });

    app.get('/:name(waifu)?', (req, res) => {
        let name = req.params.name;
        renderFun(req, res, name);
    });


    app.get('*', (req, res) => {
        if (req.useragent.isCurl) {
            let file = fs.readFileSync(`./src/markdown/404.md`, 'utf-8');
            res.send(md.renderMd(file));
        } else {
            res.redirect('/404');
        }
    });

    return app;
};
export { createServer };
