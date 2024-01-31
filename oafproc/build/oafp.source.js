var params = processExpr(" ")
// Author : Nuno Aguiar
const oafp = (params) => {
if (isUnDef(params) || isDef(params.____ojob)) return 
var showHelp = () => {
    __initializeCon()

    var _ff
    params.help = _$(params.help, "help").isString().default("")
    switch(params.help.toLowerCase()) {
    case "filters" : _ff = "docs/FILTERS.md"; break
    case "template": _ff = "docs/TEMPLATE.md"; break
    default        : _ff = "docs/USAGE.md"
    }

    var _f = (getOPackPath("oafproc") || ".") + "/" + _ff
    if (io.fileExists(_f)) {
        __ansiColorFlag = true
		__conConsole = true
        if (isDef(ow.format.string.pauseString) && toBoolean(params.pause))
            ow.format.string.pauseString( ow.format.withMD( io.readFileString(_f) ) )
        else
            print(ow.format.withMD( io.readFileString(_f) ))
    } else {
        if (isDef(_help) && _ff == "docs/USAGE.md") {
            __ansiColorFlag = true
            __conConsole = true
            if (isDef(ow.format.string.pauseString) && toBoolean(params.pause))
                ow.format.string.pauseString( ow.format.withMD( _help ) )
            else
                print(ow.format.withMD( _help ))
        } else {
            print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/" + _ff)
        }
    }

    exit(0)
}

ow.loadFormat()
if (params["-h"] == "" || (isString(params.help) && params.help.length > 0)) showHelp()

params.format = params.output || params.format, params.type = params.input || params.type

// Check if file is provided
if (isUnDef(params.file)) {
    let _found = __
    for (let key in params) {
        if (params[key] === "") {
            _found = key
            break;
        }
    }
    params.file = _found
}

// File extensions list
const _fileExtensions = new Map([
    [".json", "json"],
    [".yaml", "yaml"],
    [".xml", "xml"],
    [".csv", "csv"],
    [".ini", "ini"],
    [".md", "md"]
])

// --- add extra _fileExtensions here ---

// List of input types that should not be stored in memory
var _inputNoMem = new Set([ "csv", "ndjson" ])

// --- add extra _inputNoMem here ---

// Input functions processing per line
var _inputLineFns = {
    "ndjson": (r, options) => {
        if (!params.ndjsonjoin) {
            if (isUnDef(global.__ndjsonbuf) && r.length != 0 && r.trim().startsWith("{")) global.__ndjsonbuf = ""
            if (isDef(global.__ndjsonbuf)) {
                if (r.length != 0 && !r.trim().endsWith("}")) { global.__ndjsonbuf += r.trim(); return }
                if (global.__ndjsonbuf.length > 0) { r = global.__ndjsonbuf + r; global.__ndjsonbuf = __ }
            }
            if (r.length == 0 || r.length > 0 && r.trim().substring(0, 1) != "{") { 
                _$o(jsonParse(global.__ndjsonbuf, __, __, true), options, true)
                noFurtherOutput = true
                global.__ndjsonbuf = __
                return 
            }
            _$o(jsonParse(r, __, __, true), options, true)
            noFurtherOutput = true
        } else {
            return true
        }
    }
}

// --- add extra _inputLineFns here ---

// Transform functions
var _transformFns = {
    "sortmapkeys" : _r => (toBoolean(params.sortmapkeys) && isObject(_r) ? sortMapKeys(_r) : _r),
    "searchkeys"  : _r => (isObject(_r) ? searchKeys(_r, params.searchkeys) : _r),
    "searchvalues": _r => (isObject(_r) ? searchValues(_r, params.searchvalues) : _r),
    "maptoarray"  : _r => (isObject(_r) ? $m4a(_r, params.maptoarraykey) : _r),
    "arraytomap"  : _r => (isArray(_r) ? $a4m(_r, params.arraytomapkey, toBoolean(params.arraytomapkeepkey)) : _r),
    "flatmap"     : _r => (isObject(_r) ? ow.loadObj().flatMap(_r, params.flatmapkey) : _r),
}

// --- add extra _transformFns here ---

var _outputFns = new Map([
    ["pm", (r, options) => {
        $o(r, options)
    }],
    ["key", (r, options) => {
        $o(r, options)
    }],
    ["log", (r, options) => {
        if (isString(r) && toBoolean(params.logprintall)) {
            print(r.replace(/\n$/, ""))
        } else {
            var _arr = r
            if (isMap(r)) _arr = [ r ]
            if (isArray(_arr)) {
                _arr.forEach(_r => {
                    if (isMap(_r)) {
                        let d = (isDef(_r["@timestamp"]) ? _r["@timestamp"] : __)
                        let l = (isDef(_r.level) ? _r.level : __)
                        let m = (isDef(_r.message) ? _r.message : __)
                        if (isDef(d) && d.length > 24) d = d.substring(0, 23) + "Z"
                        if (isDef(m) || isDef(d)) print(ansiColor("BOLD", d) + (isDef(l) ? " | " + l : "") + " | " + m)
                    }
                })
            }
        }
    }],
    ["ini", (r, options) => {
        ow.loadJava()
        var ini = new ow.java.ini()
        print( ini.put(r).save() )
    }], 
    ["mdyaml", (r, options) => {
        if (isArray(r)) {
            r.forEach((_y, i) => {
                $o(_y, merge(options, { __format: "yaml" }))
                if (i < r.length - 1) print("---\n")
            })
        } else {
            $o(r, merge(options, { __format: "yaml" }))
        }
    }],
    ["mdtable", (r, options) => {
        if (isArray(r)) {
            ow.loadTemplate()
            print( ow.template.md.table(r) )
        }
    }],
    ["template", (r, options) => {
        ow.loadTemplate()
        ow.template.addConditionalHelpers()
        ow.template.addOpenAFHelpers()
        ow.template.addFormatHelpers()
        if (isUnDef(params.template)) throw "For output=handlebars you need to provide a template=someFile.hbs"
        tprint(io.readFileString(params.template), r)
    }],
    ["openmetrics", (r, options) => {
        ow.loadMetrics()
        var _out = ow.metrics.fromObj2OpenMetrics(r, params.metricsprefix, params.metricstimestamp)
        _out = _out.split("\n").map(line => {
            if (line.indexOf("{_id=\"") >= 0) line = line.replace(/{_id=\"\d+\",/, "{")
            if (line.indexOf(",_id=\"") >= 0) line = line.replace(/,_id=\"\d+\"}/, "}")
            if (line.indexOf("_id=\"") >= 0) line = line.replace(/,_id=\"\d+\",/, ",")
            return line
        }).join("\n")
        $o(_out, options)
    }],
    ["base64", (r, options) => {
        var _o = ""
        if (isString(r))
            _o = r
        else
            _o = stringify(r)

        print(af.fromBytes2String(af.toBase64Bytes(_o)))
    }],
    ["xls", (r, options) => {
        try {
            includeOPack("plugin-XLS")
        } catch(e) {
            throw "plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)"
        }

        plugin("XLS")
        var ar
        if (isMap(r)) {
            ow.loadObj()
            var o = ow.obj.flatMap(r)
            ar = Object.keys(o).map(r => ({ key: r, value: o[r] }))
        }
        if (isArray(r)) {
            ar = r
        }
        traverse(ar, (aK, aV, aP, aO) => {
            if (isString(aV) && aV.startsWith("=")) aO[aK] = "'" + aV
        })

        var tempFile = false
        if (isUnDef(params.xlsfile)) {
            tempFile = true
            params.xlsfile = io.createTempFile("oafp", ".xlsx")
        }

        var xls = new XLS()
        var sheet = xls.getSheet("data")
        params.xlsformat = _$(params.xlsformat, "xlsformat").isString().default("(bold: true, borderBottom: \"medium\", borderBottomColor: \"red\")")
        if (params.xlsformat.trim().startsWith("{")) params.xlsformat = jsonParse(params.xlsformat, true)
        if (params.xlsformat.trim().startsWith("(")) params.xlsformat = af.fromSLON(params.xlsformat)
        ow.format.xls.setTable(xls, sheet, "A", 1, ar, __, params.xlsformat)
        xls.writeFile(params.xlsfile)
        xls.close()

        params.xlsopenwait = _$(params.xlsopenwait, "xlsopenwait").isNumber().default(5000)
        params.xlsopen     = toBoolean(_$(params.xlsopen, "xlsopen").isString().default("true"))
        if (params.xlsopen) {
            if (ow.format.isWindows()) {
                $sh("start " + params.xlsfile).exec()
                if (tempFile) sleep(params.xlsopenwait, true)
            } else if (ow.format.getOS().startsWith("Mac")) {
                $sh("open " + params.xlsfile).exec()
                if (tempFile) sleep(params.xlsopenwait, true)
            } 
        }
    }]
])

// --- add extra _outputFns here ---

// Util functions
const _transform = r => {
    var _ks = Object.keys(_transformFns)
    for(var ikey = 0; ikey < _ks.length; ikey++) {
        var key = _ks[ikey]
        if (isDef(params[key])) r = _transformFns[key](r)
    }
    return r
}
const _$f = (r, options) => {
    if (isString(r)) return _transform(r)

    if (options.__path) {
        r = $path(r, options.__path)
        delete options.__path
    }
    if (options.__from) {
        r = $from(r).query(af.fromNLinq(options.__from))
        delete options.__from
    }
    if (options.__sql) {
        r = $sql(r, options.__sql)
        delete options.__sql
    }
    r = _transform(r)
    return r
}
const _$o = (r, options, lineByLine) => {
    if (!isString(r)) {
        if (lineByLine)
            r = _$f([r], options)[0]
        else
            r = _$f(r, options)
    }

    if (_outputFns.has(options.__format)) 
        _outputFns.get(options.__format)(r, options)
    else
        $o(r, options)
}

// Input functions (input parsers)
var _inputFns = new Map([
    ["pm"   , (_res, options) => { if (isDef(__pm._map)) _res = __pm._map; if (isDef(__pm._list)) _res = __pm._list; _$o(_res, options) }],
    ["yaml" , (_res, options) => _$o(af.fromYAML(_res), options)],
    ["xml"  , (_res, options) => {
        params.xmlignored = _$(params.xmlignored, "xmlignored").isString().default(__)
        params.xmlprefix = _$(params.xmlprefix, "xmlprefix").isString().default(__)
        params.xmlfiltertag = toBoolean(_$(params.xmlfiltertag, "xmlfiltertag").isString().default(__))
        _$o(af.fromXML2Obj(_res, params.xmlignored, params.xmlprefix, !params.xmlfiltertag), options)
    }],
    ["ndjson", (_res, options) => {
        global.__ndjsonbuf = __
        var _ndjline = (r, fn) => {
            if (isUnDef(global.__ndjsonbuf) && r.length != 0 && r.trim().startsWith("{")) global.__ndjsonbuf = ""
            if (isDef(global.__ndjsonbuf)) {
                if (r.length != 0 && !r.trim().endsWith("}")) { global.__ndjsonbuf += r.trim(); return }
                if (global.__ndjsonbuf.length > 0) { r = global.__ndjsonbuf + r; global.__ndjsonbuf = __ }
            }
            if (r.length == 0 || r.length > 0 && r.trim().substring(0, 1) != "{") { 
                fn(r)
                global.__ndjsonbuf = __
                return 
            }
            fn(r)
        }
        var _ndjproc = res => {
            var _j = []
            res.split("\n").filter(l => l.length > 0).forEach(r => _ndjline(r, r => _j.push(jsonParse(r, __, __, true))))
            return _j
        }

        if (params.ndjsonjoin) {
            if (isDef(params.file)) {
                _res = io.readFileString(params.file)
            }
            _$o(_ndjproc(_res), options)
        } else {
            var _stream
            if (isDef(params.file)) {
                _stream = io.readFileStream(params.file)
            } else {
                _stream = af.fromString2InputStream(_res)
            }
            ioStreamReadLines(_stream, r => {
                _ndjline(r, line => _$o(jsonParse(line, __, __, true), clone(options), true) )
            })
            _stream.close()
        }
    }],
    ["md", (_res, options) => {
        __ansiColorFlag = true
        __conConsole = true
        print(ow.format.withMD(_res))
    }],
    ["mdtable", (_res, options) => {
        ow.loadTemplate()
        var _s = ow.template.md.fromTable(_res)
        _$o(_s, options)
    }],
    ["ini", (r, options) => {
        ow.loadJava()
        var ini = new ow.java.ini()
        if (isDef(params.file)) {
            _$o( ini.loadFile(params.file).get(), options )
        } else {
            _$o( ini.load(r).get(), options )
        }
    }],
    ["xls", (_res, options) => {
        try {
            includeOPack("plugin-XLS")
        } catch(e) {
            throw "plugin-XLS not found. You need to install it to use the XLS output (opack install plugin-XLS)"
        }
        
        params.xlssheet        = _$(params.xlssheet, "xlssheet").isString().default(0)
        params.xlsevalformulas = toBoolean(_$(params.xlsevalformulas, "xlsevalformulas").isString().default(true))
        params.xlscol          = _$(params.xlscol, "xlscol").isString().default("A")
        params.xlsrow          = _$(params.xlsrow, "xlsrow").isString().default(1)

        plugin("XLS")
        if (isDef(params.file)) {
            var xls = new XLS(params.file)
            var sheet = xls.getSheet(params.xlssheet)
            var _r = xls.getTable(sheet, params.xlsevalformulas, params.xlscol, params.xlsrow)
            xls.close()
            if (isDef(_r) && isMap(_r)) _r = _r.table
            _$o(_r, options)
        } else {
            throw "XLS only supports file input. Please provide a file=..."
        }
    }],
    ["csv", (_res, options) => {
        if (isDef(params.file)) {
            var is = io.readFileStream(params.file)
            _$o($csv(params.inputcsv).fromInStream(is).toOutArray(), options)
            is.close()
        } else {
            _$o($csv(params.inputcsv).fromInString( _res ).toOutArray(), options)
        }
    }],
    ["hsperf", (_res, options) => {
        if (isDef(params.file)) {
            ow.loadJava()
            _$o( ow.java.parseHSPerf(params.file), options )
        } else {
            throw "hsperf only supports file input"
        }
    }],
    ["base64", (_res, options) => {
        _$o(af.fromBytes2String(af.fromBase64(_res)), options)
    }],
    ["json", (_res, options) => _$o(jsonParse(_res, __, __, true), options)]
])

// --- add extra _inputFns here ---

// Default format
params.format = _$(params.format, "format").isString().default("ctree")

// Initialize console detection
__initializeCon()

// Set options
var options = { __format: params.format, __from: params.from, __sql: params.sql, __path: params.path, __csv: params.csv, __pause: params.pause, __key: params.__key }
// ndjson options
if (params.type == "ndjson") {
    params.ndjsonjoin = toBoolean(_$(params.ndjsonjoin, "ndjsonjoin").isString().default(__))
}
// csv options
if (isDef(params.inputcsv)) {
    params.inputcsv = params.csv.trim().startsWith("{") ? jsonParse(params.inputcsv, true) : af.fromSLON(params.inputcsv)
}
if (isDef(params.csv)) {
    params.csv = params.csv.trim().startsWith("{") ? jsonParse(params.csv, true) : af.fromSLON(params.csv)
}

// Read input from stdin or file
var _res = "", noFurtherOutput = false
if (isDef(params.file)) {
    if (!_inputNoMem.has(params.type)) _res = io.readFileString(params.file)
} else {
    if (params.input != "pm") {
        _res = []
        io.pipeLn(r => {
            if (isDef(_inputLineFns[params.type])) {
                if (_inputLineFns[params.type](_transform(r), clone(options))) {
                    _res.push(r)
                }
            } else { 
                _res.push(r)
            }
            return false
        })
        _res = _res.join('\n')
    }
}

if (!noFurtherOutput) {
    // Detect type if not provided
    if (isUnDef(params.type)) {
        // File name based
        if (isDef(params.file)) {
            let _ext = params.file.substring(params.file.lastIndexOf('.'))
            if (_fileExtensions.has(_ext)) params.type = _fileExtensions.get(_ext)
        }

        // Content-based
        if (isUnDef(params.type)) {
            let _tres = _res.trim()
            if (_tres.startsWith("{") || _tres.startsWith("[")) {
                params.type = "json"
            } else if (_tres.startsWith("<")) {
                params.type = "xml"
            } else {
                if (isString(_tres) && _tres.length > 0) {
                    if (_tres.substring(0, _tres.indexOf('\n')).split(",").length > 1) {
                        params.type = "csv"
                    } else if (_tres.substring(0, _tres.indexOf(': ') > 0)) {
                        params.type = "yaml"
                    }
                } else {
                    printErr("Please provide the input type.")
                    exit(-1)
                }
            }
        }
    }

    // Determine input type and execute
    if (isDef(_inputFns.has(params.type))) {
        _inputFns.get(params.type)(_res, options)
    } else {      
        _inputFns.get("json")(_res, options)
    }
}
}
oafp(params)