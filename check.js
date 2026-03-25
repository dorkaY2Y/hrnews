const d=require('./public/data/news.json');
const ns=d.articles.filter(a=>!a.summary_hu||a.summary_hu.trim()==='');
console.log('Ossz:',d.articles.length,'cikk');
console.log('Osszefoglalo nelkul:',ns.length);
const by={};
ns.forEach(a=>{by[a.source]=(by[a.source]||0)+1;});
Object.entries(by).sort((a,b)=>b[1]-a[1]).forEach(([s,n])=>console.log(s+':',n));
console.log('--- pelda ---');
ns.slice(0,5).forEach(a=>console.log(a.source,'|',a.title));
