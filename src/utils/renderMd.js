const md = require('marked')
const TerminalRenderer = require('cli-marked')
const fs = require('fs')
const header = fs.readFileSync(`./src/utils/header.ans`, 'utf-8')
const ansiStyles = require('ansi-colors')
const axios = require('axios')

async function replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, (match, ...args) => {
        const promise = asyncFn(match, ...args);
        promises.push(promise);
    });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
}

async function img_parser (str, optionalpart, filename) {
    return axios
    .get(optionalpart, {
        responseType: 'arraybuffer'
    })
    .then(response => `]1337;File=inline=1:${Buffer.from(response.data, 'binary').toString('base64')}\n`)
    .catch((err) => '[Image not found :/]')
}

function renderMd(file) {
    md.marked.setOptions({
        renderer: new TerminalRenderer({
            // Base
            codespan: ansiStyles.green,
            code: ansiStyles.green,
            html: ansiStyles.gray,
            listitem: ansiStyles.magenta,

            // Block
            blockquote: ansiStyles.gray.italic,
            blockquoteText: ansiStyles.dim.italic,
            table: ansiStyles.reset,
            headers: [
                ansiStyles.magenta.underline.bold,
                ansiStyles.blue.underline.bold,
                ansiStyles.yellow.underline,
                ansiStyles.green.underline,
                ansiStyles.green,
                ansiStyles.green.dim,
            ],

            // Inline
            hr: ansiStyles.dim,
            strong: ansiStyles.bold,
            em: ansiStyles.italic,
            del: ansiStyles.dim.reset.strikethrough,
            link: ansiStyles.blue,
            href: ansiStyles.blue.underline,
            // image: ansiStyles.cyan,
            doneMark: ansiStyles.green.bold,
            undoneMark: ansiStyles.red.bold,
            indent: '  ',
            smallIndent: ' ',
            },
        ),
        mangle: false,
        emoji: true,
        breaks: true,
        gfm: true,
        smartypants: false,
    })

    return (replaceAsync(
        `${header}${md.marked(file)}`,
        /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/,
        img_parser))
}

module.exports = {
    renderMd
}
