const fs = require('fs');
const path = require('path');

function searchDir(dir) {
    if(!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath.includes('.cache') || fullPath.includes('test') || fullPath.includes('tests')) continue;
        if (fs.statSync(fullPath).isDirectory()) {
            searchDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.mjs')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('.fetch =') || content.includes('.fetch=')) {
                if (!content.includes('globalThis.fetch = fetch`"')) {
                   const lines = content.split('\n');
                   lines.forEach((line, i) => {
                       if (line.match(/\.fetch\s*=\s*/)) {
                           console.log(`${fullPath}:${i + 1}: ${line}`);
                       }
                   });
                }
            }
        }
    }
}

searchDir('./node_modules');
