const md = require('marked');
const TerminalRenderer = require('cli-marked');
const fs = require('fs');

let header = fs.readFileSync(`./src/utils/header.ans`, 'utf-8');
function renderMd(file) {
    md.marked.setOptions({
        renderer: new TerminalRenderer()
    });

    return(`${header}${md.marked(file)}`);
}

module.exports = renderMd;
