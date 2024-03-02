// (author: Nuno Aguiar, version: 20240302, license: Apache 2.0, url: https://github.com/openaf/oafp)
// ---

const oafp=a=>{if(!isUnDef(a)&&!isDef(a.____ojob)){var E=b=>{for(var c=Object.keys(u),d=0;d<c.length;d++){var e=c[d];isDef(a[e])&&(b=u[e](b))}return b},A=(b,c)=>{c.__path&&(b=$path(b,c.__path.trim()),delete c.__path);if(isString(b))return E(b);c.__from&&(b=$from(b).query(af.fromNLinq(c.__from.trim())),delete c.__from);if(c.__sql){var d="auto";if(isString(a.sqlfilter))switch(a.sqlfilter.toLowerCase()){case "simple":d="nlinq";break;case "advanced":d="h2";break;default:d="auto"}isArray(b)&&0<b.length&&
(b=$sql(b,c.__sql.trim(),d));delete c.__sql}return b=E(b)},l=(b,c,d)=>{c=clone(c);toBoolean(a.color)&&(__conConsole=!0);b=isString(b)?b.trim().startsWith("{")&&b.trim().endsWith("}")?A(jsonParse(b,__,__,!0),c):A(b,c):d?A([b],c)[0]:A(b,c);isDef(a.outputkey)&&(b=$$({}).set(a.outputkey,b));isDef(a.outkey)&&(b=$$({}).set(a.outkey,b));printErrnl("\r"+" ".repeat(_$(void 0).default("(processing data...)").length)+"\r");z.has(c.__format)?z.get(c.__format)(b,c):$o(b,c)},r=(b,c)=>{var d=af.fromString2Bytes(""),
e=af.newOutputStream();$sh(b).cb((f,h,g)=>{ioStreamCopy(e,f);f=e.toByteArray();0<f.length&&(d=f)}).get();return c?af.fromBytes2String(d):d},v=b=>{if(!isString(b)||""==b||isNull(b))return"";b=b.trim();return b.startsWith("{")?jsonParse(b,__,__,!0):af.fromSLON(b)},k=(b,c)=>{isUnDef(c)&&(c="exit: "+b);if(isUnDef(ow.oJob)&&!toBoolean(a.noexit))0!=b&&printErr(c),exit(b);else throw c;},B=()=>{__initializeCon();a.help=_$(a.help,"help").isString().default("");switch(a.help.toLowerCase()){case "filters":var b=
"docs/FILTERS.md";break;case "template":b="docs/TEMPLATE.md";break;case "examples":b="docs/EXAMPLES.md";break;case "readme":case "usage":b="docs/USAGE.md";break;default:b=a.help.toLowerCase(),b=isDef(w[b])?"docs/"+b+".md":"docs/USAGE.md"}var c=(getOPackPath("oafproc")||".")+"/"+b;let d="";if("docs/USAGE.md"==b&&0<Object.keys(w).length){d="\n---\n\n## \ud83d\udcda Libs help documents\n\n| Lib | Help |\n| --- | --- |\n";for(let e in w)d+="| "+e+" | help="+e+" |\n"}isDef(c)&&io.fileExists(c)?(__conConsole=
__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(a.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(c)+d)):print(ow.format.withMD(io.readFileString(c)+d))):isDef(global._oafphelp)&&isDef(global._oafphelp[b])?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(a.pause)?ow.format.string.pauseString(ow.format.withMD(global._oafphelp[b]+d)):print(ow.format.withMD(global._oafphelp[b]+d))):isString(w[a.help])?(__conConsole=__ansiColorFlag=
!0,isDef(ow.format.string.pauseString)&&toBoolean(a.pause)?ow.format.string.pauseString(ow.format.withMD(w[a.help])):print(ow.format.withMD(w[a.help]))):print("Check https://github.com/OpenAF/oafp/blob/master/src/"+b);k(0)},I=()=>{var b=(getOPackPath("oafproc")||".")+"/.package.yaml";b={oafp:{version:io.fileExists(b)?io.readFileYAML(b).version:"(not available)",inputs:Array.from(x.keys()).filter(c=>"?"!=c).sort(),transforms:Object.keys(u).filter(c=>"transforms"!=c).sort(),outputs:Array.from(z.keys()).filter(c=>
"?"!=c).sort(),flags:__flags.OAFP},openaf:{version:getVersion(),distribution:getDistribution(),home:getOpenAFPath(),opacks:$from($m4a(getOPackLocalDB())).notEquals("name","OpenAF").sort("name").select({name:"",version:""})},java:{version:ow.format.getJavaVersion(),home:ow.format.getJavaHome(),vendor:String(java.lang.System.getProperty("java.vendor")),params:af.fromJavaArray(java.lang.management.ManagementFactory.getRuntimeMXBean().getInputArguments())},os:{name:String(java.lang.System.getProperty("os.name")),
version:String(java.lang.System.getProperty("os.version")),arch:ow.format.getOSArch(),cpuCores:getNumberOfCores(!0),mem:{max:Number(java.lang.Runtime.getRuntime().maxMemory()),total:Number(java.lang.Runtime.getRuntime().totalMemory())},store:{tmpDirPath:String(java.lang.System.getProperty("java.io.tmpdir")),freeTmpDirBytes:Number(java.nio.file.Files.getFileStore(java.nio.file.Paths.get(java.lang.System.getProperty("java.io.tmpdir"))).getUsableSpace())}}};return stringify(b,__,"")};ow.loadFormat();
a.format=a.output||a.format||a.out;a.type=a.input||a.type||a.in;a.out=a.format;a.output=a.format;a.in=a.type;a.input=a.type;if(isUnDef(a.file)&&isUnDef(a.cmd)){let b=__;for(let c in a)if(""===a[c]){b=c;break}a.file=b}var C=new Map([[".json","json"],[".ndjson","ndjson"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".ini","ini"],[".md","md"],[".xls","xls"],[".xlsx","xls"],[".sql","sql"]]),F=new Set(["csv","ndjson"]),G={lines:(b,c)=>{isBoolean(a.linesjoin)||(a.linesjoin=toBoolean(_$(a.linesjoin,"linesjoin").isString().default(__)));
if(!a.linesjoin&&isString(b))0!=b.trim().length&&(0<b.trim().length&&(b=b.trim().split(/\r?\n/)),l(b,c,!0)),D=!0;else return!0},ndjson:(b,c)=>{isBoolean(a.ndjsonjoin)||(a.ndjsonjoin=toBoolean(_$(a.ndjsonjoin,"ndjsonjoin").isString().default(__)));if(a.ndjsonjoin)return!0;isUnDef(global.__ndjsonbuf)&&0!=b.length&&b.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=b.length&&!b.trim().endsWith("}")){global.__ndjsonbuf+=b.trim();return}0<global.__ndjsonbuf.length&&(b=
global.__ndjsonbuf+b,global.__ndjsonbuf=__)}0==b.length||0<b.length&&"{"!=b.trim().substring(0,1)?(l(jsonParse(global.__ndjsonbuf,__,__,!0),c,!0),D=!0,global.__ndjsonbuf=__):(l(jsonParse(b,__,__,!0),c,!0),D=!0)}},u={transforms:b=>{if(toBoolean(a.transforms))return Object.keys(u).filter(c=>"transforms"!=c).sort()},jsonschemagen:b=>{if(toBoolean(a.jsonschemagen))return ow.loadObj(),ow.obj.schemaGenerator(b)},jsonschemacmd:b=>u.jsonschema(b),jsonschema:b=>{isMap(b)||k(-1,"jsonschema is only supported with a map.");
isUnDef(a.jsonschema)&&isUnDef(a.jsonschemacmd)&&k(-1,"You need to provide a jsonschema=someFile.json or jsonschemacmd=someCommand");ow.loadObj();var c;if(isDef(a.jsonschemacmd)){var d=$sh(a.jsonschemacmd).getJson(0);0==d.exitcode?c=d.stdout:k(-1,"Error executing the command '"+a.jsonschemacmd+"': "+d.stderr)}else c=io.readFileJSON(a.jsonschema);isMap(c)||k(-1,"The schema provided is not a valid JSON schema.");ow.obj.schemaInit({allErrors:!0});c=ow.obj.schemaCompile(c);return{valid:c(b),errors:c.errors}},
sortmapkeys:b=>{if(toBoolean(a.sortmapkeys)&&isObject(b)){let c=(d,e)=>{let f=Object.keys(d).sort(),h={};for(let g=0;g<f.length;g++){let n=f[g],m=d[n];Array.isArray(m)?h[n]=m.map(p=>"object"===typeof p&&null!==p&&void 0!==p?sortMapKeys(p,e):p):h[n]=e&&"object"===typeof m&&null!==m&&void 0!==m?c(m,e):m}return h};return c(b,!0)}return b},searchkeys:b=>isObject(b)?searchKeys(b,a.searchkeys):b,searchvalues:b=>isObject(b)?searchValues(b,a.searchvalues):b,maptoarray:b=>toBoolean(a.maptoarray)&&isMap(b)?
$m4a(b,a.maptoarraykey):b,arraytomap:b=>toBoolean(a.arraytomap)&&isArray(b)?$a4m(b,a.arraytomapkey,toBoolean(a.arraytomapkeepkey)):b,flatmap:b=>toBoolean(a.flatmap)&&isObject(b)?ow.loadObj().flatMap(b,a.flatmapkey):b,merge:b=>{if(toBoolean(a.merge)&&isArray(b)&&1<b.length){for(var c,d=0;d<b.length;d++)c=0==d?b[d]:merge(c,b[d]);return c}return b},correcttypes:b=>{toBoolean(a.correcttypes)&&isObject(b)&&traverse(b,(c,d,e,f)=>{switch(descType(d)){case "number":isString(d)&&(f[c]=Number(d));break;case "string":"true"==
d.trim().toLowerCase()||"false"==d.trim().toLowerCase()?f[c]=toBoolean(d):d.trim().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)?f[c]=new Date(d):d.trim().match(/^\d{4}-\d{2}-\d{2}$/)?f[c]=new Date(d):d.trim().match(/^\d{2}:\d{2}:\d{2}$/)?f[c]=new Date(d):d.trim().match(/^\d{2}:\d{2}$/)&&(f[c]=new Date(d))}});return b},removenulls:b=>{toBoolean(a.removenulls)&&traverse(b,(c,d,e,f)=>{(isNull(d)||isUnDef(d))&&delete f[c]});return b},removedups:b=>{if(toBoolean(a.removedups)){if(isArray(b)){var c=
new Set,d=[];b.forEach(e=>{var f=e;isObject(e)&&(f=sortMapKeys(f));f=stringify(f,__,!0);c.has(f)||(c.add(f),d.push(e))});return d}k(-1,"removedups is only supported for arrays")}return b},llmprompt:b=>{if(isString(a.llmprompt)){a.llmenv=_$(a.llmenv,"llmenv").isString().default("OAFP_MODEL");a.llmoptions=_$(a.llmoptions,"llmoptions").isString().default(__);var c=$llm(isDef(a.llmoptions)?a.llmoptions:$sec("system","envs").get(a.llmenv)),d="json",e=!0;isString(a.input)&&("md"==a.input&&(d="markdown",
e=!1),"mdtable"==a.input&&(d="markdown table",e=!1),"hsperf"==a.input&&(d="java hsperf file"),"raw"==a.input&&(d="raw",e=!1));c=c.withContext(e?stringify(b,__,!0):b,isDef(a.llmcontext)?a.llmcontext:`${d} input data`);return!isString(a.output)||"md"!=a.output&&"mdtable"!=a.output&&"raw"!=a.output?c=c.promptJSON(a.llmprompt):c=c.prompt(a.llmprompt)}return b},splitlines:b=>toBoolean(a.splitlines)&&isString(b)?b.split(/\r?\n/):b},z=new Map([["?",(b,c)=>{b=Array.from(z.keys()).filter(d=>"?"!=d).sort();
$o(b,c)}],["pm",(b,c)=>{$o(b,c)}],["key",(b,c)=>{$o(b,c)}],["html",(b,c)=>{let d;c=!1;a.htmlopen=toBoolean(_$(a.htmlopen,"htmlopen").isString().default("true"));a.htmlwait=_$(a.htmlwait,"htmlwait").isNumber().default(2500);a.htmlopen&&(d=io.createTempFile("oafp_",".html"));ow.loadTemplate();isString(b)?b=ow.template.html.genStaticVersion(ow.template.parseMD2HTML(b,!toBoolean(a.htmlpart),!toBoolean(a.htmlcompact))):(b=ow.template.html.parseMap(b,!0),b='<html><meta charset="utf-8"><style>'+b.css+"</style><body>"+
b.out+"</body></html>");a.htmlopen&&(io.writeFileString(d,b),c=openInBrowser("file:///"+d.replace(/\\/g,"/")));c?sleep(a.htmlwait,!0):print(b)}],["ctable",(b,c)=>{$o(b,c)}],["stable",(b,c)=>{$o(b,c)}],["table",(b,c)=>{$o(b,c)}],["log",(b,c)=>{isString(b)&&toBoolean(a.logprintall)?print(b.replace(/\n$/,"")):(c=b,isMap(b)&&(c=[b]),isArray(c)&&c.forEach(d=>{if(isMap(d)){let e=isDef(d["@timestamp"])?d["@timestamp"]:__,f=isDef(d.level)?d.level:__;d=isDef(d.message)?d.message:__;let h;isDef(f)&&(0<=f.toLowerCase().indexOf("err")&&
(h="RED,BOLD"),0<=f.toLowerCase().indexOf("warn")&&(h="YELLOW"));isDef(e)&&24<e.length&&(e=e.substring(0,23)+"Z");(isDef(d)||isDef(e))&&print(ansiColor("BOLD",e)+(isDef(f)?" | "+ansiColor(h,f):"")+" | "+ansiColor(h,d))}}))}],["raw",(b,c)=>{isString(b)?print(b):sprint(b)}],["ini",(b,c)=>{isString(b)||(ow.loadJava(),c=new ow.java.ini,print(c.put(b).save()))}],["mdyaml",(b,c)=>{isArray(b)?b.forEach((d,e)=>{$o(d,merge(c,{__format:"yaml"}));e<b.length-1&&print("---\n")}):$o(b,merge(c,{__format:"yaml"}))}],
["mdtable",(b,c)=>{isArray(b)&&(ow.loadTemplate(),print(ow.template.md.table(b)))}],["template",(b,c)=>{isString(b)||(ow.loadTemplate(),ow.template.addConditionalHelpers(),ow.template.addOpenAFHelpers(),ow.template.addFormatHelpers(),isUnDef(a.template)&&k(-1,"For output=handlebars you need to provide a template=someFile.hbs"),tprint(io.readFileString(a.template),b))}],["openmetrics",(b,c)=>{isString(b)||(ow.loadMetrics(),b=ow.metrics.fromObj2OpenMetrics(b,a.metricsprefix,a.metricstimestamp),b=b.split("\n").map(d=>
{0<=d.indexOf('{_id="')&&(d=d.replace(/{_id="\d+",/,"{"));0<=d.indexOf(',_id="')&&(d=d.replace(/,_id="\d+"}/,"}"));0<=d.indexOf('_id="')&&(d=d.replace(/,_id="\d+",/,","));return d}).join("\n"),$o(b,c))}],["pjson",(b,c)=>{c.__format="prettyjson";$o(b,c)}],["base64",(b,c)=>{b=isString(b)?b:stringify(b);toBoolean(a.base64gzip)?print(af.fromBytes2String(af.toBase64Bytes(io.gzip(af.fromString2Bytes(b))))):print(af.fromBytes2String(af.toBase64Bytes(b)))}],["chart",(b,c)=>{isUnDef(a.chart)&&k(-1,'For output=chart you need to provide a chart="<units> [<path[:color][:legend]>...]"');
isUnDef(splitBySepWithEnc)&&k(-1,"Output=chart is not supported in this version of OpenAF");c=splitBySepWithEnc(a.chart," ",[['"','"'],["'","'"]]);let d=[];if(1<c.length){for(let e=0;e<c.length;e++)if(0==e)d.push(c[e]);else{let f=splitBySepWithEnc(c[e],":",[['"','"'],["'","'"]]).map((h,g)=>{if(0==g){if(h.startsWith("-"))return h;global["_oafp_fn_"+e]=()=>$path(b,h);return"_oafp_fn_"+e}return h}).join(":");d.push(f)}toBoolean(a.chartcls)&&cls();print(printChart("oafp "+d.join(" ")))}}],["ch",(b,c)=>
{isUnDef(a.ch)&&k(-1,'For output=ch you need to provide a ch="(type: ...)"');isUnDef(a.chkey)&&k(-1,'For output=ch you need to provide a chkey="key1, key2"');b=isMap(b)?[b]:b;a.ch=v(a.ch);isMap(a.ch)?(isUnDef(a.ch.type)&&k(-1,"ch.type is not defined."),isDef(a.ch.lib)&&loadLib(a.ch.lib),"remote"==a.ch.type?$ch("oafp::outdata").createRemote(a.ch.url):$ch("oafp::outdata").create(a.ch.type,a.ch.options),toBoolean(a.chunset)?$ch("oafp::outdata").unsetAll(a.chkey.split(",").map(d=>d.trim()),b):$ch("oafp::outdata").setAll(a.chkey.split(",").map(d=>
d.trim()),b),$ch("oafp::outdata").destroy()):k(-1,"Invalid ch parameter")}],["db",(b,c)=>{(!isArray(b)||1>b.length)&&k(-1,"db is only supported for filled arrays/lists");a.dbtable=_$(a.dbtable,"outdbtable").isString().default("data");a.dbnocreate=toBoolean(_$(a.dbnocreate,"outdbnocreate").isString().default("false"));a.dbicase=toBoolean(_$(a.dbicase,"outdbicase").isString().default("false"));a.dbbatchsize=_$(a.dbbatchsize,"dbbatchsize").isNumber().default(__);ow.loadObj();try{isString(a.dbjdbc)||
k(-1,"dbjdbc URL is not defined.");isDef(a.dblib)&&loadLib("jdbc-"+a.dblib+".js");var d=new DB(a.dbjdbc,a.dbuser,a.dbpass,a.dbtimeout);if(!a.dbnocreate)try{var e=ow.obj.fromObj2DBTableCreate(a.dbtable,b,__,!a.dbicase);d.u(e);d.commit()}catch(m){d.rollback(),k(-1,"Error creating table: "+m)}var f=Object.keys(ow.obj.flatMap(b[0]));var h=a.dbicase?f.join(",").toUpperCase():'"'+f.join('", "')+'"';let n="";var g=b.map(m=>{var p=ow.obj.flatMap(m);m=[];for(var t in f)m.push(p[f[t]]);t=f.map(y=>String(p[y]));
m="INSERT INTO "+(a.dbicase?a.dbtable:'"'+a.dbtable+'"')+" ("+h+") VALUES ("+t.map(y=>"?").join(", ")+")";m.length>n.length&&(n=String(m));return t});d.usArray(n,g,a.dbbatchsize)}catch(n){isDef(d)&&d.rollback(),printErr(n),k(-1,"Error connecting to the database: "+n)}finally{isDef(d)&&(d.commit(),d.close())}}],["sql",(b,c)=>{(!isArray(b)||1>b.length)&&k(-1,"sql is only supported for filled arrays/lists");a.sqltable=_$(a.sqltable,"sqltable").isString().default("data");a.sqlicase=toBoolean(_$(a.sqlicase,
"sqlicase").isString().default("false"));a.sqlnocreate=toBoolean(_$(a.sqlnocreate,"sqlnocreate").isString().default("false"));ow.loadObj();a.sqlnocreate||print(ow.obj.fromObj2DBTableCreate(a.sqltable,b,__,!a.sqlicase)+";\n");var d=Object.keys(ow.obj.flatMap(b[0]));var e=a.sqlicase?d.join(",").toUpperCase():'"'+d.join('", "')+'"';print(b.map(f=>{var h=ow.obj.flatMap(f);f=[];for(var g in d)f.push(h[d[g]]);g=d.map(n=>{n=h[n];isString(n)&&(n="'"+n.replace(/'/g,"''")+"'");isNull(n)&&(n="null");return n});
return"INSERT INTO "+(a.sqlicase?a.sqltable:'"'+a.sqltable+'"')+" ("+e+") VALUES ("+g.join(",")+");"}).join("\n"))}],["xls",(b,c)=>{if(!isString(b)){try{includeOPack("plugin-XLS")}catch(h){k(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}plugin("XLS");if(isMap(b)){ow.loadObj();var d=ow.obj.flatMap(b);var e=Object.keys(d).map(h=>({key:h,value:d[h]}))}isArray(b)&&(e=b);traverse(e,(h,g,n,m)=>{isString(g)&&g.startsWith("=")&&(m[h]="'"+g)});b=!1;c=a.xlsfile;
isUnDef(a.xlsfile)&&(b=!0,a.xlsfile=io.createTempFile("oafp",".xlsx"));c=new XLS(isDef(c)&&io.fileExists(c)?c:__);var f=c.getSheet(_$(a.xlssheet,"xlssheet").isString().default("data"));a.xlsformat=_$(a.xlsformat,"xlsformat").isString().default('(bold: true, borderBottom: "medium", borderBottomColor: "red")');a.xlsformat=v(a.xlsformat);ow.format.xls.setTable(c,f,"A",1,e,__,a.xlsformat);c.writeFile(a.xlsfile);c.close();a.xlsopenwait=_$(a.xlsopenwait,"xlsopenwait").isNumber().default(5E3);a.xlsopen=
toBoolean(_$(a.xlsopen,"xlsopen").isString().default("true"));a.xlsopen&&(ow.format.isWindows()?($sh("start "+a.xlsfile).exec(),b&&sleep(a.xlsopenwait,!0)):ow.format.getOS().startsWith("Mac")&&($sh("open "+a.xlsfile).exec(),b&&sleep(a.xlsopenwait,!0)))}}]]),x=new Map([["?",(b,c)=>{b=Array.from(x.keys()).filter(d=>"?"!=d).sort();l(b,c)}],["pm",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));isDef(__pm._map)&&(b=__pm._map);isDef(__pm._list)&&(b=__pm._list);l(b,c)}],["jsonschema",(b,c)=>
{printErrnl(_$(void 0).default("(processing data...)"));b=jsonParse(b,__,__,!0);isMap(b)||k(-1,"jsonschema is only supported with a map.");ow.loadObj();b=ow.obj.schemaSampleGenerator(b);l(b,c)}],["yaml",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));b=af.fromYAML(b);l(b,c)}],["xml",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));a.xmlignored=_$(a.xmlignored,"xmlignored").isString().default(__);a.xmlprefix=_$(a.xmlprefix,"xmlprefix").isString().default(__);a.xmlfiltertag=
toBoolean(_$(a.xmlfiltertag,"xmlfiltertag").isString().default(__));0<=b.indexOf("<?xml")&&(b=b.substring(b.indexOf("?>")+2).trim());0<=b.indexOf("<!DOCTYPE")&&(b=b.substring(b.indexOf(">")+1).trim());b=af.fromXML2Obj(b,a.xmlignored,a.xmlprefix,!a.xmlfiltertag);l(b,c)}],["lines",(b,c)=>{isBoolean(a.linesjoin)||(a.linesjoin=toBoolean(_$(a.linesjoin,"linesjoin").isString().default(__)));printErrnl(_$(void 0).default("(processing data...)"));let d=__,e=[],f=g=>{g=g.split("\n").map(m=>{let p="",t=0;for(let y=
0;y<m.length;y++)if("\t"===m[y]){let J=8-t%8;p+=" ".repeat(J);t+=J}else p+=m[y],t++;return p}).join("\n");if(isUnDef(d))return d=[],lastPos=0,isUnDef(a.linesvisualsepre)&&(a.linesvisualsepre=" \\s+"),g.split(new RegExp(a.linesvisualsepre)).forEach(m=>{d.push(m);m=g.substring(lastPos).match(new RegExp(ow.format.escapeRE(m)+"("+a.linesvisualsepre+"|$)"));!isNull(m)&&isDef(m.index)?(e.push(lastPos+m.index),lastPos=m.index):k(-1,"Problem with linesvisual to find header positioning.")}),__;var n={};e.forEach((m,
p)=>{n[d[p]]=g.substring(m,p+1<e.length?e[p+1]-1:__).trim()});return n};if(a.linesjoin)if(isDef(a.file)&&isUnDef(a.cmd)&&(b=io.readFileString(a.file)),isDef(a.cmd)&&(b=r(a.cmd,!0)),b=b.split(/\r?\n/),toBoolean(a.linesvisual)){var h=[];b.forEach(g=>{0!=g.length&&(g=f(g),isDef(g)&&h.push(g))});l(h,c)}else l(b,c);else b=isDef(a.file)&&isUnDef(a.cmd)?io.readFileStream(a.file):isDef(a.cmd)?af.fromBytes2InputStream(r(a.cmd)):af.fromString2InputStream(b),ioStreamReadLines(b,g=>{toBoolean(a.linesvisual)?
(g=f(g),isDef(g)&&l(g,clone(c),!0)):l(g,clone(c),!0)}),b.close()}],["ndjson",(b,c)=>{isBoolean(a.ndjsonjoin)||(a.ndjsonjoin=toBoolean(_$(a.ndjsonjoin,"ndjsonjoin").isString().default(__)));printErrnl(_$(void 0).default("(processing data...)"));global.__ndjsonbuf=__;var d=(f,h)=>{isUnDef(global.__ndjsonbuf)&&0!=f.length&&f.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=f.length&&!f.trim().endsWith("}")){global.__ndjsonbuf+=f.trim();return}0<global.__ndjsonbuf.length&&
(f=global.__ndjsonbuf+f,global.__ndjsonbuf=__)}0==f.length||0<f.length&&"{"!=f.trim().substring(0,1)?(h(f),global.__ndjsonbuf=__):h(f)},e=f=>{var h=[];f.split("\n").filter(g=>0<g.length).forEach(g=>d(g,n=>h.push(jsonParse(n,__,__,toBoolean(a.ndjsonfilter)))));return h};a.ndjsonjoin?(isDef(a.file)&&isUnDef(a.cmd)&&(b=io.readFileString(a.file)),isDef(a.cmd)&&(b=r(a.cmd,!0)),l(e(b),c)):(b=isDef(a.file)&&isUnDef(a.cmd)?io.readFileStream(a.file):isDef(a.cmd)?af.fromBytes2InputStream(r(a.cmd)):af.fromString2InputStream(b),
ioStreamReadLines(b,f=>{d(f,h=>l(jsonParse(h,__,__,!0),clone(c),!0))}),b.close())}],["md",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));__conConsole=__ansiColorFlag=!0;isUnDef(a.format)&&isUnDef(c.__format)&&(a.format="md",c.__format="md");l(b,c)}],["mdtable",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));ow.loadTemplate();b=ow.template.md.fromTable(b);l(b,c)}],["raw",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));l(b,c)}],["ini",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));
ow.loadJava();var d=new ow.java.ini;b=isDef(a.file)?d.loadFile(a.file).get():d.load(b).get();l(b,c)}],["sql",(b,c)=>{isString(b)?l(af.fromSQL(b).ast,c):l(b,c)}],["openmetrics",(b,c)=>{isString(b)?(ow.loadMetrics(),l(ow.metrics.fromOpenMetrics2Array(b),c)):l(b,c)}],["ch",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));isUnDef(a.inch)&&k(-1,"inch is not defined.");a.inch=v(a.inch);if(isMap(a.inch)){isUnDef(a.inch.type)&&k(-1,"inch.type is not defined.");isDef(a.inch.lib)&&loadLib(a.inch.lib);
"remote"==a.inch.type?$ch("oafp::indata").createRemote(a.inch.url):$ch("oafp::indata").create(a.inch.type,a.inch.options);var d=v(b);toBoolean(a.inchall)||0==b.trim().length?l($ch("oafp::indata").getAll(isMap(d)?d:__),c):l($ch("oafp::indata").get(isMap(d)?d:__),c);$ch("oafp::indata").destroy()}else k(-1,"inch is not a valid map.")}],["db",(b,c)=>{if(isString(b)){printErrnl(_$(void 0).default("(processing data...)"));isString(a.indbjdbc)||k(-1,"indbjdbc URL is not defined.");try{isDef(a.indblib)&&
loadLib("jdbc-"+a.indblib+".js");var d=new DB(a.indbjdbc,a.indbuser,a.indbpass,a.indbtimeout);d.convertDates(!0);if(toBoolean(a.indbexec)){var e=d.u(b);l({affectedRows:e},c);d.commit()}else e=d.q(b),isMap(e)&&isArray(e.results)?l(e.results,c):k(-1,"Invalid DB result: "+stringify(e))}catch(f){printErr(f.message),isDef(d)&&d.rollback(),k(-1,"Error executing SQL: "+f.message)}finally{isDef(d)&&(d.rollback(),d.close())}}else k(-1,"db is only supported with a SQL string.")}],["xls",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));
try{includeOPack("plugin-XLS")}catch(e){k(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}a.xlssheet=_$(a.xlssheet,"xlssheet").isString().default(0);a.xlsevalformulas=toBoolean(_$(a.xlsevalformulas,"xlsevalformulas").isString().default(!0));a.xlscol=_$(a.xlscol,"xlscol").isString().default("A");a.xlsrow=_$(a.xlsrow,"xlsrow").isString().default(1);plugin("XLS");if(isDef(a.file)||isDef(a.cmd)){b=new XLS(isDef(a.cmd)?r(a.cmd):a.file);var d=b.getSheet(a.xlssheet);
d=b.getTable(d,a.xlsevalformulas,a.xlscol,a.xlsrow);b.close();isDef(d)&&isMap(d)&&(d=d.table);l(d,c)}else k(-1,"XLS is only support with 'file' or 'cmd' defined. Please provide a file=... or a cmd=...")}],["csv",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));if(isDef(a.file)||isDef(a.cmd)){var d=isDef(a.cmd)?af.fromBytes2InputStream(r(a.cmd)):io.readFileStream(a.file);b=$csv(a.inputcsv).fromInStream(d).toOutArray();d.close()}else b=$csv(a.inputcsv).fromInString(b).toOutArray();l(b,
c)}],["hsperf",(b,c)=>{if(isDef(a.file)||isDef(a.cmd)){printErrnl(_$(void 0).default("(processing data...)"));ow.loadJava();var d=isDef(a.cmd)?ow.java.parseHSPerf(r(a.cmd)):ow.java.parseHSPerf(a.file);d.__ts=new Date;var e=0,f=0;d.sun.gc.generation.forEach(h=>{h.space.forEach(g=>{f+=Number(g.used);e=isNumber(g.capacity)?e+Number(g.capacity):e;d.sun.gc["__percUsed_"+g.name]=100*g.used/g.capacity})});d.sun.gc.__percUsed_meta=100*d.sun.gc.metaspace.used/d.sun.gc.metaspace.capacity;d.sun.gc.__percUsed_ccs=
100*d.sun.gc.compressedclassspace.used/d.sun.gc.compressedclassspace.capacity;b=$from(d.sun.gc.collector).equals("name","PSScavenge").at(0);d.sun.gc.__ygc=isDef(b)?Number(b.invocations):0;d.sun.gc.__ygct=isDef(b)?Number(b.time/1E9):0;b=$from(d.sun.gc.collector).equals("name","PSParallelCompact").orEquals("name","").at(0);d.sun.gc.__fgc=isDef(b)?Number(b.invocations):0;d.sun.gc.__fgct=isDef(b)?Number(b.time/1E9):0;d.sun.gc.__gct=$from(d.sun.gc.collector).sum("time")/1E9;d.java.__mem={total:e,used:f,
free:e-f,metaMax:d.sun.gc.metaspace.maxCapacity,metaTotal:d.sun.gc.metaspace.capacity,metaUsed:d.sun.gc.metaspace.used,metaFree:d.sun.gc.metaspace.capacity-d.sun.gc.metaspace.used};l(d,c)}else k(-1,"hsperf is only supported with either 'file' or 'cmd' defined.")}],["base64",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));b=toBoolean(a.base64gzip)?af.fromBytes2String(io.gunzip(af.fromBase64(b,!0))):af.fromBytes2String(af.fromBase64(b));l(b,c)}],["llm",(b,c)=>{a.llmenv=_$(a.llmenv,"llmenv").isString().default("OAFP_MODEL");
a.llmoptions=_$(a.llmoptions,"llmoptions").isString().default(__);isUnDef(a.llmoptions)&&!isString(getEnv(a.llmenv))&&k(-1,"llmoptions not defined and "+a.llmenv+" not found.");printErrnl(_$(void 0).default("(processing data...)"));var d=$llm(isDef(a.llmoptions)?a.llmoptions:$sec("system","envs").get(a.llmenv));d="md"==a.output||"mdtable"==a.output||"raw"==a.output?d.prompt(b):d.promptJSON(b);l(jsonParse(d,__,__,isString(d)),c)}],["slon",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));
l(af.fromSLON(b),c)}],["json",(b,c)=>{printErrnl(_$(void 0).default("(processing data...)"));l(jsonParse(b,__,__,isString(b)),c)}]]),w={};isString(a.libs)&&(a.libs=a.libs.split(",").map(b=>b.trim()).filter(b=>0<b.length));isDef(__flags.OAFP)&&isArray(__flags.OAFP.libs)&&isArray(a.libs)?a.libs=__flags.OAFP.libs.concat(a.libs):a.libs=isDef(__flags.OAFP)?__flags.OAFP.libs:[];isArray(a.libs)&&a.libs.forEach(b=>{try{var c=require("oafp_"+b+".js");if(isDef(c.oafplib)){var d=c.oafplib(clone(a),l,$o);isMap(d)&&
(isArray(d.fileExtensions)&&d.fileExtensions.forEach(e=>{var f=e.ext;e=e.type;C.has(f)?printErr("WARN: Extension '"+f+"' already exists."):C.set(f,e)}),isArray(d.fileExtensionsNoMem)&&d.fileExtensionsNoMem.forEach(e=>{e=e.ext;F.has(e)?printErr("WARN: Extension '"+e+"' already exists."):F.add(e)}),isArray(d.input)&&d.input.forEach(e=>{var f=e.type;e=e.fn;x.has(f)?printErr("WARN: Input type '"+f+"' already exists."):x.set(f,e)}),isArray(d.inputLine)&&d.inputLine.forEach(e=>{var f=e.type;e=e.fn;isUnDef(_inputLinesFns[f])?
G[f]=e:printErr("WARN: Input type '"+f+"' already exists.")}),isArray(d.transform)&&d.transform.forEach(e=>{var f=e.type;e=e.fn;isUnDef(u[f])?u[f]=e:printErr("WARN: Transform '"+f+"' already exists.")}),isArray(d.output)&&d.output.forEach(e=>{var f=e.type;e=e.fn;z.has(f)?printErr("WARN: Output type '"+f+"' already exists."):z.set(f,e)}),isString(d.help)&&(w[b.toLowerCase()]=d.help))}else printErr("WARN: Library '"+b+"' does not have oafplib.")}catch(e){printErr("WARN: Library '"+b+"' error: "+e)}});
(""==a["-h"]||isString(a.help)&&0<a.help.length)&&B();a.format=_$(a.format,"format").isString().default(__);__initializeCon();String(java.lang.System.getProperty("os.name")).match(/Windows/)||__con.getTerminal().settings.set("sane");if(isDef(a.secKey)){toBoolean(a.secEnv)&&(a.secRepo="system",a.secBucket="envs");a.secRepo=_$(a.secRepo,"secRepo").isString().default(getEnv("OAFP_SECREPO"));a.secBucket=_$(a.secBucket,"secBucket").isString().default(getEnv("OAFP_SECBUCKET"));a.secPass=_$(a.secPass,"secPass").isString().default(getEnv("OAFP_SECPASS"));
a.secMainPass=_$(a.secMainPass,"secMainPass").isString().default(getEnv("OAFP_SECMAINPASS"));a.secFile=_$(a.secFile,"secFile").isString().default(getEnv("OAFP_SECFILE"));let b=$sec(a.secRepo,a.secBucket,a.secPass,a.secMainPass,a.secFile).get(secKey);isDef(b)&&Object.keys(b).forEach(c=>a[c]=b[c])}var H={__format:a.format,__from:a.from,__sql:a.sql,__path:a.path,__csv:a.csv,__pause:a.pause,__key:a.__key};isDef(a.inputcsv)&&(a.inputcsv=v(a.inputcsv));isDef(a.incsv)&&(a.incsv=v(a.incsv));isDef(a.csv)&&
(a.csv=v(a.csv));var K=!1;if(""==a["-v"]||isString(a.version)&&0<a.version.length)K=!0,I();var q="",D=!1;B=()=>{if(K)q=I();else if(a.jsonprefix=_$(a.jsonprefix,"jsonprefix").isString().default(__),a.jsondesc=toBoolean(_$(a.jsondesc,"jsondesc").default("false")),isDef(a.file)){if(0>a.file.indexOf("::")&&!io.fileExists(a.file)&&k(-1,"ERROR: File not found: '"+a.file+"'"),!F.has(a.type))if("json"==a.type||isUnDef(a.type))if(a.jsondesc){var b=new Set;io.readStreamJSON(a.file,d=>{d=d.substring(2);isDef(a.jsonprefix)?
d.startsWith(a.jsonprefix)&&b.add(d):b.add(d);return!1});q=stringify(Array.from(b),__,"")}else if(isDef(a.jsonprefix)){var c=io.readStreamJSON(a.file,d=>d.substring(2).startsWith(a.jsonprefix));q=stringify(c,__,"")}else q=io.readFileString(a.file);else q=io.readFileString(a.file)}else a.jsondesc&&k(-1,"ERROR: jsondesc only available for file input."),a.jsonprefix&&k(-1,"ERROR: jsonprefix only available for file input."),isDef(a.cmd)?q=r(a.cmd,!0):isString(a.data)?q=a.data:"pm"!=a.input&&(q=[],io.pipeLn(d=>
{isDef(G[a.type])?G[a.type](E(d),clone(H))&&q.push(d):q.push(d);return!1}),q=q.join("\n"));D||(isUnDef(a.type)&&(isDef(a.file)&&(c=a.file.substring(a.file.lastIndexOf(".")),C.has(c)&&(a.type=C.get(c))),isUnDef(a.type)&&(c=q.trim(),c.startsWith("{")||c.startsWith("[")?a.type="json":c.startsWith("(")?a.type="slon":c.startsWith("<")?a.type="xml":isString(c)&&0<c.length?1<c.substring(0,c.indexOf("\n")).split(",").length?a.type="csv":c.substring(0,0<c.indexOf(": "))&&(a.type="yaml"):k(-1,"Please provide the input type."))),
isDef(a.type)&&x.has(a.type)?x.get(a.type)(q,H):(isString(a.type)&&printErr("WARN: "+a.type+" input type not supported. Using json."),x.get("json")(q,H)))};if(isNumber(a.loop))for(;;)B(),sleep(1E3*a.loop,!0);else B()}};oafp(params);
