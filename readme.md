# What is this

The idea is to write simple static websites using `html`, `js`, and `markdown` procedurally in a single .js file, using `html` and `md` functions exported in `lib.mjs`.

Example:

```js
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
```

Build the website with `bun example.js`.

# htm

`htm` by itself just "traverses" javascript template literals (`` html`<p>some html stuff</p>` ``), parses it and then calls the binded (on line 6: `const html = htm.bind(vhtml);`) function for each triplet `(tag_type, tag_properties, ...children)` parsed. here is an example:

```js
import htm from 'htm';

function h(type, props, ...children) {
    return { type, props, children };
}

const html = htm.bind(h);

console.log( html`<h1 id=hello>Hello world!</h1>` );
// {
//   type: 'h1',
//   props: { id: 'hello' },
//   children: ['Hello world!']
// }
```

# vhtml

`vhtml` is a function with a signature `function (tag_type, tag_properties, ...children) -> string`. The string returned is the valid `html` string that represents the input triplet.

Combining **htm** and **vhtml** we can parse and render (here "render" means to print valid html code) pseudo-html code.

```js
const what = "world";
document.body.innerHTML = html`<h1>Hello ${world}!</h1>`
```

The `vs-code` plugin `lit-html` provides syntax highlighting for html inside `js` files.

# md

`md` uses `marked` to parse `markdown` and then returns a valid `html` representation of the `markdown` text.

# bun

Currently it only works with `bun` because I have no clue how to make `node` happy and `bun` is ok with everything.

# TODO

* make a better example
* allow markdown literals to be indented without losing formatting
* fix random commas `,` appearing, I have no clue why
