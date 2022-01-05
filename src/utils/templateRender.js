import path from 'path';

const renderTemplate = (res, req, template, title, data = {}) => {
    const baseData = {
        query: req.query,
        user: req.isAuthenticated() ? req.user : null,
        pageTitle: title
    };
    res.render(path.resolve(`./src/views/${template}.pug`), Object.assign(baseData, data));
};

export default renderTemplate;
