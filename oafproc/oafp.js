// (author: Nuno Aguiar, version: 20240205, license: Apache 2.0, url: https://github.com/OpenAF/openaf-opacks/tree/master/oafproc)
// ---

const oafp=b=>{if(!isUnDef(b)&&!isDef(b.____ojob)){var n=(a,c)=>{isUnDef(c)&&(c="exit: "+a);if(isUnDef(ow.oJob)&&!toBoolean(b.noexit))printErr(c),exit(a);else throw c;},q=()=>{__initializeCon();b.help=_$(b.help,"help").isString().default("");switch(b.help.toLowerCase()){case "filters":var a="docs/FILTERS.md";break;case "template":a="docs/TEMPLATE.md";break;case "examples":a="docs/EXAMPLES.md";break;default:a="docs/USAGE.md"}var c=(getOPackPath("oafproc")||".")+"/"+a;io.fileExists(c)?(__conConsole=
__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(c))):print(ow.format.withMD(io.readFileString(c)))):isDef(void 0)&&"docs/USAGE.md"==a?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(void 0)):print(ow.format.withMD(void 0))):print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/"+a);n(0)},l=()=>{var a=(getOPackPath("oafproc")||
".")+"/.package.yaml";a={oafp:io.fileExists(a)?io.readFileYAML(a).version:"(not available)",openaf:{version:getVersion(),distribution:getDistribution()}};return stringify(a,__,"")};ow.loadFormat();(""==b["-h"]||isString(b.help)&&0<b.help.length)&&q();b.format=b.output||b.format;b.type=b.input||b.type;if(isUnDef(b.file)&&isUnDef(b.cmd)){q=__;for(var r in b)if(""===b[r]){q=r;break}b.file=q}q=new Map([[".json","json"],[".ndjson","ndjson"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".ini","ini"],
[".md","md"],[".xls","xls"],[".xlsx","xls"],[".sql","sql"]]);var E=new Set(["csv","ndjson"]),A={ndjson:(a,c)=>{if(b.ndjsonjoin)return!0;isUnDef(global.__ndjsonbuf)&&0!=a.length&&a.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=a.length&&!a.trim().endsWith("}")){global.__ndjsonbuf+=a.trim();return}0<global.__ndjsonbuf.length&&(a=global.__ndjsonbuf+a,global.__ndjsonbuf=__)}0==a.length||0<a.length&&"{"!=a.trim().substring(0,1)?(k(jsonParse(global.__ndjsonbuf,__,__,
!0),c,!0),x=!0,global.__ndjsonbuf=__):(k(jsonParse(a,__,__,!0),c,!0),x=!0)}},B={sortmapkeys:a=>{if(toBoolean(b.sortmapkeys)&&isObject(a)){let c=(d,f)=>{let e=Object.keys(d).sort(),g={};for(let h=0;h<e.length;h++){let t=e[h],p=d[t];Array.isArray(p)?g[t]=p.map(v=>"object"===typeof v&&null!==v&&void 0!==v?sortMapKeys(v,f):v):g[t]=f&&"object"===typeof p&&null!==p&&void 0!==p?c(p,f):p}return g};return c(a,!0)}return a},searchkeys:a=>isObject(a)?searchKeys(a,b.searchkeys):a,searchvalues:a=>isObject(a)?
searchValues(a,b.searchvalues):a,maptoarray:a=>toBoolean(b.maptoarray)&&isObject(a)?$m4a(a,b.maptoarraykey):a,arraytomap:a=>toBoolean(b.arraytomap)&&isArray(a)?$a4m(a,b.arraytomapkey,toBoolean(b.arraytomapkeepkey)):a,flatmap:a=>toBoolean(b.flatmap)&&isObject(a)?ow.loadObj().flatMap(a,b.flatmapkey):a,merge:a=>{if(toBoolean(b.merge)&&isArray(a)&&1<a.length){for(var c,d=0;d<a.length;d++)c=0==d?a[d]:merge(c,a[d]);return c}return a},correcttypes:a=>{toBoolean(b.correcttypes)&&isObject(a)&&traverse(a,(c,
d,f,e)=>{switch(descType(d)){case "number":isString(d)&&(e[c]=Number(d));break;case "string":"true"==d.trim().toLowerCase()||"false"==d.trim().toLowerCase()?e[c]=toBoolean(d):d.trim().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)?e[c]=new Date(d):d.trim().match(/^\d{4}-\d{2}-\d{2}$/)?e[c]=new Date(d):d.trim().match(/^\d{2}:\d{2}:\d{2}$/)?e[c]=new Date(d):d.trim().match(/^\d{2}:\d{2}$/)&&(e[c]=new Date(d))}});return a},removenulls:a=>{toBoolean(b.removenulls)&&traverse(a,(c,d,f,e)=>{(isNull(d)||
isUnDef(d))&&delete e[c]});return a},sqlfilter:a=>{if(isString(b.sqlfilter))switch(b.sqlfilter.toLowerCase()){case "simple":__flags.SQL_QUERY_METHOD="nlinq";break;case "advanced":__flags.SQL_QUERY_METHOD="h2";break;default:__flags.SQL_QUERY_METHOD="auto"}return a},llmprompt:a=>{if(isString(b.llmprompt)){b.llmenv=_$(b.llmenv,"llmenv").isString().default("OAFP_MODEL");b.llmoptions=_$(b.llmoptions,"llmoptions").isString().default(__);var c=$llm(isDef(b.llmoptions)?b.llmoptions:$sec("system","envs").get(b.llmenv)),
d="json",f=!0;isString(b.input)&&("md"==b.input&&(d="markdown",f=!1),"mdtable"==b.input&&(d="markdown table",f=!1),"hsperf"==b.input&&(d="java hsperf file"));c=c.withContext(f?stringify(a,__,!0):a,`${d} input data`);return!isString(b.output)||"md"!=b.output&&"mdtable"!=b.output?c=c.promptJSON(b.llmprompt):c=c.prompt(b.llmprompt)}return a}},C=new Map([["pm",(a,c)=>{$o(a,c)}],["key",(a,c)=>{$o(a,c)}],["log",(a,c)=>{isString(a)&&toBoolean(b.logprintall)?print(a.replace(/\n$/,"")):(c=a,isMap(a)&&(c=[a]),
isArray(c)&&c.forEach(d=>{if(isMap(d)){let f=isDef(d["@timestamp"])?d["@timestamp"]:__,e=isDef(d.level)?d.level:__;d=isDef(d.message)?d.message:__;isDef(f)&&24<f.length&&(f=f.substring(0,23)+"Z");(isDef(d)||isDef(f))&&print(ansiColor("BOLD",f)+(isDef(e)?" | "+e:"")+" | "+d)}}))}],["ini",(a,c)=>{isString(a)||(ow.loadJava(),c=new ow.java.ini,print(c.put(a).save()))}],["mdyaml",(a,c)=>{isArray(a)?a.forEach((d,f)=>{$o(d,merge(c,{__format:"yaml"}));f<a.length-1&&print("---\n")}):$o(a,merge(c,{__format:"yaml"}))}],
["mdtable",(a,c)=>{isArray(a)&&(ow.loadTemplate(),print(ow.template.md.table(a)))}],["template",(a,c)=>{isString(a)||(ow.loadTemplate(),ow.template.addConditionalHelpers(),ow.template.addOpenAFHelpers(),ow.template.addFormatHelpers(),isUnDef(b.template)&&n(-1,"For output=handlebars you need to provide a template=someFile.hbs"),tprint(io.readFileString(b.template),a))}],["openmetrics",(a,c)=>{isString(a)||(ow.loadMetrics(),a=ow.metrics.fromObj2OpenMetrics(a,b.metricsprefix,b.metricstimestamp),a=a.split("\n").map(d=>
{0<=d.indexOf('{_id="')&&(d=d.replace(/{_id="\d+",/,"{"));0<=d.indexOf(',_id="')&&(d=d.replace(/,_id="\d+"}/,"}"));0<=d.indexOf('_id="')&&(d=d.replace(/,_id="\d+",/,","));return d}).join("\n"),$o(a,c))}],["pjson",(a,c)=>{c.__format="prettyjson";$o(a,c)}],["base64",(a,c)=>{a=isString(a)?a:stringify(a);toBoolean(b.base64gzip)?print(af.fromBytes2String(af.toBase64Bytes(io.gzip(af.fromString2Bytes(a))))):print(af.fromBytes2String(af.toBase64Bytes(a)))}],["xls",(a,c)=>{if(!isString(a)){try{includeOPack("plugin-XLS")}catch(g){n(-1,
"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}plugin("XLS");if(isMap(a)){ow.loadObj();var d=ow.obj.flatMap(a);var f=Object.keys(d).map(g=>({key:g,value:d[g]}))}isArray(a)&&(f=a);traverse(f,(g,h,t,p)=>{isString(h)&&h.startsWith("=")&&(p[g]="'"+h)});a=!1;c=b.xlsfile;isUnDef(b.xlsfile)&&(a=!0,b.xlsfile=io.createTempFile("oafp",".xlsx"));c=new XLS(isDef(c)&&io.fileExists(c)?c:__);var e=c.getSheet(_$(b.xlssheet,"xlssheet").isString().default("data"));
b.xlsformat=_$(b.xlsformat,"xlsformat").isString().default('(bold: true, borderBottom: "medium", borderBottomColor: "red")');b.xlsformat.trim().startsWith("{")&&(b.xlsformat=jsonParse(b.xlsformat,!0));b.xlsformat.trim().startsWith("(")&&(b.xlsformat=af.fromSLON(b.xlsformat));ow.format.xls.setTable(c,e,"A",1,f,__,b.xlsformat);c.writeFile(b.xlsfile);c.close();b.xlsopenwait=_$(b.xlsopenwait,"xlsopenwait").isNumber().default(5E3);b.xlsopen=toBoolean(_$(b.xlsopen,"xlsopen").isString().default("true"));
b.xlsopen&&(ow.format.isWindows()?($sh("start "+b.xlsfile).exec(),a&&sleep(b.xlsopenwait,!0)):ow.format.getOS().startsWith("Mac")&&($sh("open "+b.xlsfile).exec(),a&&sleep(b.xlsopenwait,!0)))}}]]),y=a=>{for(var c=Object.keys(B),d=0;d<c.length;d++){var f=c[d];isDef(b[f])&&(a=B[f](a))}return a},w=(a,c)=>{if(isString(a))return y(a);c.__path&&(a=$path(a,c.__path),delete c.__path);c.__from&&(a=$from(a).query(af.fromNLinq(c.__from)),delete c.__from);c.__sql&&(a=$sql(a,c.__sql),delete c.__sql);return a=y(a)},
k=(a,c,d)=>{a=isString(a)?a.trim().startsWith("{")&&a.trim().endsWith("}")?w(jsonParse(a,__,__,!0),c):w(a,c):d?w([a],c)[0]:w(a,c);isDef(b.outputkey)&&(a=$$({}).set(b.outputkey,a));printErrnl("\r"+" ".repeat(_$(void 0).default("(processing data...)").length)+"\r");C.has(c.__format)?C.get(c.__format)(a,c):$o(a,c)},u=(a,c)=>{var d=af.fromString2Bytes(""),f=af.newOutputStream();$sh(a).cb((e,g,h)=>{ioStreamCopy(f,e);e=f.toByteArray();0<e.length&&(d=e)}).get();return c?af.fromBytes2String(d):d};r=new Map([["pm",
(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));isDef(__pm._map)&&(a=__pm._map);isDef(__pm._list)&&(a=__pm._list);k(a,c)}],["yaml",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));a=af.fromYAML(a);k(a,c)}],["xml",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));b.xmlignored=_$(b.xmlignored,"xmlignored").isString().default(__);b.xmlprefix=_$(b.xmlprefix,"xmlprefix").isString().default(__);b.xmlfiltertag=toBoolean(_$(b.xmlfiltertag,"xmlfiltertag").isString().default(__));
0<=a.indexOf("<?xml")&&(a=a.substring(a.indexOf("?>")+2).trim());a=af.fromXML2Obj(a,b.xmlignored,b.xmlprefix,!b.xmlfiltertag);k(a,c)}],["ndjson",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));global.__ndjsonbuf=__;var d=(e,g)=>{isUnDef(global.__ndjsonbuf)&&0!=e.length&&e.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=e.length&&!e.trim().endsWith("}")){global.__ndjsonbuf+=e.trim();return}0<global.__ndjsonbuf.length&&(e=global.__ndjsonbuf+e,global.__ndjsonbuf=
__)}0==e.length||0<e.length&&"{"!=e.trim().substring(0,1)?(g(e),global.__ndjsonbuf=__):g(e)},f=e=>{var g=[];e.split("\n").filter(h=>0<h.length).forEach(h=>d(h,t=>g.push(jsonParse(t,__,__,toBoolean(b.ndjsonfilter)))));return g};b.ndjsonjoin?(isDef(b.file)&&isUnDef(b.cmd)&&(a=io.readFileString(b.file)),isDef(b.cmd)&&(a=u(b.cmd,!0)),k(f(a),c)):(a=isDef(b.file)&&isUnDef(b.cmd)?io.readFileStream(b.file):isDef(b.cmd)?af.fromBytes2InputStream(u(b.cmd)):af.fromString2InputStream(a),ioStreamReadLines(a,e=>
{d(e,g=>k(jsonParse(g,__,__,!0),clone(c),!0))}),a.close())}],["md",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));__conConsole=__ansiColorFlag=!0;isUnDef(b.format)&&isUnDef(c.__format)&&(b.format="md",c.__format="md");k(a,c)}],["mdtable",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));ow.loadTemplate();a=ow.template.md.fromTable(a);k(a,c)}],["ini",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));ow.loadJava();var d=new ow.java.ini;a=isDef(b.file)?d.loadFile(b.file).get():
d.load(a).get();k(a,c)}],["sql",(a,c)=>{isString(a)?k(af.fromSQL(a).ast,c):k(a,c)}],["xls",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));try{includeOPack("plugin-XLS")}catch(f){n(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}b.xlssheet=_$(b.xlssheet,"xlssheet").isString().default(0);b.xlsevalformulas=toBoolean(_$(b.xlsevalformulas,"xlsevalformulas").isString().default(!0));b.xlscol=_$(b.xlscol,"xlscol").isString().default("A");
b.xlsrow=_$(b.xlsrow,"xlsrow").isString().default(1);plugin("XLS");if(isDef(b.file)||isDef(b.cmd)){a=new XLS(isDef(b.cmd)?u(b.cmd):b.file);var d=a.getSheet(b.xlssheet);d=a.getTable(d,b.xlsevalformulas,b.xlscol,b.xlsrow);a.close();isDef(d)&&isMap(d)&&(d=d.table);k(d,c)}else n(-1,"XLS is only support with 'file' or 'cmd' defined. Please provide a file=... or a cmd=...")}],["csv",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));if(isDef(b.file)||isDef(b.cmd)){var d=isDef(b.cmd)?af.fromBytes2InputStream(u(b.cmd)):
io.readFileStream(b.file);a=$csv(b.inputcsv).fromInStream(d).toOutArray();d.close()}else a=$csv(b.inputcsv).fromInString(a).toOutArray();k(a,c)}],["hsperf",(a,c)=>{if(isDef(b.file)||isDef(b.cmd)){printErrnl(_$(void 0).default("(processing data...)"));ow.loadJava();var d=isDef(b.cmd)?ow.java.parseHSPerf(u(b.cmd)):ow.java.parseHSPerf(b.file);d.__ts=new Date;var f=0,e=0;d.sun.gc.generation.forEach(g=>{g.space.forEach(h=>{e+=Number(h.used);f=isNumber(h.capacity)?f+Number(h.capacity):f;d.sun.gc["__percUsed_"+
h.name]=100*h.used/h.capacity})});d.sun.gc.__percUsed_meta=100*d.sun.gc.metaspace.used/d.sun.gc.metaspace.capacity;d.sun.gc.__percUsed_ccs=100*d.sun.gc.compressedclassspace.used/d.sun.gc.compressedclassspace.capacity;a=$from(d.sun.gc.collector).equals("name","PSScavenge").at(0);d.sun.gc.__ygc=isDef(a)?Number(a.invocations):0;d.sun.gc.__ygct=isDef(a)?Number(a.time/1E9):0;a=$from(d.sun.gc.collector).equals("name","PSParallelCompact").orEquals("name","").at(0);d.sun.gc.__fgc=isDef(a)?Number(a.invocations):
0;d.sun.gc.__fgct=isDef(a)?Number(a.time/1E9):0;d.sun.gc.__gct=$from(d.sun.gc.collector).sum("time")/1E9;d.java.__mem={total:f,used:e,free:f-e,metaMax:d.sun.gc.metaspace.maxCapacity,metaTotal:d.sun.gc.metaspace.capacity,metaUsed:d.sun.gc.metaspace.used,metaFree:d.sun.gc.metaspace.capacity-d.sun.gc.metaspace.used};k(d,c)}else n(-1,"hsperf is only supported with either 'file' or 'cmd' defined.")}],["base64",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));a=toBoolean(b.base64gzip)?af.fromBytes2String(io.gunzip(af.fromBase64(a,
!0))):af.fromBytes2String(af.fromBase64(a));k(a,c)}],["llm",(a,c)=>{b.llmenv=_$(b.llmenv,"llmenv").isString().default("OAFP_MODEL");b.llmoptions=_$(b.llmoptions,"llmoptions").isString().default(__);isUnDef(b.llmoptions)&&!isString(getEnv(b.llmenv))&&n(-1,"llmoptions not defined and "+b.llmenv+" not found.");printErrnl(_$(void 0).default("(processing data...)"));a=$llm(isDef(b.llmoptions)?b.llmoptions:$sec("system","envs").get(b.llmenv)).promptJSON(a);k(jsonParse(a,__,__,!0),c)}],["json",(a,c)=>{printErrnl(_$(void 0).default("(processing data...)"));
k(jsonParse(a,__,__,!0),c)}]]);b.format=_$(b.format,"format").isString().default(__);__initializeCon();String(java.lang.System.getProperty("os.name")).match(/Windows/)||__con.getTerminal().settings.set("sane");var z={__format:b.format,__from:b.from,__sql:b.sql,__path:b.path,__csv:b.csv,__pause:b.pause,__key:b.__key};"ndjson"==b.type&&(b.ndjsonjoin=toBoolean(_$(b.ndjsonjoin,"ndjsonjoin").isString().default(__)));isDef(b.inputcsv)&&(b.inputcsv=b.csv.trim().startsWith("{")?jsonParse(b.inputcsv,!0):af.fromSLON(b.inputcsv));
isDef(b.csv)&&(b.csv=b.csv.trim().startsWith("{")?jsonParse(b.csv,!0):af.fromSLON(b.csv));var D=!1;if(""==b["-v"]||isString(b.version)&&0<b.version.length)D=!0,l();var m="",x=!1;D?m=l():isDef(b.file)?(io.fileExists(b.file)||n(-1,"ERROR: File not found: '"+b.file+"'"),E.has(b.type)||(m=io.readFileString(b.file))):isDef(b.cmd)?m=u(b.cmd,!0):"pm"!=b.input&&(m=[],io.pipeLn(a=>{isDef(A[b.type])?A[b.type](y(a),clone(z))&&m.push(a):m.push(a);return!1}),m=m.join("\n"));x||(isUnDef(b.type)&&(isDef(b.file)&&
(l=b.file.substring(b.file.lastIndexOf(".")),q.has(l)&&(b.type=q.get(l))),isUnDef(b.type)&&(l=m.trim(),l.startsWith("{")||l.startsWith("[")?b.type="json":l.startsWith("<")?b.type="xml":isString(l)&&0<l.length?1<l.substring(0,l.indexOf("\n")).split(",").length?b.type="csv":l.substring(0,0<l.indexOf(": "))&&(b.type="yaml"):n(-1,"Please provide the input type."))),isDef(r.has(b.type))?r.get(b.type)(m,z):(printErr("WARN: "+b.type+" input type not supported. Using json."),r.get("json")(m,z)))}};oafp(params);
