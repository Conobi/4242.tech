import * as md from 'marked';
import TerminalRenderer from 'cli-marked';
import fs from 'fs';

let header = fs.readFileSync(`./src/utils/header.ans`, 'utf-8');
function renderMd(file) {
    md.marked.setOptions({
      renderer: new TerminalRenderer()
    });

    return(`${header}${md.marked(file)}`);
}

export { renderMd };
