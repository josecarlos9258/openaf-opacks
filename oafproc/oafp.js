// (author: Nuno Aguiar, version: 20240317, license: Apache 2.0, url: https://github.com/openaf/oafp)
// ---

const oafp=a=>{if(!isUnDef(a)&&!isDef(a.____ojob)){Object.keys(a).forEach(b=>{var c=b.toLowerCase();b!=c&&isUnDef(a[c])&&(a[c]=a[b],delete a[b])});var I=b=>{for(var c=Object.keys(z),d=0;d<c.length;d++){var f=c[d];isDef(a[f])&&(b=z[f](b))}return b},E=(b,c)=>{c.__ifrom&&(b=$from(b).query(af.fromNLinq(c.__ifrom.trim())),delete c.__ifrom);if(c.__isql){var d=__;if(isString(a.sqlfilter))switch(a.sqlfilter.toLowerCase()){case "simple":d="nlinq";break;case "advanced":d="h2";break;default:d=__}isArray(b)&&
0<b.length&&(b=$sql(b,c.__isql.trim(),d));delete c.__isql}c.__path&&(b=$path(b,c.__path.trim()),delete c.__path);if(isString(b))return I(b);b=I(b);c.__from&&(b=$from(b).query(af.fromNLinq(c.__from.trim())),delete c.__from);if(c.__sql){d=__;if(isString(a.sqlfilter))switch(a.sqlfilter.toLowerCase()){case "simple":d="nlinq";break;case "advanced":d="h2";break;default:d=__}isArray(b)&&0<b.length&&(b=$sql(b,c.__sql.trim(),d));delete c.__sql}c.__opath&&(b=$path(b,c.__opath.trim()),delete c.__opath);return b},
m=(b,c,d)=>{c=clone(c);toBoolean(a.color)&&(__conConsole=!0);b=isString(b)?b.trim().startsWith("{")&&b.trim().endsWith("}")?E(jsonParse(b,__,__,!0),c):E(b,c):d?E([b],c)[0]:E(b,c);isDef(a.outputkey)&&(b=$$({}).set(a.outputkey,b));isDef(a.outkey)&&(b=$$({}).set(a.outkey,b));N();C.has(c.__format)?C.get(c.__format)(b,c):$o(b,c)},y=(b,c)=>{var d=af.fromString2Bytes(""),f=af.newOutputStream();$sh(b).cb((e,h,g)=>{ioStreamCopy(f,e);e=f.toByteArray();0<e.length&&(d=e)}).get();return c?af.fromBytes2String(d):
d},t=b=>{if(!isString(b)||""==b||isNull(b))return"";b=b.trim();return b.startsWith("{")?jsonParse(b,__,__,!0):af.fromSLON(b)},J=(b,c,d)=>{d=_$(d).isString().default("_oafp_fn_");c=splitBySepWithEnc(c," ",[['"','"'],["'","'"]]);let f=[];if(1<c.length){for(let e=0;e<c.length;e++)if(0==e)f.push(c[e]);else{let h=splitBySepWithEnc(c[e],":",[['"','"'],["'","'"]]).map((g,n)=>{if(0==n){if(g.startsWith("-"))return g;global[d+e]=()=>$path(b,g);return d+e}return g}).join(":");f.push(h)}return f.join(" ")}return""},
q=b=>{"grid"==a.out||toBoolean(a.loopcls)||toBoolean(a.chartcls)||printErrnl(_$(b).default("(processing data...)"))},N=b=>{"grid"==a.out||toBoolean(a.loopcls)||toBoolean(a.chartcls)||printErrnl("\r"+" ".repeat(_$(b).default("(processing data...)").length)+"\r")},k=(b,c)=>{isUnDef(c)&&(c="exit: "+b);if(isUnDef(ow.oJob)&&!toBoolean(a.noexit))0!=b&&printErr(c),exit(b);else throw c;},F=()=>{__initializeCon();a.help=_$(a.help,"help").isString().default("");switch(a.help.toLowerCase()){case "filters":var b=
"docs/FILTERS.md";break;case "template":b="docs/TEMPLATE.md";break;case "examples":b="docs/EXAMPLES.md";break;case "readme":case "usage":b="docs/USAGE.md";break;default:b=a.help.toLowerCase(),b=isDef(A[b])?"docs/"+b+".md":"docs/USAGE.md"}var c=(getOPackPath("oafproc")||".")+"/"+b;let d="";if("docs/USAGE.md"==b&&0<Object.keys(A).length){d="\n---\n\n## \ud83d\udcda Libs help documents\n\n| Lib | Help |\n| --- | --- |\n";for(let f in A)d+="| "+f+" | help="+f+" |\n"}isDef(c)&&io.fileExists(c)?(__conConsole=
__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(a.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(c)+d)):print(ow.format.withMD(io.readFileString(c)+d))):isDef(global._oafphelp)&&isDef(global._oafphelp[b])?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(a.pause)?ow.format.string.pauseString(ow.format.withMD(global._oafphelp[b]+d)):print(ow.format.withMD(global._oafphelp[b]+d))):isString(A[a.help])?(__conConsole=__ansiColorFlag=
!0,isDef(ow.format.string.pauseString)&&toBoolean(a.pause)?ow.format.string.pauseString(ow.format.withMD(A[a.help])):print(ow.format.withMD(A[a.help]))):print("Check https://github.com/OpenAF/oafp/blob/master/src/"+b);k(0)},O=()=>{var b=(getOPackPath("oafproc")||".")+"/.package.yaml";b={oafp:{version:io.fileExists(b)?io.readFileYAML(b).version:"(not available/embedded)",inputs:Array.from(B.keys()).filter(c=>"?"!=c).sort(),transforms:Object.keys(z).filter(c=>"transforms"!=c).sort(),outputs:Array.from(C.keys()).filter(c=>
"?"!=c).sort(),flags:__flags.OAFP},openaf:{version:getVersion(),distribution:getDistribution(),home:getOpenAFPath(),opacks:$from($m4a(getOPackLocalDB())).notEquals("name","OpenAF").sort("name").select({name:"",version:""})},java:{version:ow.format.getJavaVersion(),home:ow.format.getJavaHome(),vendor:String(java.lang.System.getProperty("java.vendor")),params:af.fromJavaArray(java.lang.management.ManagementFactory.getRuntimeMXBean().getInputArguments())},os:{name:String(java.lang.System.getProperty("os.name")),
version:String(java.lang.System.getProperty("os.version")),arch:ow.format.getOSArch(),cpuCores:getNumberOfCores(!0),mem:{max:Number(java.lang.Runtime.getRuntime().maxMemory()),total:Number(java.lang.Runtime.getRuntime().totalMemory())},store:{tmpDirPath:String(java.lang.System.getProperty("java.io.tmpdir")),freeTmpDirBytes:Number(java.nio.file.Files.getFileStore(java.nio.file.Paths.get(java.lang.System.getProperty("java.io.tmpdir"))).getUsableSpace())}}};return stringify(b,__,"")};ow.loadFormat();
a.format=a.output||a.format||a.out;a.type=a.input||a.type||a.in;a.out=a.format;a.output=a.format;a.in=a.type;a.input=a.type;if(isUnDef(a.file)&&isUnDef(a.cmd)){let b=__;for(let c in a)if(""===a[c]&&"-debug"!=c){b=c;break}a.file=b}var G=new Map([[".json","json"],[".ndjson","ndjson"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".ini","ini"],[".md","md"],[".xls","xls"],[".xlsx","xls"],[".sql","sql"]]),K=new Set(["csv","ndjson"]),L={lines:(b,c)=>{isBoolean(a.linesjoin)||(a.linesjoin=toBoolean(_$(a.linesjoin,
"linesjoin").isString().default(__)));if(!a.linesjoin&&isString(b))0!=b.trim().length&&(0<b.trim().length&&(b=b.trim().split(/\r?\n/)),m(b,c,!0)),H=!0;else return!0},ndjson:(b,c)=>{isBoolean(a.ndjsonjoin)||(a.ndjsonjoin=toBoolean(_$(a.ndjsonjoin,"ndjsonjoin").isString().default(__)));if(a.ndjsonjoin)return!0;isUnDef(global.__ndjsonbuf)&&0!=b.length&&b.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=b.length&&!b.trim().endsWith("}")){global.__ndjsonbuf+=b.trim();
return}0<global.__ndjsonbuf.length&&(b=global.__ndjsonbuf+b,global.__ndjsonbuf=__)}0==b.length||0<b.length&&"{"!=b.trim().substring(0,1)?(m(jsonParse(global.__ndjsonbuf,__,__,!0),c,!0),H=!0,global.__ndjsonbuf=__):(m(jsonParse(b,__,__,!0),c,!0),H=!0)}},z={transforms:b=>{if(toBoolean(a.transforms))return Object.keys(z).filter(c=>"transforms"!=c).sort()},cmlt:b=>{if(toBoolean(a.cmlt)){b=isArray(b)?b:[b];a.cmltch=_$(a.cmltch,"cmltch").default("(type: simple)");var c=t(a.cmltch);if(isMap(c))return isUnDef(c.type)&&
k(-1,"cmltch.type is not defined."),isDef(c.lib)&&loadLib(c.lib),0>$ch().list().indexOf("oafp::cmltdata")&&("remote"==c.type?$ch("oafp::cmltdata").createRemote(c.url):$ch("oafp::cmltdata").create(c.type,c.options),c=Number(_$(a.cmltsize,"cmltsize").isNumber().default(100))-1,0<c&&$ch("oafp::cmltdata").subscribe(ow.ch.utils.getHousekeepSubscriber("oafp::cmltdata",c))),b.forEach(d=>$ch("oafp::cmltdata").set({t:nowNano()},d)),$ch("oafp::cmltdata").getAll();k(-1,"Invalid cmltch parameter")}},diff:b=>
{var c=t(a.diff);if(isMap(c)){(isUnDef(c.filea)||isUnDef(c.fileb)||isUnDef(c.a)||isUnDef(c.b))&&k(-1,"diff.a path and diff.b path are required.");loadDiff();let d=$path(b,c.a);b=$path(b,c.b);let f=__;toBoolean(a.color)&&(isUnDef(a.difftheme)&&isDef(getEnv("OAFP_DIFFTHEME"))&&(a.difftheme=getEnv("OAFP_DIFFTHEME")),f=t(_$(a.difftheme,"difftheme").isString().default("")),f=merge({added:"GREEN",removed:"RED",common:"FAINT",linenum:"ITALIC",linediv:"FAINT",linesep:"|"},f));let e=(h,g)=>{if(toBoolean(a.color)){isUnDef(g)&&
(g="");var n=new Set;if(isArray(h)){let l=1,r=toBoolean(a.diffnlines),v=0;r&&(h.forEach(w=>{v+=w.value.split("\n").length}),v=String(v).length+1);let x=w=>{let u;u=r&&""!=g?ansiColor(f.linenum,0<w?$ft("% "+v+"d",l):" ".repeat(v))+ansiColor(f.linediv,`${f.linesep}`):"";l+=w;return u};h.forEach((w,u)=>{u=w.value;isString(u)&&(""!=g?(u=u.split(g),""==u[u.length-1]&&u.pop()):u=[u]);n.add(w.added?u.map(D=>x(1)+ansiColor(f.added,(""!=g?"+":"")+D)).join(ansiColor("RESET",g)):w.removed?u.map(D=>x(0)+ansiColor(f.removed,
(""!=g?"-":"")+D)).join(ansiColor("RESET",g)):u.map(D=>x(1)+ansiColor(f.common,(""!=g?" ":"")+D)).join(ansiColor("RESET",g)))})}return Array.from(n).join(ansiColor("RESET",g))}return $from(h).select({count:__,added:!1,removed:!1,value:[]})};return isString(d)||isString(b)?toBoolean(a.diffwords)?e(JsDiff.diffWords(d,b,c.options)):toBoolean(a.diffwordswithspace)?e(JsDiff.diffWordsWithSpace(d,b,c.options)):toBoolean(a.difflines)?e(JsDiff.diffLines(d,b,c.options),"\n"):toBoolean(a.diffsentences)?e(JsDiff.diffSentences(d,
b,c.options),"\n"):e(JsDiff.diffChars(d,b,c.options)):isArray(d)&&isArray(b)&&!toBoolean(a.color)?e(JsDiff.diffArrays(d,b,c.options)):e(JsDiff.diffJson(d,b,c.options),"\n")}},jsonschemagen:b=>{if(toBoolean(a.jsonschemagen))return ow.loadObj(),ow.obj.schemaGenerator(b)},jsonschemacmd:b=>z.jsonschema(b),jsonschema:b=>{isMap(b)||k(-1,"jsonschema is only supported with a map.");isUnDef(a.jsonschema)&&isUnDef(a.jsonschemacmd)&&k(-1,"You need to provide a jsonschema=someFile.json or jsonschemacmd=someCommand");
ow.loadObj();var c;if(isDef(a.jsonschemacmd)){var d=$sh(a.jsonschemacmd).getJson(0);0==d.exitcode?c=d.stdout:k(-1,"Error executing the command '"+a.jsonschemacmd+"': "+d.stderr)}else c=io.readFileJSON(a.jsonschema);isMap(c)||k(-1,"The schema provided is not a valid JSON schema.");ow.obj.schemaInit({allErrors:!0});c=ow.obj.schemaCompile(c);return{valid:c(b),errors:c.errors}},sortmapkeys:b=>{if(toBoolean(a.sortmapkeys)&&isObject(b)){let c=(d,f)=>{let e=Object.keys(d).sort(),h={};for(let g=0;g<e.length;g++){let n=
e[g],l=d[n];Array.isArray(l)?h[n]=l.map(r=>"object"===typeof r&&null!==r&&void 0!==r?sortMapKeys(r,f):r):h[n]=f&&"object"===typeof l&&null!==l&&void 0!==l?c(l,f):l}return h};return c(b,!0)}return b},searchkeys:b=>isObject(b)?searchKeys(b,a.searchkeys):b,searchvalues:b=>isObject(b)?searchValues(b,a.searchvalues):b,maptoarray:b=>toBoolean(a.maptoarray)&&isMap(b)?$m4a(b,a.maptoarraykey):b,arraytomap:b=>toBoolean(a.arraytomap)&&isArray(b)?$a4m(b,a.arraytomapkey,toBoolean(a.arraytomapkeepkey)):b,flatmap:b=>
toBoolean(a.flatmap)&&isObject(b)?ow.loadObj().flatMap(b,a.flatmapkey):b,merge:b=>{if(toBoolean(a.merge)&&isArray(b)&&1<b.length){for(var c,d=0;d<b.length;d++)c=0==d?b[d]:merge(c,b[d]);return c}return b},correcttypes:b=>{toBoolean(a.correcttypes)&&isObject(b)&&traverse(b,(c,d,f,e)=>{switch(descType(d)){case "number":isString(d)&&(e[c]=Number(d));break;case "string":"true"==d.trim().toLowerCase()||"false"==d.trim().toLowerCase()?e[c]=toBoolean(d):d.trim().match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)?
e[c]=new Date(d):d.trim().match(/^\d{4}-\d{2}-\d{2}$/)?e[c]=new Date(d):d.trim().match(/^\d{2}:\d{2}:\d{2}$/)?e[c]=new Date(d):d.trim().match(/^\d{2}:\d{2}$/)&&(e[c]=new Date(d))}});return b},removenulls:b=>{toBoolean(a.removenulls)&&traverse(b,(c,d,f,e)=>{(isNull(d)||isUnDef(d))&&delete e[c]});return b},removedups:b=>{if(toBoolean(a.removedups)){if(isArray(b)){var c=new Set,d=[];b.forEach(f=>{var e=f;isObject(f)&&(e=sortMapKeys(e));e=stringify(e,__,!0);c.has(e)||(c.add(e),d.push(f))});return d}k(-1,
"removedups is only supported for arrays")}return b},llmprompt:b=>{if(isString(a.llmprompt)){a.llmenv=_$(a.llmenv,"llmenv").isString().default("OAFP_MODEL");a.llmoptions=_$(a.llmoptions,"llmoptions").isString().default(__);var c=$llm(isDef(a.llmoptions)?a.llmoptions:$sec("system","envs").get(a.llmenv));isDef(a.llmconversation)&&io.fileExists(a.llmconversation)&&c.getGPT().setConversation(io.readFileJSON(a.llmconversation));var d="json",f=!0;isString(a.input)&&("md"==a.input&&(d="markdown",f=!1),"mdtable"==
a.input&&(d="markdown table",f=!1),"hsperf"==a.input&&(d="java hsperf file"),"raw"==a.input&&(d="raw",f=!1));c=c.withContext(f?stringify(b,__,!0):b,isDef(a.llmcontext)?a.llmcontext:`${d} input data`);if(isString(a.output)&&("md"==a.output||"mdtable"==a.output||"raw"==a.output))return b=c.prompt(a.llmprompt),isDef(a.llmconversation)&&io.writeFileJSON(a.llmconversation,c.getGPT().getConversation(),""),b;b=c.promptJSON(a.llmprompt);isDef(a.llmconversation)&&io.writeFileJSON(a.llmconversation,c.getGPT().getConversation(),
"");return b}return b},splitlines:b=>toBoolean(a.splitlines)&&isString(b)?b.split(/\r?\n/):b},C=new Map([["?",(b,c)=>{b=Array.from(C.keys()).filter(d=>"?"!=d).sort();$o(b,c)}],["pm",(b,c)=>{$o(b,c)}],["key",(b,c)=>{$o(b,c)}],["html",(b,c)=>{let d;c=!1;a.htmlopen=toBoolean(_$(a.htmlopen,"htmlopen").isString().default("true"));a.htmlwait=_$(a.htmlwait,"htmlwait").isNumber().default(2500);a.htmlopen&&(d=io.createTempFile("oafp_",".html"));ow.loadTemplate();isString(b)?(b=ow.template.html.genStaticVersion(ow.template.parseMD2HTML(b,
!toBoolean(a.htmlpart),!toBoolean(a.htmlcompact))),b=b.replace("<html>",'<html><meta charset="utf-8">')):(b=ow.template.html.parseMap(b,!0),b='<html><meta charset="utf-8"><style>'+b.css+"</style><body>"+b.out+"</body></html>");a.htmlopen&&(io.writeFileString(d,b),c=openInBrowser("file:///"+d.replace(/\\/g,"/")));c?sleep(a.htmlwait,!0):print(b)}],["ctable",(b,c)=>{$o(b,c)}],["stable",(b,c)=>{$o(b,c)}],["table",(b,c)=>{$o(b,c)}],["log",(b,c)=>{if(isString(b)&&toBoolean(a.logprintall))print(b.replace(/\n$/,
""));else if(c=b,isMap(b)&&(c=[b]),isArray(c)){isUnDef(a.logtheme)&&isDef(getEnv("OAFP_LOGTHEME"))&&(a.logtheme=getEnv("OAFP_LOGTHEME"));let d=t(_$(a.logtheme,"logtheme").isString().default(""));d=merge({errorLevel:"RED,BOLD",warnLevel:"YELLOW",timestamp:"BOLD"},d);c.forEach(f=>{if(isMap(f)){let e=isDef(f["@timestamp"])?f["@timestamp"]:__,h=isDef(f.level)?f.level:__;f=isDef(f.message)?f.message:__;let g;isDef(h)&&(0<=h.toLowerCase().indexOf("err")&&(g=d.errorLevel),0<=h.toLowerCase().indexOf("warn")&&
(g=d.warnLevel));isDef(e)&&24<e.length&&(e=e.substring(0,23)+"Z");(isDef(f)||isDef(e))&&print(ansiColor(d.timestamp,e)+(isDef(h)?" | "+ansiColor(g,h):"")+" | "+ansiColor(g,f))}})}}],["raw",(b,c)=>{isString(b)?print(b):sprint(b)}],["ini",(b,c)=>{isString(b)||(ow.loadJava(),c=new ow.java.ini,print(c.put(b).save()))}],["mdyaml",(b,c)=>{isArray(b)?b.forEach((d,f)=>{$o(d,merge(c,{__format:"yaml"}));f<b.length-1&&print("---\n")}):$o(b,merge(c,{__format:"yaml"}))}],["mdtable",(b,c)=>{isArray(b)&&(ow.loadTemplate(),
print(ow.template.md.table(b)))}],["template",(b,c)=>{isString(b)||(ow.loadTemplate(),ow.template.addConditionalHelpers(),ow.template.addOpenAFHelpers(),ow.template.addFormatHelpers(),isUnDef(a.template)&&k(-1,"For output=handlebars you need to provide a template=someFile.hbs"),tprint(io.readFileString(a.template),b))}],["openmetrics",(b,c)=>{isString(b)||(ow.loadMetrics(),b=ow.metrics.fromObj2OpenMetrics(b,a.metricsprefix,a.metricstimestamp),b=b.split("\n").map(d=>{0<=d.indexOf('{_id="')&&(d=d.replace(/{_id="\d+",/,
"{"));0<=d.indexOf(',_id="')&&(d=d.replace(/,_id="\d+"}/,"}"));0<=d.indexOf('_id="')&&(d=d.replace(/,_id="\d+",/,","));return d}).join("\n"),$o(b,c))}],["pjson",(b,c)=>{c.__format="prettyjson";$o(b,c)}],["base64",(b,c)=>{b=isString(b)?b:stringify(b);toBoolean(a.base64gzip)?print(af.fromBytes2String(af.toBase64Bytes(io.gzip(af.fromString2Bytes(b))))):print(af.fromBytes2String(af.toBase64Bytes(b)))}],["grid",(b,c)=>{isUnDef(a.grid)&&k(-1,"For output=grid you need to provide a grid=...");c=t(_$(a.grid,
"grid").isString().$_());isArray(c)&&0<c.length&&isArray(c[0])?(c.forEach((d,f)=>{d.forEach((e,h)=>{if("chart"==e.type||"bar"==e.type)h="_chrt"+(f+1)+"."+(h+1),e.obj=("chart"==e.type?h+" ":"")+J(b,e.obj,h),isUnDef(e.title)&&(e.title="Chart "+h);isDef(e.path)&&(e.obj=$path(b,e.path),isUnDef(e.title)&&(e.title=e.path))})}),c=ow.format.string.grid(c,__,__," ",!0),print(c)):k(-1,"Invalid grid parameter: '"+stringify(a.grid,__,"")+"'")}],["chart",(b,c)=>{isUnDef(a.chart)&&k(-1,'For output=chart you need to provide a chart="<units> [<path[:color][:legend]>...]"');
isUnDef(splitBySepWithEnc)&&k(-1,"Output=chart is not supported in this version of OpenAF");b=J(b,a.chart);0<b.length&&(toBoolean(a.chartcls)&&cls(),print(printChart("oafp "+b)))}],["ch",(b,c)=>{isUnDef(a.ch)&&k(-1,'For output=ch you need to provide a ch="(type: ...)"');isUnDef(a.chkey)&&k(-1,'For output=ch you need to provide a chkey="key1, key2"');b=isMap(b)?[b]:b;a.ch=t(a.ch);isMap(a.ch)?(isUnDef(a.ch.type)&&k(-1,"ch.type is not defined."),isDef(a.ch.lib)&&loadLib(a.ch.lib),"remote"==a.ch.type?
$ch("oafp::outdata").createRemote(a.ch.url):$ch("oafp::outdata").create(a.ch.type,a.ch.options),toBoolean(a.chunset)?$ch("oafp::outdata").unsetAll(a.chkey.split(",").map(d=>d.trim()),b):$ch("oafp::outdata").setAll(a.chkey.split(",").map(d=>d.trim()),b),$ch("oafp::outdata").destroy()):k(-1,"Invalid ch parameter")}],["db",(b,c)=>{(!isArray(b)||1>b.length)&&k(-1,"db is only supported for filled arrays/lists");a.dbtable=_$(a.dbtable,"outdbtable").isString().default("data");a.dbnocreate=toBoolean(_$(a.dbnocreate,
"outdbnocreate").isString().default("false"));a.dbicase=toBoolean(_$(a.dbicase,"outdbicase").isString().default("false"));a.dbbatchsize=_$(a.dbbatchsize,"dbbatchsize").isNumber().default(__);ow.loadObj();try{isString(a.dbjdbc)||k(-1,"dbjdbc URL is not defined.");isDef(a.dblib)&&loadLib("jdbc-"+a.dblib+".js");var d=new DB(a.dbjdbc,a.dbuser,a.dbpass,a.dbtimeout);if(!a.dbnocreate)try{var f=ow.obj.fromObj2DBTableCreate(a.dbtable,b,__,!a.dbicase);d.u(f);d.commit()}catch(l){d.rollback(),k(-1,"Error creating table: "+
l)}var e=Object.keys(ow.obj.flatMap(b[0]));var h=a.dbicase?e.join(",").toUpperCase():'"'+e.join('", "')+'"';let n="";var g=b.map(l=>{var r=ow.obj.flatMap(l);l=[];for(var v in e)l.push(r[e[v]]);v=e.map(x=>String(r[x]));l="INSERT INTO "+(a.dbicase?a.dbtable:'"'+a.dbtable+'"')+" ("+h+") VALUES ("+v.map(x=>"?").join(", ")+")";l.length>n.length&&(n=String(l));return v});d.usArray(n,g,a.dbbatchsize)}catch(n){isDef(d)&&d.rollback(),printErr(n),k(-1,"Error connecting to the database: "+n)}finally{isDef(d)&&
(d.commit(),d.close())}}],["sql",(b,c)=>{(!isArray(b)||1>b.length)&&k(-1,"sql is only supported for filled arrays/lists");a.sqltable=_$(a.sqltable,"sqltable").isString().default("data");a.sqlicase=toBoolean(_$(a.sqlicase,"sqlicase").isString().default("false"));a.sqlnocreate=toBoolean(_$(a.sqlnocreate,"sqlnocreate").isString().default("false"));ow.loadObj();a.sqlnocreate||print(ow.obj.fromObj2DBTableCreate(a.sqltable,b,__,!a.sqlicase)+";\n");var d=Object.keys(ow.obj.flatMap(b[0]));var f=a.sqlicase?
d.join(",").toUpperCase():'"'+d.join('", "')+'"';print(b.map(e=>{var h=ow.obj.flatMap(e);e=[];for(var g in d)e.push(h[d[g]]);g=d.map(n=>{n=h[n];isString(n)&&(n="'"+n.replace(/'/g,"''")+"'");isNull(n)&&(n="null");return n});return"INSERT INTO "+(a.sqlicase?a.sqltable:'"'+a.sqltable+'"')+" ("+f+") VALUES ("+g.join(",")+");"}).join("\n"))}],["xls",(b,c)=>{if(!isString(b)){try{includeOPack("plugin-XLS")}catch(h){k(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}plugin("XLS");
if(isMap(b)){ow.loadObj();var d=ow.obj.flatMap(b);var f=Object.keys(d).map(h=>({key:h,value:d[h]}))}isArray(b)&&(f=b);traverse(f,(h,g,n,l)=>{isString(g)&&g.startsWith("=")&&(l[h]="'"+g)});b=!1;c=a.xlsfile;isUnDef(a.xlsfile)&&(b=!0,a.xlsfile=io.createTempFile("oafp",".xlsx"));c=new XLS(isDef(c)&&io.fileExists(c)?c:__);var e=c.getSheet(_$(a.xlssheet,"xlssheet").isString().default("data"));a.xlsformat=_$(a.xlsformat,"xlsformat").isString().default('(bold: true, borderBottom: "medium", borderBottomColor: "red")');
a.xlsformat=t(a.xlsformat);ow.format.xls.setTable(c,e,"A",1,f,__,a.xlsformat);c.writeFile(a.xlsfile);c.close();a.xlsopenwait=_$(a.xlsopenwait,"xlsopenwait").isNumber().default(5E3);a.xlsopen=toBoolean(_$(a.xlsopen,"xlsopen").isString().default("true"));a.xlsopen&&(ow.format.isWindows()?($sh("start "+a.xlsfile).exec(),b&&sleep(a.xlsopenwait,!0)):ow.format.getOS().startsWith("Mac")&&($sh("open "+a.xlsfile).exec(),b&&sleep(a.xlsopenwait,!0)))}}]]),B=new Map([["?",(b,c)=>{b=Array.from(B.keys()).filter(d=>
"?"!=d).sort();m(b,c)}],["pm",(b,c)=>{q();isDef(__pm._map)&&(b=__pm._map);isDef(__pm._list)&&(b=__pm._list);m(b,c)}],["jsonschema",(b,c)=>{q();b=jsonParse(b,__,__,!0);isMap(b)||k(-1,"jsonschema is only supported with a map.");ow.loadObj();b=ow.obj.schemaSampleGenerator(b);m(b,c)}],["yaml",(b,c)=>{q();b=af.fromYAML(b);m(b,c)}],["xml",(b,c)=>{q();a.xmlignored=_$(a.xmlignored,"xmlignored").isString().default(__);a.xmlprefix=_$(a.xmlprefix,"xmlprefix").isString().default(__);a.xmlfiltertag=toBoolean(_$(a.xmlfiltertag,
"xmlfiltertag").isString().default(__));0<=b.indexOf("<?xml")&&(b=b.substring(b.indexOf("?>")+2).trim());0<=b.indexOf("<!DOCTYPE")&&(b=b.substring(b.indexOf(">")+1).trim());b=af.fromXML2Obj(b,a.xmlignored,a.xmlprefix,!a.xmlfiltertag);m(b,c)}],["lines",(b,c)=>{isBoolean(a.linesjoin)||(a.linesjoin=toBoolean(_$(a.linesjoin,"linesjoin").isString().default(__)));q();let d=__,f=[],e=g=>{g=g.split("\n").map(l=>{let r="",v=0;for(let x=0;x<l.length;x++)if("\t"===l[x]){let w=8-v%8;r+=" ".repeat(w);v+=w}else r+=
l[x],v++;return r}).join("\n");if(isUnDef(d))return d=[],lastPos=0,isUnDef(a.linesvisualsepre)&&(a.linesvisualsepre=" \\s+"),g.split(new RegExp(a.linesvisualsepre)).forEach(l=>{d.push(l);l=g.substring(lastPos).match(new RegExp(ow.format.escapeRE(l)+"("+a.linesvisualsepre+"|$)"));!isNull(l)&&isDef(l.index)?(f.push(lastPos+l.index),lastPos=l.index):k(-1,"Problem with linesvisual to find header positioning.")}),__;var n={};f.forEach((l,r)=>{n[d[r]]=g.substring(l,r+1<f.length?f[r+1]-1:__).trim()});return n};
if(a.linesjoin)if(isDef(a.file)&&isUnDef(a.cmd)&&(b=io.readFileString(a.file)),isDef(a.cmd)&&(b=y(a.cmd,!0)),b=b.split(/\r?\n/),toBoolean(a.linesvisual)){var h=[];b.forEach(g=>{0!=g.length&&(g=e(g),isDef(g)&&h.push(g))});m(h,c)}else m(b,c);else b=isDef(a.file)&&isUnDef(a.cmd)?io.readFileStream(a.file):isDef(a.cmd)?af.fromBytes2InputStream(y(a.cmd)):af.fromString2InputStream(b),ioStreamReadLines(b,g=>{toBoolean(a.linesvisual)?(g=e(g),isDef(g)&&m(g,clone(c),!0)):m(g,clone(c),!0)}),b.close()}],["ndjson",
(b,c)=>{isBoolean(a.ndjsonjoin)||(a.ndjsonjoin=toBoolean(_$(a.ndjsonjoin,"ndjsonjoin").isString().default(__)));q();global.__ndjsonbuf=__;var d=(e,h)=>{isUnDef(global.__ndjsonbuf)&&0!=e.length&&e.trim().startsWith("{")&&(global.__ndjsonbuf="");if(isDef(global.__ndjsonbuf)){if(0!=e.length&&!e.trim().endsWith("}")){global.__ndjsonbuf+=e.trim();return}0<global.__ndjsonbuf.length&&(e=global.__ndjsonbuf+e,global.__ndjsonbuf=__)}0==e.length||0<e.length&&"{"!=e.trim().substring(0,1)?(h(e),global.__ndjsonbuf=
__):h(e)},f=e=>{var h=[];e.split("\n").filter(g=>0<g.length).forEach(g=>d(g,n=>h.push(jsonParse(n,__,__,toBoolean(a.ndjsonfilter)))));return h};a.ndjsonjoin?(isDef(a.file)&&isUnDef(a.cmd)&&(b=io.readFileString(a.file)),isDef(a.cmd)&&(b=y(a.cmd,!0)),m(f(b),c)):(b=isDef(a.file)&&isUnDef(a.cmd)?io.readFileStream(a.file):isDef(a.cmd)?af.fromBytes2InputStream(y(a.cmd)):af.fromString2InputStream(b),ioStreamReadLines(b,e=>{d(e,h=>m(jsonParse(h,__,__,!0),clone(c),!0))}),b.close())}],["md",(b,c)=>{q();__conConsole=
__ansiColorFlag=!0;isUnDef(a.format)&&isUnDef(c.__format)&&(a.format="md",c.__format="md");m(b,c)}],["mdtable",(b,c)=>{q();ow.loadTemplate();b=ow.template.md.fromTable(b);m(b,c)}],["raw",(b,c)=>{q();m(b,c)}],["ini",(b,c)=>{q();ow.loadJava();var d=new ow.java.ini;b=isDef(a.file)?d.loadFile(a.file).get():d.load(b).get();m(b,c)}],["sql",(b,c)=>{isString(b)?m(af.fromSQL(b).ast,c):m(b,c)}],["openmetrics",(b,c)=>{isString(b)?(ow.loadMetrics(),m(ow.metrics.fromOpenMetrics2Array(b),c)):m(b,c)}],["ch",(b,
c)=>{q();isUnDef(a.inch)&&k(-1,"inch is not defined.");a.inch=t(a.inch);if(isMap(a.inch)){isUnDef(a.inch.type)&&k(-1,"inch.type is not defined.");isDef(a.inch.lib)&&loadLib(a.inch.lib);"remote"==a.inch.type?$ch("oafp::indata").createRemote(a.inch.url):$ch("oafp::indata").create(a.inch.type,a.inch.options);var d=t(b);toBoolean(a.inchall)||0==b.trim().length?m($ch("oafp::indata").getAll(isMap(d)?d:__),c):m($ch("oafp::indata").get(isMap(d)?d:__),c);$ch("oafp::indata").destroy()}else k(-1,"inch is not a valid map.")}],
["db",(b,c)=>{if(isString(b)){q();isString(a.indbjdbc)||k(-1,"indbjdbc URL is not defined.");try{isDef(a.indblib)&&loadLib("jdbc-"+a.indblib+".js");var d=new DB(a.indbjdbc,a.indbuser,a.indbpass,a.indbtimeout);d.convertDates(!0);if(toBoolean(a.indbexec)){var f=d.u(b);m({affectedRows:f},c);d.commit()}else f=d.q(b),isMap(f)&&isArray(f.results)?m(f.results,c):k(-1,"Invalid DB result: "+stringify(f))}catch(e){printErr(e.message),isDef(d)&&d.rollback(),k(-1,"Error executing SQL: "+e.message)}finally{isDef(d)&&
(d.rollback(),d.close())}}else k(-1,"db is only supported with a SQL string.")}],["xls",(b,c)=>{q();try{includeOPack("plugin-XLS")}catch(f){k(-1,"plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)")}a.xlssheet=_$(a.xlssheet,"xlssheet").isString().default(0);a.xlsevalformulas=toBoolean(_$(a.xlsevalformulas,"xlsevalformulas").isString().default(!0));a.xlscol=_$(a.xlscol,"xlscol").isString().default("A");a.xlsrow=_$(a.xlsrow,"xlsrow").isString().default(1);
plugin("XLS");if(isDef(a.file)||isDef(a.cmd)){b=new XLS(isDef(a.cmd)?y(a.cmd):a.file);var d=b.getSheet(a.xlssheet);d=b.getTable(d,a.xlsevalformulas,a.xlscol,a.xlsrow);b.close();isDef(d)&&isMap(d)&&(d=d.table);m(d,c)}else k(-1,"XLS is only support with 'file' or 'cmd' defined. Please provide a file=... or a cmd=...")}],["csv",(b,c)=>{q();if(isDef(a.file)||isDef(a.cmd)){var d=isDef(a.cmd)?af.fromBytes2InputStream(y(a.cmd)):io.readFileStream(a.file);b=$csv(a.inputcsv).fromInStream(d).toOutArray();d.close()}else b=
$csv(a.inputcsv).fromInString(b).toOutArray();m(b,c)}],["hsperf",(b,c)=>{if(isDef(a.file)||isDef(a.cmd)){q();ow.loadJava();var d=isDef(a.cmd)?ow.java.parseHSPerf(y(a.cmd)):ow.java.parseHSPerf(a.file);d.__ts=new Date;var f=0,e=0;d.sun.gc.generation.forEach(h=>{h.space.forEach(g=>{e+=Number(g.used);f=isNumber(g.capacity)?f+Number(g.capacity):f;d.sun.gc["__percUsed_"+g.name]=100*g.used/g.capacity})});d.sun.gc.__percUsed_meta=100*d.sun.gc.metaspace.used/d.sun.gc.metaspace.capacity;d.sun.gc.__percUsed_ccs=
100*d.sun.gc.compressedclassspace.used/d.sun.gc.compressedclassspace.capacity;b=$from(d.sun.gc.collector).equals("name","PSScavenge").at(0);d.sun.gc.__ygc=isDef(b)?Number(b.invocations):0;d.sun.gc.__ygct=isDef(b)?Number(b.time/1E9):0;b=$from(d.sun.gc.collector).equals("name","PSParallelCompact").orEquals("name","").at(0);d.sun.gc.__fgc=isDef(b)?Number(b.invocations):0;d.sun.gc.__fgct=isDef(b)?Number(b.time/1E9):0;d.sun.gc.__gct=$from(d.sun.gc.collector).sum("time")/1E9;d.java.__mem={total:f,used:e,
free:f-e,metaMax:d.sun.gc.metaspace.maxCapacity,metaTotal:d.sun.gc.metaspace.capacity,metaUsed:d.sun.gc.metaspace.used,metaFree:d.sun.gc.metaspace.capacity-d.sun.gc.metaspace.used};m(d,c)}else k(-1,"hsperf is only supported with either 'file' or 'cmd' defined.")}],["base64",(b,c)=>{q();b=toBoolean(a.base64gzip)?af.fromBytes2String(io.gunzip(af.fromBase64(b,!0))):af.fromBytes2String(af.fromBase64(b));m(b,c)}],["llm",(b,c)=>{a.llmenv=_$(a.llmenv,"llmenv").isString().default("OAFP_MODEL");a.llmoptions=
_$(a.llmoptions,"llmoptions").isString().default(__);isUnDef(a.llmoptions)&&!isString(getEnv(a.llmenv))&&k(-1,"llmoptions not defined and "+a.llmenv+" not found.");q();var d=$llm(isDef(a.llmoptions)?a.llmoptions:$sec("system","envs").get(a.llmenv));isDef(a.llmconversation)&&io.fileExists(a.llmconversation)&&d.getGPT().setConversation(io.readFileJSON(a.llmconversation));b="md"==a.output||"mdtable"==a.output||"raw"==a.output?d.prompt(b):d.promptJSON(b);isDef(a.llmconversation)&&io.writeFileJSON(a.llmconversation,
d.getGPT().getConversation(),"");m(jsonParse(b,__,__,isString(b)),c)}],["slon",(b,c)=>{q();m(af.fromSLON(b),c)}],["json",(b,c)=>{q();m(jsonParse(b,__,__,isString(b)),c)}]]),A={};isString(a.libs)&&(a.libs=a.libs.split(",").map(b=>b.trim()).filter(b=>0<b.length));isDef(__flags.OAFP)&&isArray(__flags.OAFP.libs)&&isArray(a.libs)?a.libs=__flags.OAFP.libs.concat(a.libs):a.libs=isDef(__flags.OAFP)?__flags.OAFP.libs:[];isArray(a.libs)&&a.libs.forEach(b=>{try{var c=require("oafp_"+b+".js");if(isDef(c.oafplib)){var d=
c.oafplib(clone(a),m,$o,{_runCmd2Bytes:y,_fromJSSLON:t,_msg:"(processing data...)",_showTmpMsg:q,_clearTmpMsg:N,_chartPathParse:J,_exit:k});isMap(d)&&(isArray(d.fileExtensions)&&d.fileExtensions.forEach(f=>{var e=f.ext;f=f.type;G.has(e)?printErr("WARN: Extension '"+e+"' already exists."):G.set(e,f)}),isArray(d.fileExtensionsNoMem)&&d.fileExtensionsNoMem.forEach(f=>{f=f.ext;K.has(f)?printErr("WARN: Extension '"+f+"' already exists."):K.add(f)}),isArray(d.input)&&d.input.forEach(f=>{var e=f.type;f=
f.fn;B.has(e)?printErr("WARN: Input type '"+e+"' already exists."):B.set(e,f)}),isArray(d.inputLine)&&d.inputLine.forEach(f=>{var e=f.type;f=f.fn;isUnDef(_inputLinesFns[e])?L[e]=f:printErr("WARN: Input type '"+e+"' already exists.")}),isArray(d.transform)&&d.transform.forEach(f=>{var e=f.type;f=f.fn;isUnDef(z[e])?z[e]=f:printErr("WARN: Transform '"+e+"' already exists.")}),isArray(d.output)&&d.output.forEach(f=>{var e=f.type;f=f.fn;C.has(e)?printErr("WARN: Output type '"+e+"' already exists."):C.set(e,
f)}),isString(d.help)&&(A[b.toLowerCase()]=d.help))}else printErr("WARN: Library '"+b+"' does not have oafplib.")}catch(f){printErr("WARN: Library '"+b+"' error: "+f)}});(""==a["-h"]||isString(a.help)&&0<a.help.length)&&F();a.format=_$(a.format,"format").isString().default(__);__initializeCon();String(java.lang.System.getProperty("os.name")).match(/Windows/)||__con.getTerminal().settings.set("sane");if(isDef(a.secKey)){toBoolean(a.secEnv)&&(a.secRepo="system",a.secBucket="envs");a.secRepo=_$(a.secRepo,
"secRepo").isString().default(getEnv("OAFP_SECREPO"));a.secBucket=_$(a.secBucket,"secBucket").isString().default(getEnv("OAFP_SECBUCKET"));a.secPass=_$(a.secPass,"secPass").isString().default(getEnv("OAFP_SECPASS"));a.secMainPass=_$(a.secMainPass,"secMainPass").isString().default(getEnv("OAFP_SECMAINPASS"));a.secFile=_$(a.secFile,"secFile").isString().default(getEnv("OAFP_SECFILE"));let b=$sec(a.secRepo,a.secBucket,a.secPass,a.secMainPass,a.secFile).get(secKey);isDef(b)&&Object.keys(b).forEach(c=>
a[c]=b[c])}var M={__format:a.format,__from:a.from,__ifrom:a.ifrom,__isql:a.isql,__sql:a.sql,__path:a.path,__opath:a.opath,__csv:a.csv,__pause:a.pause,__key:a.__key};isDef(a.inputcsv)&&(a.inputcsv=t(a.inputcsv));isDef(a.incsv)&&(a.incsv=t(a.incsv));isDef(a.csv)&&(a.csv=t(a.csv));var P=!1;if(""==a["-v"]||isString(a.version)&&0<a.version.length)P=!0,O();var p="",H=!1;F=()=>{if(P)p=O();else if(a.jsonprefix=_$(a.jsonprefix,"jsonprefix").isString().default(__),a.jsondesc=toBoolean(_$(a.jsondesc,"jsondesc").default("false")),
isDef(a.insecure)&&toBoolean(a.insecure)&&ow.loadJava().setIgnoreSSLDomains(),isDef(a.file)){if(0>a.file.indexOf("::")&&!io.fileExists(a.file)&&k(-1,"ERROR: File not found: '"+a.file+"'"),!K.has(a.type))if("json"==a.type||isUnDef(a.type))if(a.jsondesc){var b=new Set;io.readStreamJSON(a.file,d=>{d=d.substring(2);isDef(a.jsonprefix)?d.startsWith(a.jsonprefix)&&b.add(d):b.add(d);return!1});p=stringify(Array.from(b),__,"")}else if(isDef(a.jsonprefix)){var c=io.readStreamJSON(a.file,d=>d.substring(2).startsWith(a.jsonprefix));
p=stringify(c,__,"")}else p=io.readFileString(a.file);else p=io.readFileString(a.file)}else if(a.jsondesc&&k(-1,"ERROR: jsondesc only available for file input."),a.jsonprefix&&k(-1,"ERROR: jsonprefix only available for file input."),isDef(a.cmd))p=y(a.cmd,!0);else if(isString(a.data))p=a.data;else if(isDef(a.url)){a.urlmethod=_$(a.urlmethod,"urlmethod").isString().default("GET");c=t(_$(a.urlparams).isString().default("{}"));let d;isDef(a.urldata)&&(d=t(a.urldata));switch(a.urlmethod.toLowerCase()){case "post":p=
$rest(c).post(a.url,d);break;case "put":p=$rest(c).put(a.url,d);break;case "delete":p=$rest(c).delete(a.url,d);break;default:p=$rest(c).get(a.url)}p=stringify(p,__,"")}else"pm"!=a.input&&(p=[],io.pipeLn(d=>{isDef(L[a.type])?L[a.type](I(d),clone(M))&&p.push(d):p.push(d);return!1}),p=p.join("\n"));H||(isUnDef(a.type)&&(isDef(a.file)&&(c=a.file.substring(a.file.lastIndexOf(".")),G.has(c)&&(a.type=G.get(c))),isUnDef(a.type)&&(c=p.trim(),c.startsWith("{")||c.startsWith("[")?a.type="json":c.startsWith("(")?
a.type="slon":c.startsWith("<")?a.type="xml":isString(c)&&0<c.length?1<c.substring(0,c.indexOf("\n")).split(",").length?a.type="csv":c.substring(0,0<c.indexOf(": "))&&(a.type="yaml"):k(-1,"Please provide the input type."))),isDef(a.type)&&B.has(a.type)?B.get(a.type)(p,M):(isString(a.type)&&printErr("WARN: "+a.type+" input type not supported. Using json."),B.get("json")(p,M)))};isDef(a["-debug"])&&printErr("DEBUG: "+stringify(a,__,""));if(isNumber(a.loop))for(;;)toBoolean(a.loopcls)&&cls(),F(),sleep(1E3*
a.loop,!0);else F()}};oafp(params);
