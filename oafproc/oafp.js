// (author: Nuno Aguiar, version: 20240227, license: Apache 2.0, url: https://github.com/openaf/oafp)
// ---

const oafp=b=>{if(!isUnDef(b)&&!isDef(b.____ojob)){var E=a=>{for(var d=Object.keys(v),c=0;c<d.length;c++){var e=d[c];isDef(b[e])&&(a=v[e](a))}return a},A=(a,d)=>{d.__path&&(a=$path(a,d.__path.trim()),delete d.__path);if(isString(a))return E(a);d.__from&&(a=$from(a).query(af.fromNLinq(d.__from.trim())),delete d.__from);if(d.__sql){var c="auto";if(isString(b.sqlfilter))switch(b.sqlfilter.toLowerCase()){case "simple":c="nlinq";break;case "advanced":c="h2";break;default:c="auto"}isArray(a)&&0<a.length&&
(a=$sql(a,d.__sql.trim(),c));delete d.__sql}return a=E(a)},k=(a,d,c)=>{toBoolean(b.color)&&(__conConsole=!0);a=isString(a)?a.trim().startsWith("{")&&a.trim().endsWith("}")?A(jsonParse(a,__,__,!0),d):A(a,d):c?A([a],d)[0]:A(a,d);isDef(b.outputkey)&&(a=$$({}).set(b.outputkey,a));isDef(b.outkey)&&(a=$$({}).set(b.outkey,a));printErrnl("\r"+" ".repeat(_$(void 0).default("(processing data...)").length)+"\r");z.has(d.__format)?z.get(d.__format)(a,d):$o(a,d)},t=(a,d)=>{var c=af.fromString2Bytes(""),e=af.newOutputStream();
$sh(a).cb((f,h,g)=>{ioStreamCopy(e,f);f=e.toByteArray();0<f.length&&(c=f)}).get();return d?af.fromBytes2String(c):c},m=(a,d)=>{isUnDef(d)&&(d="exit: "+a);if(isUnDef(ow.oJob)&&!toBoolean(b.noexit))0!=a&&printErr(d),exit(a);else throw d;},B=()=>{__initializeCon();b.help=_$(b.help,"help").isString().default("");switch(b.help.toLowerCase()){case "filters":var a="docs/FILTERS.md";break;case "template":a="docs/TEMPLATE.md";break;case "examples":a="docs/EXAMPLES.md";break;case "readme":case "usage":a="docs/USAGE.md";
break;default:a=b.help.toLowerCase(),a=isDef(w[a])?"docs/"+a+".md":"docs/USAGE.md"}var d=(getOPackPath("oafproc")||".")+"/"+a;let c="";if("docs/USAGE.md"==a&&0<Object.keys(w).length){c="\n---\n\n## \ud83d\udcda Libs help documents\n\n| Lib | Help |\n| --- | --- |\n";for(let e in w)c+="| "+e+" | help="+e+" |\n"}isDef(d)&&io.fileExists(d)?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(d)+c)):print(ow.format.withMD(io.readFileString(d)+
c))):isDef(global._oafphelp)&&isDef(global._oafphelp[a])?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(global._oafphelp[a]+c)):print(ow.format.withMD(global._oafphelp[a]+c))):isString(w[b.help])?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(b.pause)?ow.format.string.pauseString(ow.format.withMD(w[b.help])):print(ow.format.withMD(w[b.help]))):print("Check https://github.com/OpenAF/oafp/blob/master/src/"+
a);m(0)},p=()=>{var a=(getOPackPath("oafproc")||".")+"/.package.yaml";a={oafp:{version:io.fileExists(a)?io.readFileYAML(a).version:"(not available)",inputs:Array.from(x.keys()).filter(d=>"?"!=d).sort(),transforms:Object.keys(v).filter(d=>"transforms"!=d).sort(),outputs:Array.from(z.keys()).filter(d=>"?"!=d).sort(),flags:__flags.OAFP},openaf:{version:getVersion(),distribution:getDistribution(),home:getOpenAFPath(),opacks:$from($m4a(getOPackLocalDB())).notEquals("name","OpenAF").sort("name").select({name:"",
version:""})},java:{version:ow.format.getJavaVersion(),home:ow.format.getJavaHome(),vendor:String(java.lang.System.getProperty("java.vendor")),params:af.fromJavaArray(java.lang.management.ManagementFactory.getRuntimeMXBean().getInputArguments())},os:{name:String(java.lang.System.getProperty("os.name")),version:String(java.lang.System.getProperty("os.version")),arch:ow.format.getOSArch(),cpuCores:getNumberOfCores(!0),mem:{max:Number(java.lang.Runtime.getRuntime().maxMemory()),total:Number(java.lang.Runtime.getRuntime().totalMemory())},
store:{tmpDirPath:String(java.lang.System.getProperty("java.io.tmpdir")),freeTmpDirBytes:Number(java.nio.file.Files.getFileStore(java.nio.file.Paths.get(java.lang.System.getProperty("java.io.tmpdir"))).getUsableSpace())}}};return stringify(a,__,"")};ow.loadFormat();b.format=b.output||b.format||b.out;b.type=b.input||b.type||b.in;b.out=b.format;b.output=b.format;b.in=b.type;b.input=b.type;if(isUnDef(b.file)&&isUnDef(b.cmd)){let a=__;for(let d in b)if(""===b[d]){a=d;break}b.file=a}var C=new Map([[".json",
"json"],[".ndjson","ndjson"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".ini","ini"],[".md","md"],[".xls","xls"],[".xlsx","xls"],[".sql","sql"]]),F=new Set(["csv","ndjson"]),G={lines:(a,d)=>{isBoolean(b.linesjoin)||(b.linesjoin=toBoolean(_$(b.linesjoin,"linesjoin").isString().default(__)));if(!b.linesjoin&&isString(a))0!=a.trim().length&&(0<a.trim().length&&(a=a.trim().split(/\r?\n/)),k(a,d,!0)),D=!0;else return!0},ndjson:(a,d)=>{isBoolean(b.ndjsonjoin)||(b.ndjsonjoin=toBoolean(_$(b.ndjsonjoin,
"ndjsonjoin").isString().default(__)));if(b.ndjsonjoin)return!0;isUnDef(global.__ndjsonbuf)&&0!=a.length&&a.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=a.length&&!a.trim().endsWith("}")){global.__ndjsonbuf+=a.trim();return}0<global.__ndjsonbuf.length&&(a=global.__ndjsonbuf+a,global.__ndjsonbuf=__)}0==a.length||0<a.length&&"{"!=a.trim().substring(0,1)?(k(jsonParse(global.__ndjsonbuf,__,__,!0),d,!0),D=!0,global.__ndjsonbuf=__):(k(jsonParse(a,__,__,!0),d,!0),D=
!0)}},v={transforms:a=>{if(toBoolean(b.transforms))return Object.keys(v).filter(d=>"transforms"!=d).sort()},jsonschemagen:a=>{if(toBoolean(b.jsonschemagen))return ow.loadObj(),ow.obj.schemaGenerator(a)},jsonschemacmd:a=>v.jsonschema(a),jsonschema:a=>{isMap(a)||m(-1,"jsonschema is only supported with a map.");isUnDef(b.jsonschema)&&isUnDef(b.jsonschemacmd)&&m(-1,"You need to provide a jsonschema=someFile.json or jsonschemacmd=someCommand");ow.loadObj();var d;if(isDef(b.jsonschemacmd)){var c=$sh(b.jsonschemacmd).getJson(0);
0==c.exitcode?d=c.stdout:m(-1,"Error executing the command '"+b.jsonschemacmd+"': "+c.stderr)}else d=io.readFileJSON(b.jsonschema);isMap(d)||m(-1,"The schema provided is not a valid JSON schema.");ow.obj.schemaInit({allErrors:!0});d=ow.obj.schemaCompile(d);return{valid:d(a),errors:d.errors}},sortmapkeys:a=>{if(toBoolean(b.sortmapkeys)&&isObject(a)){let d=(c,e)=>{let f=Object.keys(c).sort(),h={};for(let g=0;g<f.length;g++){let n=f[g],l=c[n];Array.isArray(l)?h[n]=l.map(q=>"object"===typeof q&&null!==
q&&void 0!==q?sortMapKeys(q,e):q):h[n]=e&&"object"===typeof l&&null!==l&&void 0!==l?d(l,e):l}return h};return d(a,!0)}return a},searchkeys:a=>isObject(a)?searchKeys(a,b.searchkeys):a,searchvalues:a=>isObject(a)?searchValues(a,b.searchvalues):a,maptoarray:a=>toBoolean(b.maptoarray)&&isMap(a)?$m4a(a,b.maptoarraykey):a,arraytomap:a=>toBoolean(b.arraytomap)&&isArray(a)?$a4m(a,b.arraytomapkey,toBoolean(b.arraytomapkeepkey)):a,flatmap:a=>toBoolean(b.flatmap)&&isObject(a)?ow.loadObj().flatMap(a,b.flatmapkey):
a,merge:a=>{if(toBoolean(b.merge)&&isArray(a)&&1<a.length){for(var d,c=0;c<a.length;c++)d=0==c?a[c]:merge(d,a[c]);return d}return a},correcttypes:a=>{toBoolean(b.correcttypes)&&isObject(a)&&traverse(a,(d,c,e,f)=>{switch(descType(c)){case "number":isString(c)&&(f[d]=Number(c));break;case "string":"true"==c.trim().toLowerCase()||"false"==c.trim().toLowerCase()?f[d]=toBoolean(c):c.trim().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)?f[d]=new Date(c):c.trim().match(/^\d{4}-\d{2}-\d{2}$/)?f[d]=new Date(c):
c.trim().match(/^\d{2}:\d{2}:\d{2}$/)?f[d]=new Date(c):c.trim().match(/^\d{2}:\d{2}$/)&&(f[d]=new Date(c))}});return a},removenulls:a=>{toBoolean(b.removenulls)&&traverse(a,(d,c,e,f)=>{(isNull(c)||isUnDef(c))&&delete f[d]});return a},removedups:a=>{if(toBoolean(b.removedups)){if(isArray(a)){var d=new Set,c=[];a.forEach(e=>{var f=e;isObject(e)&&(f=sortMapKeys(f));f=stringify(f,__,!0);d.has(f)||(d.add(f),c.push(e))});return c}m(-1,"removedups is only supported for arrays")}return a},llmprompt:a=>{if(isString(b.llmprompt)){b.llmenv=
_$(b.llmenv,"llmenv").isString().default("OAFP_MODEL");b.llmoptions=_$(b.llmoptions,"llmoptions").isString().default(__);var d=$llm(isDef(b.llmoptions)?b.llmoptions:$sec("system","envs").get(b.llmenv)),c="json",e=!0;isString(b.input)&&("md"==b.input&&(c="markdown",e=!1),"mdtable"==b.input&&(c="markdown table",e=!1),"hsperf"==b.input&&(c="java hsperf file"),"raw"==b.input&&(c="raw",e=!1));d=d.withContext(e?stringify(a,__,!0):a,isDef(b.llmcontext)?b.llmcontext:`${c} input data`);return!isString(b.output)||
"md"!=b.output&&"mdtable"!=b.output&&"raw"!=b.output?d=d.promptJSON(b.llmprompt):d=d.prompt(b.llmprompt)}return a},splitlines:a=>toBoolean(b.splitlines)&&isString(a)?a.split(/\r?\n/):a},z=new Map([["?",(a,d)=>{a=Array.from(z.keys()).filter(c=>"?"!=c).sort();$o(a,d)}],["pm",(a,d)=>{$o(a,d)}],["key",(a,d)=>{$o(a,d)}],["ctable",(a,d)=>{$o(a,d)}],["stable",(a,d)=>{$o(a,d)}],["table",(a,d)=>{$o(a,d)}],["log",(a,d)=>{isString(a)&&toBoolean(b.logprintall)?print(a.replace(/\n$/,"")):(d=a,isMap(a)&&(d=[a]),
isArray(d)&&d.forEach(c=>{if(isMap(c)){let e=isDef(c["@timestamp"])?c["@timestamp"]:__,f=isDef(c.level)?c.level:__;c=isDef(c.message)?c.message:__;let h;isDef(f)&&(0<=f.toLowerCase().indexOf("err")&&(h="RED,BOLD"),0<=f.toLowerCase().indexOf("warn")&&(h="YELLOW"));isDef(e)&&24<e.length&&(e=e.substring(0,23)+"Z");(isDef(c)||isDef(e))&&print(ansiColor("BOLD",e)+(isDef(f)?" | "+ansiColor(h,f):"")+" | "+ansiColor(h,c))}}))}],["raw",(a,d)=>{isString(a)?print(a):sprint(a)}],["ini",(a,d)=>{isString(a)||(ow.loadJava(),
d=new ow.java.ini,print(d.put(a).save()))}],["mdyaml",(a,d)=>{isArray(a)?a.forEach((c,e)=>{$o(c,merge(d,{__format:"yaml"}));e<a.length-1&&print("---\n")}):$o(a,merge(d,{__format:"yaml"}))}],["mdtable",(a,d)=>{isArray(a)&&(ow.loadTemplate(),print(ow.template.md.table(a)))}],["template",(a,d)=>{isString(a)||(ow.loadTemplate(),ow.template.addConditionalHelpers(),ow.template.addOpenAFHelpers(),ow.template.addFormatHelpers(),isUnDef(b.template)&&m(-1,"For output=handlebars you need to provide a template=someFile.hbs"),
tprint(io.readFileString(b.template),a))}],["openmetrics",(a,d)=>{isString(a)||(ow.loadMetrics(),a=ow.metrics.fromObj2OpenMetrics(a,b.metricsprefix,b.metricstimestamp),a=a.split("\n").map(c=>{0<=c.indexOf('{_id="')&&(c=c.replace(/{_id="\d+",/,"{"));0<=c.indexOf(',_id="')&&(c=c.replace(/,_id="\d+"}/,"}"));0<=c.indexOf('_id="')&&(c=c.replace(/,_id="\d+",/,","));return c}).join("\n"),$o(a,d))}],["pjson",(a,d)=>{d.__format="prettyjson";$o(a,d)}],["base64",(a,d)=>{a=isString(a)?a:stringify(a);toBoolean(b.base64gzip)?
print(af.fromBytes2String(af.toBase64Bytes(io.gzip(af.fromString2Bytes(a))))):print(af.fromBytes2String(af.toBase64Bytes(a)))}],["db",(a,d)=>{(!isArray(a)||1>a.length)&&m(-1,"db is only supported for filled arrays/lists");b.dbtable=_$(b.dbtable,"outdbtable").isString().default("data");b.dbnocreate=toBoolean(_$(b.dbnocreate,"outdbnocreate").isString().default("false"));b.dbicase=toBoolean(_$(b.dbicase,"outdbicase").isString().default("false"));ow.loadObj();try{isString(b.dbjdbc)||m(-1,"dbjdbc URL is not defined.");
isDef(b.dblib)&&loadLib("jdbc-"+b.dblib+".js");var c=new DB(b.dbjdbc,b.dbuser,b.dbpass,b.dbtimeout);if(!b.dbnocreate)try{var e=ow.obj.fromObj2DBTableCreate(b.dbtable,a,__,!b.dbicase);c.u(e);c.commit()}catch(l){c.rollback(),m(-1,"Error creating table: "+l)}var f=Object.keys(ow.obj.flatMap(a[0]));var h=b.dbicase?f.join(",").toUpperCase():'"'+f.join('", "')+'"';let n="";var g=a.map(l=>{var q=ow.obj.flatMap(l);l=[];for(var u in f)l.push(q[f[u]]);u=f.map(y=>String(q[y]));l="INSERT INTO "+(b.dbicase?b.dbtable:
'"'+b.dbtable+'"')+" ("+h+") VALUES ("+u.map(y=>"?").join(", ")+")";l.length>n.length&&(n=String(l));return u});c.usArray(n,g,b.dbbatchsize)}catch(n){isDef(c)&&c.rollback(),printErr(n),m(-1,"Error connecting to the database: "+n)}finally{isDef(c)&&(c.commit(),c.close())}}],["sql",(a,d)=>{(!isArray(a)||1>a.length)&&m(-1,"sql is only supported for filled arrays/lists");b.sqltable=_$(b.sqltable,"sqltable").isString().default("data");b.sqlicase=toBoolean(_$(b.sqlicase,"sqlicase").isString().default("false"));
b.sqlnocreate=toBoolean(_$(b.sqlnocreate,"sqlnocreate").isString().default("false"));ow.loadObj();b.sqlnocreate||print(ow.obj.fromObj2DBTableCreate(b.sqltable,a,__,!b.sqlicase)+";\n");var c=Object.keys(ow.obj.flatMap(a[0]));var e=b.sqlicase?c.join(",").toUpperCase():'"'+c.join('", "')+'"';print(a.map(f=>{var h=ow.obj.flatMap(f);f=[];for(var g in c)f.push(h[c[g]]);g=c.map(n=>{n=h[n];isString(n)&&(n="'"+n.replace(/'/g,"''")+"'");isNull(n)&&(n="null");return n});return"INSERT INTO "+(b.sqlicase?b.sqltable:
'"'+b.sqltable+'"')+" ("+e+") VALUES ("+g.join(",")+");"}).join("\n"))}],["xls",(a,d)=>{if(!isString(a)){try{includeOPack("plugin-XLS")}catch(h){m(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}plugin("XLS");if(isMap(a)){ow.loadObj();var c=ow.obj.flatMap(a);var e=Object.keys(c).map(h=>({key:h,value:c[h]}))}isArray(a)&&(e=a);traverse(e,(h,g,n,l)=>{isString(g)&&g.startsWith("=")&&(l[h]="'"+g)});a=!1;d=b.xlsfile;isUnDef(b.xlsfile)&&(a=!0,b.xlsfile=
io.createTempFile("oafp",".xlsx"));d=new XLS(isDef(d)&&io.fileExists(d)?d:__);var f=d.getSheet(_$(b.xlssheet,"xlssheet").isString().default("data"));b.xlsformat=_$(b.xlsformat,"xlsformat").isString().default('(bold: true, borderBottom: "medium", borderBottomColor: "red")');b.xlsformat.trim().startsWith("{")&&(b.xlsformat=jsonParse(b.xlsformat,!0));b.xlsformat.trim().startsWith("(")&&(b.xlsformat=af.fromSLON(b.xlsformat));ow.format.xls.setTable(d,f,"A",1,e,__,b.xlsformat);d.writeFile(b.xlsfile);d.close();
b.xlsopenwait=_$(b.xlsopenwait,"xlsopenwait").isNumber().default(5E3);b.xlsopen=toBoolean(_$(b.xlsopen,"xlsopen").isString().default("true"));b.xlsopen&&(ow.format.isWindows()?($sh("start "+b.xlsfile).exec(),a&&sleep(b.xlsopenwait,!0)):ow.format.getOS().startsWith("Mac")&&($sh("open "+b.xlsfile).exec(),a&&sleep(b.xlsopenwait,!0)))}}]]),x=new Map([["?",(a,d)=>{a=Array.from(x.keys()).filter(c=>"?"!=c).sort();k(a,d)}],["pm",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));isDef(__pm._map)&&
(a=__pm._map);isDef(__pm._list)&&(a=__pm._list);k(a,d)}],["jsonschema",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));a=jsonParse(a,__,__,!0);isMap(a)||m(-1,"jsonschema is only supported with a map.");ow.loadObj();a=ow.obj.schemaSampleGenerator(a);k(a,d)}],["yaml",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));a=af.fromYAML(a);k(a,d)}],["xml",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));b.xmlignored=_$(b.xmlignored,"xmlignored").isString().default(__);
b.xmlprefix=_$(b.xmlprefix,"xmlprefix").isString().default(__);b.xmlfiltertag=toBoolean(_$(b.xmlfiltertag,"xmlfiltertag").isString().default(__));0<=a.indexOf("<?xml")&&(a=a.substring(a.indexOf("?>")+2).trim());0<=a.indexOf("<!DOCTYPE")&&(a=a.substring(a.indexOf(">")+1).trim());a=af.fromXML2Obj(a,b.xmlignored,b.xmlprefix,!b.xmlfiltertag);k(a,d)}],["lines",(a,d)=>{isBoolean(b.linesjoin)||(b.linesjoin=toBoolean(_$(b.linesjoin,"linesjoin").isString().default(__)));printErrnl(_$(void 0).default("(processing data...)"));
let c=__,e=[],f=g=>{g=g.split("\n").map(l=>{let q="",u=0;for(let y=0;y<l.length;y++)if("\t"===l[y]){let J=8-u%8;q+=" ".repeat(J);u+=J}else q+=l[y],u++;return q}).join("\n");if(isUnDef(c))return c=[],isUnDef(b.linesvisualsepre)&&(b.linesvisualsepre=" \\s+"),g.split(new RegExp(b.linesvisualsepre)).forEach(l=>{c.push(l);e.push(g.indexOf(l))}),__;var n={};e.forEach((l,q)=>{n[c[q]]=g.substring(l,q+1<e.length?e[q+1]-1:__).trim()});return n};if(b.linesjoin)if(isDef(b.file)&&isUnDef(b.cmd)&&(a=io.readFileString(b.file)),
isDef(b.cmd)&&(a=t(b.cmd,!0)),a=a.split(/\r?\n/),toBoolean(b.linesvisual)){var h=[];a.forEach(g=>{0!=g.length&&(g=f(g),isDef(g)&&h.push(g))});k(h,d)}else k(a,d);else a=isDef(b.file)&&isUnDef(b.cmd)?io.readFileStream(b.file):isDef(b.cmd)?af.fromBytes2InputStream(t(b.cmd)):af.fromString2InputStream(a),ioStreamReadLines(a,g=>{toBoolean(b.linesvisual)?(g=f(g),isDef(g)&&k(g,clone(d),!0)):k(g,clone(d),!0)}),a.close()}],["ndjson",(a,d)=>{isBoolean(b.ndjsonjoin)||(b.ndjsonjoin=toBoolean(_$(b.ndjsonjoin,"ndjsonjoin").isString().default(__)));
printErrnl(_$(void 0).default("(processing data...)"));global.__ndjsonbuf=__;var c=(f,h)=>{isUnDef(global.__ndjsonbuf)&&0!=f.length&&f.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=f.length&&!f.trim().endsWith("}")){global.__ndjsonbuf+=f.trim();return}0<global.__ndjsonbuf.length&&(f=global.__ndjsonbuf+f,global.__ndjsonbuf=__)}0==f.length||0<f.length&&"{"!=f.trim().substring(0,1)?(h(f),global.__ndjsonbuf=__):h(f)},e=f=>{var h=[];f.split("\n").filter(g=>0<g.length).forEach(g=>
c(g,n=>h.push(jsonParse(n,__,__,toBoolean(b.ndjsonfilter)))));return h};b.ndjsonjoin?(isDef(b.file)&&isUnDef(b.cmd)&&(a=io.readFileString(b.file)),isDef(b.cmd)&&(a=t(b.cmd,!0)),k(e(a),d)):(a=isDef(b.file)&&isUnDef(b.cmd)?io.readFileStream(b.file):isDef(b.cmd)?af.fromBytes2InputStream(t(b.cmd)):af.fromString2InputStream(a),ioStreamReadLines(a,f=>{c(f,h=>k(jsonParse(h,__,__,!0),clone(d),!0))}),a.close())}],["md",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));__conConsole=__ansiColorFlag=
!0;isUnDef(b.format)&&isUnDef(d.__format)&&(b.format="md",d.__format="md");k(a,d)}],["mdtable",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));ow.loadTemplate();a=ow.template.md.fromTable(a);k(a,d)}],["raw",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));k(a,d)}],["ini",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));ow.loadJava();var c=new ow.java.ini;a=isDef(b.file)?c.loadFile(b.file).get():c.load(a).get();k(a,d)}],["sql",(a,d)=>{isString(a)?k(af.fromSQL(a).ast,
d):k(a,d)}],["db",(a,d)=>{if(isString(a)){printErrnl(_$(void 0).default("(processing data...)"));isString(b.indbjdbc)||m(-1,"indbjdbc URL is not defined.");try{isDef(b.indblib)&&loadLib("jdbc-"+b.indblib+".js");var c=new DB(b.indbjdbc,b.indbuser,b.indbpass,b.indbtimeout);c.convertDates(!0);if(toBoolean(b.indbexec)){var e=c.u(a);k({affectedRows:e},d);c.commit()}else e=c.q(a),isMap(e)&&isArray(e.results)?k(e.results,d):m(-1,"Invalid DB result: "+stringify(e))}catch(f){printErr(f.message),isDef(c)&&
c.rollback(),m(-1,"Error executing SQL: "+f.message)}finally{isDef(c)&&(c.rollback(),c.close())}}else m(-1,"db is only supported with a SQL string.")}],["xls",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));try{includeOPack("plugin-XLS")}catch(e){m(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}b.xlssheet=_$(b.xlssheet,"xlssheet").isString().default(0);b.xlsevalformulas=toBoolean(_$(b.xlsevalformulas,"xlsevalformulas").isString().default(!0));
b.xlscol=_$(b.xlscol,"xlscol").isString().default("A");b.xlsrow=_$(b.xlsrow,"xlsrow").isString().default(1);plugin("XLS");if(isDef(b.file)||isDef(b.cmd)){a=new XLS(isDef(b.cmd)?t(b.cmd):b.file);var c=a.getSheet(b.xlssheet);c=a.getTable(c,b.xlsevalformulas,b.xlscol,b.xlsrow);a.close();isDef(c)&&isMap(c)&&(c=c.table);k(c,d)}else m(-1,"XLS is only support with 'file' or 'cmd' defined. Please provide a file=... or a cmd=...")}],["csv",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));if(isDef(b.file)||
isDef(b.cmd)){var c=isDef(b.cmd)?af.fromBytes2InputStream(t(b.cmd)):io.readFileStream(b.file);a=$csv(b.inputcsv).fromInStream(c).toOutArray();c.close()}else a=$csv(b.inputcsv).fromInString(a).toOutArray();k(a,d)}],["hsperf",(a,d)=>{if(isDef(b.file)||isDef(b.cmd)){printErrnl(_$(void 0).default("(processing data...)"));ow.loadJava();var c=isDef(b.cmd)?ow.java.parseHSPerf(t(b.cmd)):ow.java.parseHSPerf(b.file);c.__ts=new Date;var e=0,f=0;c.sun.gc.generation.forEach(h=>{h.space.forEach(g=>{f+=Number(g.used);
e=isNumber(g.capacity)?e+Number(g.capacity):e;c.sun.gc["__percUsed_"+g.name]=100*g.used/g.capacity})});c.sun.gc.__percUsed_meta=100*c.sun.gc.metaspace.used/c.sun.gc.metaspace.capacity;c.sun.gc.__percUsed_ccs=100*c.sun.gc.compressedclassspace.used/c.sun.gc.compressedclassspace.capacity;a=$from(c.sun.gc.collector).equals("name","PSScavenge").at(0);c.sun.gc.__ygc=isDef(a)?Number(a.invocations):0;c.sun.gc.__ygct=isDef(a)?Number(a.time/1E9):0;a=$from(c.sun.gc.collector).equals("name","PSParallelCompact").orEquals("name",
"").at(0);c.sun.gc.__fgc=isDef(a)?Number(a.invocations):0;c.sun.gc.__fgct=isDef(a)?Number(a.time/1E9):0;c.sun.gc.__gct=$from(c.sun.gc.collector).sum("time")/1E9;c.java.__mem={total:e,used:f,free:e-f,metaMax:c.sun.gc.metaspace.maxCapacity,metaTotal:c.sun.gc.metaspace.capacity,metaUsed:c.sun.gc.metaspace.used,metaFree:c.sun.gc.metaspace.capacity-c.sun.gc.metaspace.used};k(c,d)}else m(-1,"hsperf is only supported with either 'file' or 'cmd' defined.")}],["base64",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));
a=toBoolean(b.base64gzip)?af.fromBytes2String(io.gunzip(af.fromBase64(a,!0))):af.fromBytes2String(af.fromBase64(a));k(a,d)}],["llm",(a,d)=>{b.llmenv=_$(b.llmenv,"llmenv").isString().default("OAFP_MODEL");b.llmoptions=_$(b.llmoptions,"llmoptions").isString().default(__);isUnDef(b.llmoptions)&&!isString(getEnv(b.llmenv))&&m(-1,"llmoptions not defined and "+b.llmenv+" not found.");printErrnl(_$(void 0).default("(processing data...)"));var c=$llm(isDef(b.llmoptions)?b.llmoptions:$sec("system","envs").get(b.llmenv));
c="md"==b.output||"mdtable"==b.output||"raw"==b.output?c.prompt(a):c.promptJSON(a);k(jsonParse(c,__,__,isString(c)),d)}],["json",(a,d)=>{printErrnl(_$(void 0).default("(processing data...)"));k(jsonParse(a,__,__,isString(a)),d)}]]),w={};isString(b.libs)&&(b.libs=b.libs.split(",").map(a=>a.trim()).filter(a=>0<a.length));isDef(__flags.OAFP)&&isArray(__flags.OAFP.libs)&&isArray(b.libs)?b.libs=__flags.OAFP.libs.concat(b.libs):b.libs=isDef(__flags.OAFP)?__flags.OAFP.libs:[];isArray(b.libs)&&b.libs.forEach(a=>
{try{var d=require("oafp_"+a+".js");if(isDef(d.oafplib)){var c=d.oafplib(clone(b),k,$o);isMap(c)&&(isArray(c.fileExtensions)&&c.fileExtensions.forEach(e=>{var f=e.ext;e=e.type;C.has(f)?printErr("WARN: Extension '"+f+"' already exists."):C.set(f,e)}),isArray(c.fileExtensionsNoMem)&&c.fileExtensionsNoMem.forEach(e=>{e=e.ext;F.has(e)?printErr("WARN: Extension '"+e+"' already exists."):F.add(e)}),isArray(c.input)&&c.input.forEach(e=>{var f=e.type;e=e.fn;x.has(f)?printErr("WARN: Input type '"+f+"' already exists."):
x.set(f,e)}),isArray(c.inputLine)&&c.inputLine.forEach(e=>{var f=e.type;e=e.fn;isUnDef(_inputLinesFns[f])?G[f]=e:printErr("WARN: Input type '"+f+"' already exists.")}),isArray(c.transform)&&c.transform.forEach(e=>{var f=e.type;e=e.fn;isUnDef(v[f])?v[f]=e:printErr("WARN: Transform '"+f+"' already exists.")}),isArray(c.output)&&c.output.forEach(e=>{var f=e.type;e=e.fn;z.has(f)?printErr("WARN: Output type '"+f+"' already exists."):z.set(f,e)}),isString(c.help)&&(w[a.toLowerCase()]=c.help))}else printErr("WARN: Library '"+
a+"' does not have oafplib.")}catch(e){printErr("WARN: Library '"+a+"' error: "+e)}});(""==b["-h"]||isString(b.help)&&0<b.help.length)&&B();b.format=_$(b.format,"format").isString().default(__);__initializeCon();String(java.lang.System.getProperty("os.name")).match(/Windows/)||__con.getTerminal().settings.set("sane");var H={__format:b.format,__from:b.from,__sql:b.sql,__path:b.path,__csv:b.csv,__pause:b.pause,__key:b.__key};isDef(b.inputcsv)&&(b.inputcsv=b.inputcsv.trim().startsWith("{")?jsonParse(b.inputcsv,
!0):af.fromSLON(b.inputcsv));isDef(b.csv)&&(b.csv=b.csv.trim().startsWith("{")?jsonParse(b.csv,!0):af.fromSLON(b.csv));B=!1;if(""==b["-v"]||isString(b.version)&&0<b.version.length)B=!0,p();var r="",D=!1;if(B)r=p();else if(b.jsonprefix=_$(b.jsonprefix,"jsonprefix").isString().default(__),b.jsondesc=toBoolean(_$(b.jsondesc,"jsondesc").isString().default("false")),isDef(b.file)){if(io.fileExists(b.file)||m(-1,"ERROR: File not found: '"+b.file+"'"),!F.has(b.type))if("json"==b.type||isUnDef(b.type))if(b.jsondesc){var I=
new Set;io.readStreamJSON(b.file,a=>{a=a.substring(2);isDef(b.jsonprefix)?a.startsWith(b.jsonprefix)&&I.add(a):I.add(a);return!1});r=stringify(Array.from(I),__,"")}else isDef(b.jsonprefix)?(p=io.readStreamJSON(b.file,a=>a.substring(2).startsWith(b.jsonprefix)),r=stringify(p,__,"")):r=io.readFileString(b.file);else r=io.readFileString(b.file)}else b.jsondesc&&m(-1,"ERROR: jsondesc only available for file input."),b.jsonprefix&&m(-1,"ERROR: jsonprefix only available for file input."),isDef(b.cmd)?r=
t(b.cmd,!0):"pm"!=b.input&&(r=[],io.pipeLn(a=>{isDef(G[b.type])?G[b.type](E(a),clone(H))&&r.push(a):r.push(a);return!1}),r=r.join("\n"));D||(isUnDef(b.type)&&(isDef(b.file)&&(p=b.file.substring(b.file.lastIndexOf(".")),C.has(p)&&(b.type=C.get(p))),isUnDef(b.type)&&(p=r.trim(),p.startsWith("{")||p.startsWith("[")?b.type="json":p.startsWith("<")?b.type="xml":isString(p)&&0<p.length?1<p.substring(0,p.indexOf("\n")).split(",").length?b.type="csv":p.substring(0,0<p.indexOf(": "))&&(b.type="yaml"):m(-1,
"Please provide the input type."))),isDef(b.type)&&x.has(b.type)?x.get(b.type)(r,H):(isString(b.type)&&printErr("WARN: "+b.type+" input type not supported. Using json."),x.get("json")(r,H)))}};oafp(params);
