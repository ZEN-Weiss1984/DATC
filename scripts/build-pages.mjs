import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'.pages-dist');
await fs.mkdir(output,{recursive:true});
for(const name of ['index.html','styles.css','app.js','.nojekyll','robots.txt','sitemap.xml']) {
  await fs.copyFile(path.join(root,name),path.join(output,name));
}
await fs.cp(path.join(root,'assets'),path.join(output,'assets'),{recursive:true});
console.log('Prepared public website files in .pages-dist/.');
