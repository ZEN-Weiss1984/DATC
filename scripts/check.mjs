import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate HTML IDs');
const references=[...html.matchAll(/(?:href|src|data-image)="([^"]+)"/g)].map(m=>m[1]);
for(const ref of references){
  if(/^(https?:|mailto:|data:)/.test(ref))continue;
  if(ref.startsWith('#'))assert(ids.includes(ref.slice(1)),`Missing anchor ${ref}`);
  else assert(fs.existsSync(path.join(root,ref.split('#')[0])),`Missing asset ${ref}`);
}
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),context);
assert.equal(Object.keys(context.window.DATC_RESULTS).length,4);
for(const setting of Object.values(context.window.DATC_RESULTS)){
  const grpo=setting.rows.find(r=>r.method==='GRPO');
  const datc=setting.rows.find(r=>r.method==='DATC');
  assert.equal(datc.std.length,4);
  assert(datc.values.every((v,i)=>v>grpo.values[i]),`Invalid gain in ${setting.name}`);
}
const sample=context.window.DATC_RESULTS['qwen-base'].rows;
const d=sample.find(r=>r.method==='DATC').values;
const g=sample.find(r=>r.method==='GRPO').values;
assert.equal((d[1]-g[1]).toFixed(2),'12.18');
assert.equal((d[2]-g[2]).toFixed(2),'10.82');
assert(!html.includes('overleaf.com'),'Private editor URL must not appear in public page');
assert.equal((html.match(/class="katex-mathml"/g)||[]).length,3,'All three formula blocks must have semantic MathML');
assert(!html.includes('∇̂'),'Do not regress to a Unicode combining accent for the gradient');
assert(html.includes('\\widehat{\\nabla}_{\\ell_t}'),'Reward formula must preserve the accent and nested subscript');
const katexRoot=path.join(root,'assets/vendor/katex');
const katexCss=fs.readFileSync(path.join(katexRoot,'katex.min.css'),'utf8');
for(const match of katexCss.matchAll(/url\(([^)]+)\)/g))assert(fs.existsSync(path.join(katexRoot,match[1].replace(/["']/g,''))),`Missing math font: ${match[1]}`);
assert(!/<video|assets\/video|data-video-time/.test(html),'Video removed from page');
assert(!fs.existsSync(path.join(root,'assets/video')),'Video assets removed from package');
assert(html.includes('Haoran Xu<sup>3</sup>'),'Haoran Xu affiliation is 3');
assert(html.includes('<sup>3</sup> Tsinghua University'),'Affiliation 3 is Tsinghua');
assert(!/Wuhan|武汉/.test(html),'Wuhan affiliation removed');
assert.equal((html.match(/class="model-group"/g)||[]).length,4,'All settings must be pre-rendered');
assert.equal(context.window.DATC_ABLATIONS.length,10,'Complete ablation table');
new vm.Script(fs.readFileSync(path.join(root,'app.js'),'utf8'));
console.log(`PASS: ${references.length} asset/link references, ${ids.length} unique IDs, 4 model settings, 16 DATC gains, 10 ablations, 3 math blocks, affiliations, video removal, JS syntax.`);
