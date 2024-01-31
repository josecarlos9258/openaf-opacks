// (author: Nuno Aguiar, version: 20240129, license: Apache 2.0, url: https://github.com/OpenAF/openaf-opacks/tree/master/oafproc)
// ---

const oafp=b=>{if(!isUnDef(b)&&!isDef(b.____ojob)){var g=()=>{__initializeCon();b.help=_$(b.help,"help").isString().default("");switch(b.help.toLowerCase()){case "filters":var a="docs/FILTERS.md";break;case "template":a="docs/TEMPLATE.md";break;default:a="docs/USAGE.md"}var c=(getOPackPath("oafproc")||".")+"/"+a;io.fileExists(c)?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(c))):print(ow.format.withMD(io.readFileString(c)))):
isDef(_help)&&"docs/USAGE.md"==a?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(_help)):print(ow.format.withMD(_help))):print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/"+a);exit(0)};ow.loadFormat();(""==b["-h"]||isString(b.help)&&0<b.help.length)&&g();b.format=b.output||b.format;b.type=b.input||b.type;if(isUnDef(b.file)){g=__;for(var n in b)if(""===b[n]){g=n;break}b.file=g}g=new Map([[".json",
"json"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".ini","ini"],[".md","md"]]);var p=new Set(["csv","ndjson"]),u={ndjson:(a,c)=>{if(b.ndjsonjoin)return!0;isUnDef(global.__ndjsonbuf)&&0!=a.length&&a.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=a.length&&!a.trim().endsWith("}")){global.__ndjsonbuf+=a.trim();return}0<global.__ndjsonbuf.length&&(a=global.__ndjsonbuf+a,global.__ndjsonbuf=__)}0==a.length||0<a.length&&"{"!=a.trim().substring(0,1)?(h(jsonParse(global.__ndjsonbuf,
__,__,!0),c,!0),q=!0,global.__ndjsonbuf=__):(h(jsonParse(a,__,__,!0),c,!0),q=!0)}},v={sortmapkeys:a=>toBoolean(b.sortmapkeys)&&isObject(a)?sortMapKeys(a):a,searchkeys:a=>isObjecvat(a)?searchKeys(a,b.searchkeys):a,searchvalues:a=>isObject(a)?searchValues(a,b.searchvalues):a,maptoarray:a=>isObject(a)?$m4a(a,b.maptoarraykey):a,arraytomap:a=>isArray(a)?$a4m(a,b.arraytomapkey,toBoolean(b.arraytomapkeepkey)):a,flatmap:a=>isObject(a)?ow.loadObj().flatMap(a,b.flatmapkey):a},x=new Map([["pm",(a,c)=>{$o(a,
c)}],["key",(a,c)=>{$o(a,c)}],["log",(a,c)=>{isString(a)&&toBoolean(b.logprintall)?print(a.replace(/\n$/,"")):(c=a,isMap(a)&&(c=[a]),isArray(c)&&c.forEach(d=>{if(isMap(d)){let f=isDef(d["@timestamp"])?d["@timestamp"]:__,e=isDef(d.level)?d.level:__;d=isDef(d.message)?d.message:__;isDef(f)&&24<f.length&&(f=f.substring(0,23)+"Z");(isDef(d)||isDef(f))&&print(ansiColor("BOLD",f)+(isDef(e)?" | "+e:"")+" | "+d)}}))}],["ini",(a,c)=>{ow.loadJava();c=new ow.java.ini;print(c.put(a).save())}],["mdyaml",(a,c)=>
{isArray(a)?a.forEach((d,f)=>{$o(d,merge(c,{__format:"yaml"}));f<a.length-1&&print("---\n")}):$o(a,merge(c,{__format:"yaml"}))}],["mdtable",(a,c)=>{isArray(a)&&(ow.loadTemplate(),print(ow.template.md.table(a)))}],["template",(a,c)=>{ow.loadTemplate();ow.template.addConditionalHelpers();ow.template.addOpenAFHelpers();ow.template.addFormatHelpers();if(isUnDef(b.template))throw"For output=handlebars you need to provide a template=someFile.hbs";tprint(io.readFileString(b.template),a)}],["openmetrics",
(a,c)=>{ow.loadMetrics();a=ow.metrics.fromObj2OpenMetrics(a,b.metricsprefix,b.metricstimestamp);a=a.split("\n").map(d=>{0<=d.indexOf('{_id="')&&(d=d.replace(/{_id="\d+",/,"{"));0<=d.indexOf(',_id="')&&(d=d.replace(/,_id="\d+"}/,"}"));0<=d.indexOf('_id="')&&(d=d.replace(/,_id="\d+",/,","));return d}).join("\n");$o(a,c)}],["base64",(a,c)=>{a=isString(a)?a:stringify(a);print(af.fromBytes2String(af.toBase64Bytes(a)))}],["xls",(a,c)=>{try{includeOPack("plugin-XLS")}catch(k){throw"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)";
}plugin("XLS");if(isMap(a)){ow.loadObj();var d=ow.obj.flatMap(a);var f=Object.keys(d).map(k=>({key:k,value:d[k]}))}isArray(a)&&(f=a);traverse(f,(k,m,w,z)=>{isString(m)&&m.startsWith("=")&&(z[k]="'"+m)});a=!1;isUnDef(b.xlsfile)&&(a=!0,b.xlsfile=io.createTempFile("oafp",".xlsx"));c=new XLS;var e=c.getSheet(_$(b.xlssheet,"xlssheet").isString().default("data"));b.xlsformat=_$(b.xlsformat,"xlsformat").isString().default('(bold: true, borderBottom: "medium", borderBottomColor: "red")');b.xlsformat.trim().startsWith("{")&&
(b.xlsformat=jsonParse(b.xlsformat,!0));b.xlsformat.trim().startsWith("(")&&(b.xlsformat=af.fromSLON(b.xlsformat));ow.format.xls.setTable(c,e,"A",1,f,__,b.xlsformat);c.writeFile(b.xlsfile);c.close();b.xlsopenwait=_$(b.xlsopenwait,"xlsopenwait").isNumber().default(5E3);b.xlsopen=toBoolean(_$(b.xlsopen,"xlsopen").isString().default("true"));b.xlsopen&&(ow.format.isWindows()?($sh("start "+b.xlsfile).exec(),a&&sleep(b.xlsopenwait,!0)):ow.format.getOS().startsWith("Mac")&&($sh("open "+b.xlsfile).exec(),
a&&sleep(b.xlsopenwait,!0)))}]]),r=a=>{for(var c=Object.keys(v),d=0;d<c.length;d++){var f=c[d];isDef(b[f])&&(a=v[f](a))}return a},y=(a,c)=>{if(isString(a))return r(a);c.__path&&(a=$path(a,c.__path),delete c.__path);c.__from&&(a=$from(a).query(af.fromNLinq(c.__from)),delete c.__from);c.__sql&&(a=$sql(a,c.__sql),delete c.__sql);return a=r(a)},h=(a,c,d)=>{isString(a)||(a=d?y([a],c)[0]:y(a,c));x.has(c.__format)?x.get(c.__format)(a,c):$o(a,c)};n=new Map([["pm",(a,c)=>{isDef(__pm._map)&&(a=__pm._map);isDef(__pm._list)&&
(a=__pm._list);h(a,c)}],["yaml",(a,c)=>h(af.fromYAML(a),c)],["xml",(a,c)=>{b.xmlignored=_$(b.xmlignored,"xmlignored").isString().default(__);b.xmlprefix=_$(b.xmlprefix,"xmlprefix").isString().default(__);b.xmlfiltertag=toBoolean(_$(b.xmlfiltertag,"xmlfiltertag").isString().default(__));h(af.fromXML2Obj(a,b.xmlignored,b.xmlprefix,!b.xmlfiltertag),c)}],["ndjson",(a,c)=>{global.__ndjsonbuf=__;var d=(e,k)=>{isUnDef(global.__ndjsonbuf)&&0!=e.length&&e.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=
e.length&&!e.trim().endsWith("}")){global.__ndjsonbuf+=e.trim();return}0<global.__ndjsonbuf.length&&(e=global.__ndjsonbuf+e,global.__ndjsonbuf=__)}0==e.length||0<e.length&&"{"!=e.trim().substring(0,1)?(k(e),global.__ndjsonbuf=__):k(e)},f=e=>{var k=[];e.split("\n").filter(m=>0<m.length).forEach(m=>d(m,w=>k.push(jsonParse(w,__,__,!0))));return k};b.ndjsonjoin?(isDef(b.file)&&(a=io.readFileString(b.file)),h(f(a),c)):(a=isDef(b.file)?io.readFileStream(b.file):af.fromString2InputStream(a),ioStreamReadLines(a,
e=>{d(e,k=>h(jsonParse(k,__,__,!0),clone(c),!0))}),a.close())}],["md",(a,c)=>{__conConsole=__ansiColorFlag=!0;print(ow.format.withMD(a))}],["mdtable",(a,c)=>{ow.loadTemplate();a=ow.template.md.fromTable(a);h(a,c)}],["ini",(a,c)=>{ow.loadJava();var d=new ow.java.ini;isDef(b.file)?h(d.loadFile(b.file).get(),c):h(d.load(a).get(),c)}],["xls",(a,c)=>{try{includeOPack("plugin-XLS")}catch(f){throw"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)";}b.xlssheet=
_$(b.xlssheet,"xlssheet").isString().default(0);b.xlsevalformulas=toBoolean(_$(b.xlsevalformulas,"xlsevalformulas").isString().default(!0));b.xlscol=_$(b.xlscol,"xlscol").isString().default("A");b.xlsrow=_$(b.xlsrow,"xlsrow").isString().default(1);plugin("XLS");if(isDef(b.file)){a=new XLS(b.file);var d=a.getSheet(b.xlssheet);d=a.getTable(d,b.xlsevalformulas,b.xlscol,b.xlsrow);a.close();isDef(d)&&isMap(d)&&(d=d.table);h(d,c)}else throw"XLS only supports file input. Please provide a file=...";}],["csv",
(a,c)=>{isDef(b.file)?(a=io.readFileStream(b.file),h($csv(b.inputcsv).fromInStream(a).toOutArray(),c),a.close()):h($csv(b.inputcsv).fromInString(a).toOutArray(),c)}],["hsperf",(a,c)=>{if(isDef(b.file))ow.loadJava(),h(ow.java.parseHSPerf(b.file),c);else throw"hsperf only supports file input";}],["base64",(a,c)=>{h(af.fromBytes2String(af.fromBase64(a)),c)}],["json",(a,c)=>h(jsonParse(a,__,__,!0),c)]]);b.format=_$(b.format,"format").isString().default("ctree");__initializeCon();__con.getTerminal().settings.set("sane");
var t={__format:b.format,__from:b.from,__sql:b.sql,__path:b.path,__csv:b.csv,__pause:b.pause,__key:b.__key};"ndjson"==b.type&&(b.ndjsonjoin=toBoolean(_$(b.ndjsonjoin,"ndjsonjoin").isString().default(__)));isDef(b.inputcsv)&&(b.inputcsv=b.csv.trim().startsWith("{")?jsonParse(b.inputcsv,!0):af.fromSLON(b.inputcsv));isDef(b.csv)&&(b.csv=b.csv.trim().startsWith("{")?jsonParse(b.csv,!0):af.fromSLON(b.csv));var l="",q=!1;isDef(b.file)?p.has(b.type)||(l=io.readFileString(b.file)):"pm"!=b.input&&(l=[],io.pipeLn(a=>
{isDef(u[b.type])?u[b.type](r(a),clone(t))&&l.push(a):l.push(a);return!1}),l=l.join("\n"));q||(isUnDef(b.type)&&(isDef(b.file)&&(p=b.file.substring(b.file.lastIndexOf(".")),g.has(p)&&(b.type=g.get(p))),isUnDef(b.type)&&(g=l.trim(),g.startsWith("{")||g.startsWith("[")?b.type="json":g.startsWith("<")?b.type="xml":isString(g)&&0<g.length?1<g.substring(0,g.indexOf("\n")).split(",").length?b.type="csv":g.substring(0,0<g.indexOf(": "))&&(b.type="yaml"):(printErr("Please provide the input type."),exit(-1)))),
isDef(n.has(b.type))?n.get(b.type)(l,t):n.get("json")(l,t))}};oafp(params);
