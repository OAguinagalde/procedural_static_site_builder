import htm from './htm/index.mjs';
import vhtml from './vhtml/vhtml.mjs';
import marked from './marked/marked.cjs';

const html = htm.bind(vhtml);

const md = (strings, ...args) => {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < args.length) result += args[i];
    }
    let parsed_markdown = marked.parse(result, {headerIds: false});
    // https://github.com/developit/htm/issues/226
    return html`< dangerouslySetInnerHTML=${{ __html: parsed_markdown }}></>`;
}

export { html, md };
