import {md, html} from './lib.mjs';
import {writeFile} from 'fs';

const template = ({title, tags, content}) => html`

    <h1>${title}</h1>

    <ul style="text-align: right;">
        ${
            tags.map(tag => 
                html`<li style="display: inline;"><code>${tag}</code> - </li>`
            )
        }

    </ul>

    ${content}

    ${md`Markdown inside of the \`html\` template because **why not**`}

`;

const blog = md`

    This is a blog.

    Text, text, text, ...

    \`\`\`js
    const a = 56;
    \`\`\`

    End of blog
`

const index_html = html`
    <head>
        <meta charset="utf-8"/>
        <title>Example</title>
    </head>
    <body>
        <${template} title="My Blog" tags=${["blog", "programming"]}content=${blog} />
    </body>
`;

// https://ourcodeworld.com/articles/read/1186/how-to-write-a-file-in-node-js-using-the-utf-8-encoding-with-bom
writeFile('index.html', "\ufeff" + index_html, err => {
    if (err) console.error(err);
});