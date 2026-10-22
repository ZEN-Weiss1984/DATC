import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import katex from '../assets/vendor/katex/katex.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const formulas={
  credit:String.raw`\begin{aligned}k_t &= \nabla_{\ell_t}\log p_t(a_t)\\[0.35em]d_t &= \langle g_t,\,k_t\rangle\end{aligned}`,
  reward:String.raw`g_t = \sigma^{-1}\widehat{\nabla}_{\ell_t}R`,
  allocation:String.raw`\begin{aligned}w_t &= T\,\operatorname{softmax}_t\!\left(\frac{Ad}{\tau}\right)\\[0.35em]\widetilde{A}_t &= A\,w_t\end{aligned}`
};
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
let count=0;
html=html.replace(/<!-- math:(\w+) -->[\s\S]*?<!-- \/math -->/g,(_match,key)=>{
  if(!formulas[key])throw new Error(`Unknown formula ${key}`);
  count++;
  return `<!-- math:${key} -->${katex.renderToString(formulas[key],{displayMode:true,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false})}<!-- /math -->`;
});
if(count!==3)throw new Error(`Expected 3 formula blocks, found ${count}`);
fs.writeFileSync(path.join(root,'index.html'),html);
console.log(`Rendered ${count} formula blocks with KaTeX 0.19.0; fonts are local.`);
