import htm from './htm/index.mjs';
import vhtml from './vhtml/vhtml.mjs';
import marked from './marked/marked.cjs';

const html = htm.bind(vhtml);

const calc_offset = (str) => {
    let white_characters = 0;
    const len = str.length;
    for (let i = 0; i < len; i++) {
        const c = str[i];
        if (c === '\n') {
            white_characters = 0;
        }
        else if (c === ' ') {
            white_characters++;
        }
        else {
            return white_characters;
        }
    }
    // no characters found, only white spaces
    return 0;
}

/**
 * usage example:
 * 
 *     const result = md`# Some Header\nHello there **this** \`is\` a paragraph`
 *     console.log(Bun.inspect(result));
 *     // "<h1>Some Header</h1>\n<p>Hello there <strong>this</strong> <code>is</code> a paragraph</p>\n"
 * 
 * `md` will also trim regular whitespaces that indent the whole markdown block, allowing them to be indented same as
 * regular code in the scope where they are placed. It allows to write the markdown blocks like this...
 * 
 *     md`
 *         # Title
 *         some paragraph
 *     `
 *
 * rather than this...
 * 
 *     md`
 *     # Title
 *     some paragraph
 *     `
 * 
 * and still render properly
 */
const md = (strings, ...args) => {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < args.length) result += args[i];
    }
    const offset = calc_offset(result);
    if (offset > 0) {
        let replacement = "\n";
        for (let i = 0; i < offset; i++) replacement += " ";
        result = result.replaceAll(replacement, "\n", );
    }
    let parsed_markdown = marked.parse(result, {headerIds: false});
    // https://github.com/developit/htm/issues/226
    return html`< dangerouslySetInnerHTML=${{ __html: parsed_markdown }}></>`;
}

export { html, md };
