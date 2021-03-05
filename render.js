/** Render the Nunjucks templates. */
const nunjucks = require('nunjucks');
const fs = require('fs');

const HOST = 'https://polympics.polytopia.win';

function render(srcPath, destPath, context) {
    context.url = `${HOST}/${destPath}`;
    context.host = HOST;
    const html = nunjucks.render(srcPath, context);
    fs.writeFileSync(destPath + '.html', html)
}

function renderFolder(folder) {
    const srcPath = `src/templates/${folder}`;
    const destPath = `out/${folder}`;
    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
    const files = fs.readdirSync(srcPath);
    for (const file of files) {
        const destName = file.replace('.njk', '');
        render(`${srcPath}/${file}`, `${destPath}/${destName}`, {});
    }
}

renderFolder('');
