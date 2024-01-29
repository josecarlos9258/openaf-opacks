// (author: Nuno Aguiar, version: 20240127, license: Apache 2.0, url: https://github.com/OpenAF/openaf-opacks/tree/master/oafproc)
// ---
showHelp=()=>{__initializeCon();params.help=_$(params.help,"help").isString().default("");switch(params.help.toLowerCase()){case "filters":var a="docs/FILTERS.md";break;case "template":a="docs/TEMPLATE.md";break;default:a="docs/USAGE.md"}var b=(getOPackPath("oafproc")||".")+"/"+a;io.fileExists(b)?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(params.pause)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(b))):print(ow.format.withMD(io.readFileString(b)))):
isDef(_help)&&"docs/USAGE.md"==a?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)&&toBoolean(params.pause)?ow.format.string.pauseString(ow.format.withMD(_help)):print(ow.format.withMD(_help))):print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/"+a);exit(0)};ow.loadFormat();(""==params["-h"]||isString(params.help)&&0<params.help.length)&&showHelp();params.format=params.output||params.format;params.type=params.input||params.type;
if(isUnDef(params.file)){let a=__;for(let b in params)if(""===params[b]){a=b;break}params.file=a}const _fileExtensions=new Map([[".json","json"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".md","md"]]);
var _inputNoMem=new Set(["csv","ndjson"]),_inputLineFns={ndjson:(a,b)=>{params.ndjsonjoin||(_$o(jsonParse(a,__,__,!0),b),noFurtherOutput=!0)}},_transformFns={sortmapkeys:a=>toBoolean(params.sortmapkeys)&&isObject(a)?sortMapKeys(a):a,searchkeys:a=>isObject(a)?searchKeys(a,params.searchkeys):a,searchvalues:a=>isObject(a)?searchValues(a,params.searchvalues):a,maptoarray:a=>isObject(a)?$m4a(a,params.maptoarraykey):a,arraytomap:a=>isArray(a)?$a4m(a,params.arraytomapkey,toBoolean(params.arraytomapkeepkey)):
a,flatmap:a=>isObject(a)?ow.loadObj().flatMap(a,params.flatmapkey):a},_outputFns=new Map([["log",(a,b)=>{b=a;if(isMap(a)||isString(a))b=[a];isArray(b)&&b.forEach(c=>{if(isMap(c)){let d=isDef(c["@timestamp"])?c["@timestamp"]:__,e=isDef(c.level)?c.level:__;c=isDef(c.message)?c.message:__;isDef(d)&&24<d.length&&(d=d.substring(0,23)+"Z");isDef(c)||isDef(d)?print(ansiColor("BOLD",d)+(isDef(e)?" | "+e:"")+" | "+c):print("")}else print(c.replace(/\n$/,""))})}],["mdyaml",(a,b)=>{isArray(a)?a.forEach((c,d)=>
{$o(c,merge(b,{__format:"yaml"}));d<a.length-1&&print("---\n")}):$o(a,merge(b,{__format:"yaml"}))}],["mdtable",(a,b)=>{isArray(a)&&(ow.loadTemplate(),print(ow.template.md.table(a)))}],["template",(a,b)=>{ow.loadTemplate();ow.template.addConditionalHelpers();ow.template.addOpenAFHelpers();ow.template.addFormatHelpers();if(isUnDef(params.template))throw"For output=handlebars you need to provide a template=someFile.hbs";tprint(io.readFileString(params.template),a)}],["openmetrics",(a,b)=>{ow.loadMetrics();
a=ow.metrics.fromObj2OpenMetrics(a,params.metricsprefix,params.metricstimestamp);a=a.split("\n").map(c=>{0<=c.indexOf('{_id="')&&(c=c.replace(/{_id="\d+",/,"{"));0<=c.indexOf(',_id="')&&(c=c.replace(/,_id="\d+"}/,"}"));0<=c.indexOf('_id="')&&(c=c.replace(/,_id="\d+",/,","));return c}).join("\n");$o(a,b)}],["base64",(a,b)=>{a=isString(a)?a:stringify(a);print(af.fromBytes2String(af.toBase64Bytes(a)))}]]);
const _transform=a=>{for(var b=Object.keys(_transformFns),c=0;c<b.length;c++){var d=b[c];isDef(params[d])&&(a=_transformFns[d](a))}return a},_$o=(a,b)=>{b.__path&&(a=$path(a,b.__path),delete b.__path);b.__from&&(a=$from(a).query(af.fromNLinq(b.__from)),delete b.__from);b.__sql&&(a=$sql(a,b.__sql),delete b.__sql);a=_transform(a);_outputFns.has(b.__format)?_outputFns.get(b.__format)(a,b):$o(a,b)};
var _inputFns=new Map([["yaml",(a,b)=>_$o(af.fromYAML(a),b)],["xml",(a,b)=>{params.xmlignored=_$(params.xmlignored,"xmlignored").isString().default(__);params.xmlprefix=_$(params.xmlprefix,"xmlprefix").isString().default(__);params.xmlfiltertag=toBoolean(_$(params.xmlfiltertag,"xmlfiltertag").isString().default(__));_$o(af.fromXML2Obj(a,params.xmlignored,params.xmlprefix,!params.xmlfiltertag),b)}],["ndjson",(a,b)=>{params.ndjsonjoin?(isDef(params.file)&&(a=io.readFileString(params.file)),_$o(a.split("\n").filter(c=>
0<c.length).map(c=>jsonParse(c.trim(),__,__,!0)),b)):(a=isDef(params.file)?io.readFileStream(params.file):af.fromString2InputStream(a),io.readLinesNDJSON(a,c=>{_$o(c,b)}),a.close())}],["md",(a,b)=>{__conConsole=__ansiColorFlag=!0;print(ow.format.withMD(a))}],["mdtable",(a,b)=>{ow.loadTemplate();a=ow.template.md.fromTable(a);_$o(a,b)}],["csv",(a,b)=>{isDef(params.file)?(a=io.readFileStream(params.file),_$o($csv(params.inputcsv).fromInStream(a).toOutArray(),b),a.close()):_$o($csv(params.inputcsv).fromInString(a).toOutArray(),
b)}],["hsperf",(a,b)=>{if(isDef(params.file))ow.loadJava(),_$o(ow.java.parseHSPerf(params.file),b);else throw"hsperf only supports file input";}],["base64",(a,b)=>{_$o(af.fromBytes2String(af.fromBase64(a)),b)}],["json",(a,b)=>_$o(jsonParse(a,__,__,!0),b)]]);params.format=_$(params.format,"format").isString().default("ctree");__initializeCon();var options={__format:params.format,__from:params.from,__sql:params.sql,__path:params.path,__csv:params.csv,__pause:params.pause};
"ndjson"==params.type&&(params.ndjsonjoin=toBoolean(_$(params.ndjsonjoin,"ndjsonjoin").isString().default(__)));isDef(params.inputcsv)&&(params.inputcsv=params.csv.trim().startsWith("{")?jsonParse(params.inputcsv,!0):af.fromSLON(params.inputcsv));isDef(params.csv)&&(params.csv=params.csv.trim().startsWith("{")?jsonParse(params.csv,!0):af.fromSLON(params.csv));var _res="",noFurtherOutput=!1;
isDef(params.file)?_inputNoMem.has(params.type)||(_res=io.readFileString(params.file)):(_res=[],io.pipeLn(a=>{if(isDef(_inputLineFns[params.type]))_inputLineFns[params.type](_transform(a),options);else _res.push(a);return!1}),_res=_res.join("\n"));
if(!noFurtherOutput){if(isUnDef(params.type)){if(isDef(params.file)){let a=params.file.substring(params.file.lastIndexOf("."));_fileExtensions.has(a)&&(params.type=_fileExtensions.get(a))}if(isUnDef(params.type)){let a=_res.trim();a.startsWith("{")||a.startsWith("[")?params.type="json":a.startsWith("<")?params.type="xml":isString(a)&&0<a.length?1<a.substring(0,a.indexOf("\n")).split(",").length?params.type="csv":a.substring(0,0<a.indexOf(": "))&&(params.type="yaml"):(printErr("Please provide the input type."),
exit(-1))}}isDef(_inputFns.has(params.type))?_inputFns.get(params.type)(_res,options):_inputFns.get("json")(_res,options)};
