showHelp=()=>{__initializeCon();var a=(getOPackPath("oafproc")||".")+"/README.md";io.fileExists(a)?(__conConsole=__ansiColorFlag=!0,isDef(ow.format.string.pauseString)?ow.format.string.pauseString(ow.format.withMD(io.readFileString(a))):print(ow.format.withMD(io.readFileString(a)))):print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/README.md");exit(0)};ow.loadFormat();""==params["-h"]&&showHelp();params.format=params.output||params.format;
params.type=params.input||params.type;if(isUnDef(params.file)){let a=__;for(let b in params)if(""===params[b]){a=b;break}params.file=a}const _fileExtensions=new Map([[".json","json"],[".yaml","yaml"],[".xml","xml"],[".csv","csv"],[".md","md"]]);
var _inputNoMem=new Set(["csv"]),_inputLineFns={ndjson:(a,b)=>{params.ndjsonjoin||($o(jsonParse(a,__,__,!0),b),noFurtherOutput=!0)}},_transformFns={sortmapkeys:a=>toBoolean(params.sortmapkeys)&&isObject(a)?sortMapKeys(a):a,searchkeys:a=>isObject(a)?searchKeys(a,params.searchkeys):a,searchvalues:a=>isObject(a)?searchValues(a,params.searchvalues):a,maptoarray:a=>isObject(a)?$m4a(a,params.maptoarraykey):a,arraytomap:a=>isArray(a)?$a4m(a,params.arraytomapkey,toBoolean(params.arraytomapkeepkey)):a};
const _transform=a=>{for(var b=Object.keys(_transformFns),c=0;c<b.length;c++){var d=b[c];isDef(params[d])&&(a=_transformFns[d](a))}return a},_$o=(a,b)=>{b.__path&&(a=$path(a,b.__path),delete b.__path);b.__from&&(a=$from(a).query(af.fromNLinq(b.__from)),delete b.__from);b.__sql&&(a=$sql(a,b.__sql),delete b.__sql);a=_transform(a);$o(a,b)};
var _outputFns=new Map([["yaml",(a,b)=>_$o(af.fromYAML(a),b)],["xml",(a,b)=>{params.xmlignored=_$(params.xmlignored,"xmlignored").isString().default(__);params.xmlprefix=_$(params.xmlprefix,"xmlprefix").isString().default(__);params.xmlfiltertag=toBoolean(_$(params.xmlfiltertag,"xmlfiltertag").isString().default(__));_$o(af.fromXML2Obj(a,params.xmlignored,params.xmlprefix,params.xmlfiltertag),b)}],["ndjson",(a,b)=>{params.ndjsonjoin?_$o(a.split("\n").map(c=>jsonParse(c.trim(),__,__,!0)),b):io.readLinesNDJSON(af.fromString2InputStream(a),
c=>{_$o(c,b)})}],["md",(a,b)=>{__conConsole=__ansiColorFlag=!0;print(ow.format.withMD(a))}],["csv",(a,b)=>{isDef(params.file)?(a=io.readFileStream(params.file),_$o($csv(params.inputcsv).fromInStream(a).toOutArray(),b),a.close()):_$o($csv(params.inputcsv).fromInString(a).toOutArray(),b)}],["json",(a,b)=>_$o(jsonParse(a,__,__,!0),b)]]);params.format=_$(params.format,"format").isString().default("ctree");__initializeCon();
var options={__format:params.format,__from:params.from,__sql:params.sql,__path:params.path,__csv:params.csv,__pause:params.pause};"ndjson"==params.type&&(params.ndjsonjoin=toBoolean(_$(params.ndjsonjoin,"ndjsonjoin").isString().default(__)));isDef(params.inputcsv)&&(params.inputcsv=params.csv.trim().startsWith("{")?jsonParse(params.inputcsv,!0):af.fromSLON(params.inputcsv));isDef(params.csv)&&(params.csv=params.csv.trim().startsWith("{")?jsonParse(params.csv,!0):af.fromSLON(params.csv));
var _res="",noFurtherOutput=!1;isDef(params.file)?_inputNoMem.has(params.type)||(_res=io.readFileString(params.file)):(_res=[],io.pipeLn(a=>{if(isDef(_inputLineFns[params.type]))_inputLineFns[params.type](_transform(a),options);else _res.push(a);return!1}),_res=_res.join("\n"));
if(!noFurtherOutput){if(isUnDef(params.type)){if(isDef(params.file)){let a=params.file.substring(params.file.lastIndexOf("."));_fileExtensions.has(a)&&(params.type=_fileExtensions.get(a))}if(isUnDef(params.type)){let a=_res.trim();a.startsWith("{")||a.startsWith("[")?params.type="json":a.startsWith("<")?params.type="xml":isString(a)&&0<a.length?1<a.substring(0,a.indexOf("\n")).split(",").length?params.type="csv":a.substring(0,0<a.indexOf(": "))&&(params.type="yaml"):(printErr("Please provide the input type."),
exit(-1))}}isDef(_outputFns.has(params.type))?_outputFns.get(params.type)(_res,options):_outputFns.get("json")(_res,options)};
