const md = require('marked');
const TerminalRenderer = require('cli-marked');
const fs = require('fs');
const header = fs.readFileSync(`./src/utils/header.ans`, 'utf-8');

function renderMd(file) {
    md.marked.setOptions({
        renderer: new TerminalRenderer(),
        mangle: false,
        emoji: true,
        breaks: false,
        gfm: true,
        smartypants: false
    });

    return(`${header}${md.marked(file)}`);
}

module.exports = {
    renderMd
};
