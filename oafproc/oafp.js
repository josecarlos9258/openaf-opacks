// (author: Nuno Aguiar, version: 20240131, license: Apache 2.0, url: https://github.com/OpenAF/openaf-opacks/tree/master/oafproc)
// ---

const oafp=b=>{if(!isUnDef(b)&&!isDef(b.____ojob)){var l=()=>{__initializeCon();b.help=_$(b.help,"help").isString().default("");switch(b.help.toLowerCase()){case "filters":var a="docs/FILTERS.md";break;case "template":a="docs/TEMPLATE.md";break;default:a="docs/USAGE.md"}var c=(getOPackPath("oafproc")||".")+"/"+a;io.fileExists(c)?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(c))):print(ow.format.withMD(io.readFileString(c)))):
isDef(_help)&&"docs/USAGE.md"==a?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(_help)):print(ow.format.withMD(_help))):print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/"+a);exit(0)};ow.loadFormat();(""==b["-h"]||isString(b.help)&&0<b.help.length)&&l();b.format=b.output||b.format;b.type=b.input||b.type;if(isUnDef(b.file)){l=__;for(var p in b)if(""===b[p]){l=p;break}b.file=l}l=new Map([[".json",
"json"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".ini","ini"],[".md","md"]]);var t=new Set(["csv","ndjson"]),y={ndjson:(a,c)=>{if(b.ndjsonjoin)return!0;isUnDef(global.__ndjsonbuf)&&0!=a.length&&a.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=a.length&&!a.trim().endsWith("}")){global.__ndjsonbuf+=a.trim();return}0<global.__ndjsonbuf.length&&(a=global.__ndjsonbuf+a,global.__ndjsonbuf=__)}0==a.length||0<a.length&&"{"!=a.trim().substring(0,1)?(h(jsonParse(global.__ndjsonbuf,
__,__,!0),c,!0),u=!0,global.__ndjsonbuf=__):(h(jsonParse(a,__,__,!0),c,!0),u=!0)}},z={sortmapkeys:a=>{if(toBoolean(b.sortmapkeys)&&isObject(a)){let c=(d,e)=>{let f=Object.keys(d).sort(),g={};for(let k=0;k<f.length;k++){let q=f[k],m=d[q];Array.isArray(m)?g[q]=m.map(r=>"object"===typeof r&&null!==r&&void 0!==r?sortMapKeys(r,e):r):g[q]=e&&"object"===typeof m&&null!==m&&void 0!==m?c(m,e):m}return g};return c(a,!0)}return a},searchkeys:a=>isObject(a)?searchKeys(a,b.searchkeys):a,searchvalues:a=>isObject(a)?
searchValues(a,b.searchvalues):a,maptoarray:a=>isObject(a)?$m4a(a,b.maptoarraykey):a,arraytomap:a=>isArray(a)?$a4m(a,b.arraytomapkey,toBoolean(b.arraytomapkeepkey)):a,flatmap:a=>isObject(a)?ow.loadObj().flatMap(a,b.flatmapkey):a,merge:a=>{if(toBoolean(b.merge)&&isArray(a)&&1<a.length){for(var c,d=0;d<a.length;d++)c=0==d?a[d]:merge(c,a[d]);return c}return a}},A=new Map([["pm",(a,c)=>{$o(a,c)}],["key",(a,c)=>{$o(a,c)}],["log",(a,c)=>{isString(a)&&toBoolean(b.logprintall)?print(a.replace(/\n$/,"")):
(c=a,isMap(a)&&(c=[a]),isArray(c)&&c.forEach(d=>{if(isMap(d)){let e=isDef(d["@timestamp"])?d["@timestamp"]:__,f=isDef(d.level)?d.level:__;d=isDef(d.message)?d.message:__;isDef(e)&&24<e.length&&(e=e.substring(0,23)+"Z");(isDef(d)||isDef(e))&&print(ansiColor("BOLD",e)+(isDef(f)?" | "+f:"")+" | "+d)}}))}],["ini",(a,c)=>{isString(a)||(ow.loadJava(),c=new ow.java.ini,print(c.put(a).save()))}],["mdyaml",(a,c)=>{isArray(a)?a.forEach((d,e)=>{$o(d,merge(c,{__format:"yaml"}));e<a.length-1&&print("---\n")}):
$o(a,merge(c,{__format:"yaml"}))}],["mdtable",(a,c)=>{isArray(a)&&(ow.loadTemplate(),print(ow.template.md.table(a)))}],["template",(a,c)=>{if(!isString(a)){ow.loadTemplate();ow.template.addConditionalHelpers();ow.template.addOpenAFHelpers();ow.template.addFormatHelpers();if(isUnDef(b.template))throw"For output=handlebars you need to provide a template=someFile.hbs";tprint(io.readFileString(b.template),a)}}],["openmetrics",(a,c)=>{isString(a)||(ow.loadMetrics(),a=ow.metrics.fromObj2OpenMetrics(a,b.metricsprefix,
b.metricstimestamp),a=a.split("\n").map(d=>{0<=d.indexOf('{_id="')&&(d=d.replace(/{_id="\d+",/,"{"));0<=d.indexOf(',_id="')&&(d=d.replace(/,_id="\d+"}/,"}"));0<=d.indexOf('_id="')&&(d=d.replace(/,_id="\d+",/,","));return d}).join("\n"),$o(a,c))}],["base64",(a,c)=>{a=isString(a)?a:stringify(a);toBoolean(b.base64gzip)?print(af.fromBytes2String(af.toBase64Bytes(io.gzip(af.fromString2Bytes(a))))):print(af.fromBytes2String(af.toBase64Bytes(a)))}],["xls",(a,c)=>{if(!isString(a)){try{includeOPack("plugin-XLS")}catch(g){throw"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)";
}plugin("XLS");if(isMap(a)){ow.loadObj();var d=ow.obj.flatMap(a);var e=Object.keys(d).map(g=>({key:g,value:d[g]}))}isArray(a)&&(e=a);traverse(e,(g,k,q,m)=>{isString(k)&&k.startsWith("=")&&(m[g]="'"+k)});a=!1;isUnDef(b.xlsfile)&&(a=!0,b.xlsfile=io.createTempFile("oafp",".xlsx"));c=new XLS;var f=c.getSheet(_$(b.xlssheet,"xlssheet").isString().default("data"));b.xlsformat=_$(b.xlsformat,"xlsformat").isString().default('(bold: true, borderBottom: "medium", borderBottomColor: "red")');b.xlsformat.trim().startsWith("{")&&
(b.xlsformat=jsonParse(b.xlsformat,!0));b.xlsformat.trim().startsWith("(")&&(b.xlsformat=af.fromSLON(b.xlsformat));ow.format.xls.setTable(c,f,"A",1,e,__,b.xlsformat);c.writeFile(b.xlsfile);c.close();b.xlsopenwait=_$(b.xlsopenwait,"xlsopenwait").isNumber().default(5E3);b.xlsopen=toBoolean(_$(b.xlsopen,"xlsopen").isString().default("true"));b.xlsopen&&(ow.format.isWindows()?($sh("start "+b.xlsfile).exec(),a&&sleep(b.xlsopenwait,!0)):ow.format.getOS().startsWith("Mac")&&($sh("open "+b.xlsfile).exec(),
a&&sleep(b.xlsopenwait,!0)))}}]]),v=a=>{for(var c=Object.keys(z),d=0;d<c.length;d++){var e=c[d];isDef(b[e])&&(a=z[e](a))}return a},w=(a,c)=>{if(isString(a))return v(a);c.__path&&(a=$path(a,c.__path),delete c.__path);c.__from&&(a=$from(a).query(af.fromNLinq(c.__from)),delete c.__from);c.__sql&&(a=$sql(a,c.__sql),delete c.__sql);return a=v(a)},h=(a,c,d)=>{isString(a)?a.trim().startsWith("{")&&a.trim().endsWith("}")&&(a=w(jsonParse(a,__,__,!0),c)):a=d?w([a],c)[0]:w(a,c);isDef(b.outputkey)&&(a=$$({}).set(b.outputkey,
a));A.has(c.__format)?A.get(c.__format)(a,c):$o(a,c)};p=new Map([["pm",(a,c)=>{isDef(__pm._map)&&(a=__pm._map);isDef(__pm._list)&&(a=__pm._list);h(a,c)}],["yaml",(a,c)=>h(af.fromYAML(a),c)],["xml",(a,c)=>{b.xmlignored=_$(b.xmlignored,"xmlignored").isString().default(__);b.xmlprefix=_$(b.xmlprefix,"xmlprefix").isString().default(__);b.xmlfiltertag=toBoolean(_$(b.xmlfiltertag,"xmlfiltertag").isString().default(__));h(af.fromXML2Obj(a,b.xmlignored,b.xmlprefix,!b.xmlfiltertag),c)}],["ndjson",(a,c)=>{global.__ndjsonbuf=
__;var d=(f,g)=>{isUnDef(global.__ndjsonbuf)&&0!=f.length&&f.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=f.length&&!f.trim().endsWith("}")){global.__ndjsonbuf+=f.trim();return}0<global.__ndjsonbuf.length&&(f=global.__ndjsonbuf+f,global.__ndjsonbuf=__)}0==f.length||0<f.length&&"{"!=f.trim().substring(0,1)?(g(f),global.__ndjsonbuf=__):g(f)},e=f=>{var g=[];f.split("\n").filter(k=>0<k.length).forEach(k=>d(k,q=>g.push(jsonParse(q,__,__,toBoolean(b.ndjsonfilter)))));
return g};b.ndjsonjoin?(isDef(b.file)&&(a=io.readFileString(b.file)),h(e(a),c)):(a=isDef(b.file)?io.readFileStream(b.file):af.fromString2InputStream(a),ioStreamReadLines(a,f=>{d(f,g=>h(jsonParse(g,__,__,!0),clone(c),!0))}),a.close())}],["md",(a,c)=>{__conConsole=__ansiColorFlag=!0;isUnDef(b.format)&&isUnDef(c.__format)&&(b.format="md",c.__format="md");h(a,c)}],["mdtable",(a,c)=>{ow.loadTemplate();a=ow.template.md.fromTable(a);h(a,c)}],["ini",(a,c)=>{ow.loadJava();var d=new ow.java.ini;isDef(b.file)?
h(d.loadFile(b.file).get(),c):h(d.load(a).get(),c)}],["xls",(a,c)=>{try{includeOPack("plugin-XLS")}catch(e){throw"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)";}b.xlssheet=_$(b.xlssheet,"xlssheet").isString().default(0);b.xlsevalformulas=toBoolean(_$(b.xlsevalformulas,"xlsevalformulas").isString().default(!0));b.xlscol=_$(b.xlscol,"xlscol").isString().default("A");b.xlsrow=_$(b.xlsrow,"xlsrow").isString().default(1);plugin("XLS");if(isDef(b.file)){a=
new XLS(b.file);var d=a.getSheet(b.xlssheet);d=a.getTable(d,b.xlsevalformulas,b.xlscol,b.xlsrow);a.close();isDef(d)&&isMap(d)&&(d=d.table);h(d,c)}else throw"XLS only supports file input. Please provide a file=...";}],["csv",(a,c)=>{isDef(b.file)?(a=io.readFileStream(b.file),h($csv(b.inputcsv).fromInStream(a).toOutArray(),c),a.close()):h($csv(b.inputcsv).fromInString(a).toOutArray(),c)}],["hsperf",(a,c)=>{if(isDef(b.file)){ow.loadJava();var d=ow.java.parseHSPerf(b.file);d.__ts=new Date;var e=0,f=0;
d.sun.gc.generation.forEach(g=>{g.space.forEach(k=>{f+=Number(k.used);e=isNumber(k.capacity)?e+Number(k.capacity):e;d.sun.gc["__percUsed_"+k.name]=100*k.used/k.capacity})});d.sun.gc.__percUsed_meta=100*d.sun.gc.metaspace.used/d.sun.gc.metaspace.capacity;d.sun.gc.__percUsed_ccs=100*d.sun.gc.compressedclassspace.used/d.sun.gc.compressedclassspace.capacity;a=$from(d.sun.gc.collector).equals("name","PSScavenge").at(0);d.sun.gc.__ygc=isDef(a)?Number(a.invocations):0;d.sun.gc.__ygct=isDef(a)?Number(a.time/
1E9):0;a=$from(d.sun.gc.collector).equals("name","PSParallelCompact").orEquals("name","").at(0);d.sun.gc.__fgc=isDef(a)?Number(a.invocations):0;d.sun.gc.__fgct=isDef(a)?Number(a.time/1E9):0;d.sun.gc.__gct=$from(d.sun.gc.collector).sum("time")/1E9;d.java.__mem={total:e,used:f,free:e-f,metaMax:d.sun.gc.metaspace.maxCapacity,metaTotal:d.sun.gc.metaspace.capacity,metaUsed:d.sun.gc.metaspace.used,metaFree:d.sun.gc.metaspace.capacity-d.sun.gc.metaspace.used};h(d,c)}else throw"hsperf only supports file input";
}],["base64",(a,c)=>{toBoolean(b.base64gzip)?h(af.fromBytes2String(io.gunzip(af.fromBase64(a,!0))),c):h(af.fromBytes2String(af.fromBase64(a)),c)}],["json",(a,c)=>h(jsonParse(a,__,__,!0),c)]]);b.format=_$(b.format,"format").isString().default(__);__initializeCon();__con.getTerminal().settings.set("sane");var x={__format:b.format,__from:b.from,__sql:b.sql,__path:b.path,__csv:b.csv,__pause:b.pause,__key:b.__key};"ndjson"==b.type&&(b.ndjsonjoin=toBoolean(_$(b.ndjsonjoin,"ndjsonjoin").isString().default(__)));
isDef(b.inputcsv)&&(b.inputcsv=b.csv.trim().startsWith("{")?jsonParse(b.inputcsv,!0):af.fromSLON(b.inputcsv));isDef(b.csv)&&(b.csv=b.csv.trim().startsWith("{")?jsonParse(b.csv,!0):af.fromSLON(b.csv));var n="",u=!1;isDef(b.file)?t.has(b.type)||(n=io.readFileString(b.file)):"pm"!=b.input&&(n=[],io.pipeLn(a=>{isDef(y[b.type])?y[b.type](v(a),clone(x))&&n.push(a):n.push(a);return!1}),n=n.join("\n"));u||(isUnDef(b.type)&&(isDef(b.file)&&(t=b.file.substring(b.file.lastIndexOf(".")),l.has(t)&&(b.type=l.get(t))),
isUnDef(b.type)&&(l=n.trim(),l.startsWith("{")||l.startsWith("[")?b.type="json":l.startsWith("<")?b.type="xml":isString(l)&&0<l.length?1<l.substring(0,l.indexOf("\n")).split(",").length?b.type="csv":l.substring(0,0<l.indexOf(": "))&&(b.type="yaml"):(printErr("Please provide the input type."),exit(-1)))),isDef(p.has(b.type))?p.get(b.type)(n,x):p.get("json")(n,x))}};oafp(params);
