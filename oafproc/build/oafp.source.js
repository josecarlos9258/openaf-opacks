var params = processExpr(" ")
// Author : Nuno Aguiar
var showHelp = () => {
    __initializeCon()

    var _f = (getOPackPath("oafproc") || ".") + "/README.md"
    if (io.fileExists(_f)) {
        __ansiColorFlag = true
		__conConsole = true
        if (isDef(ow.format.string.pauseString))
            ow.format.string.pauseString( ow.format.withMD( io.readFileString(_f) ) )
        else
            print(ow.format.withMD( io.readFileString(_f) ))
    } else {
        print("Check https://github.com/OpenAF/openaf-opacks/blob/master/oafproc/README.md")
    }

    exit(0)
}

ow.loadFormat()
if (params["-h"] == "") showHelp()

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
    [".md", "md"]
])

// List of input types that should not be stored in memory
var _inputNoMem = new Set([ "csv", "ndjson" ])

// Input functions processing per line
var _inputLineFns = {
    "ndjson": (r, options) => {
        if (!params.ndjsonjoin) {
            _$o(jsonParse(r, __, __, true), options)
            noFurtherOutput = true
        }
    }
}

// Transform functions
var _transformFns = {
    "sortmapkeys" : _r => (toBoolean(params.sortmapkeys) && isObject(_r) ? sortMapKeys(_r) : _r),
    "searchkeys"  : _r => (isObject(_r) ? searchKeys(_r, params.searchkeys) : _r),
    "searchvalues": _r => (isObject(_r) ? searchValues(_r, params.searchvalues) : _r),
    "maptoarray"  : _r => (isObject(_r) ? $m4a(_r, params.maptoarraykey) : _r),
    "arraytomap"  : _r => (isArray(_r) ? $a4m(_r, params.arraytomapkey, toBoolean(params.arraytomapkeepkey)) : _r)
}

// Util functions
const _transform = r => {
    var _ks = Object.keys(_transformFns)
    for(var ikey = 0; ikey < _ks.length; ikey++) {
        var key = _ks[ikey]
        if (isDef(params[key])) r = _transformFns[key](r)
    }
    return r
}
const _$o = (r, options) => {
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

    switch(options.__format) {
    case "log":
        var _arr = r
        if (isMap(r)) _arr = [ r ]
        if (isArray(_arr)) {
            _arr.forEach(_r => {
                let d = (isDef(_r["@timestamp"]) ? _r["@timestamp"] : "(no timestamp)")
                let l = (isDef(_r.level) ? _r.level : __)
                let m = (isDef(_r.message) ? _r.message : "")
                print(ansiColor("BOLD", d) + (isDef(l) ? " | " + l : "") + " | " + m)
            })
        }
        break
    case "mdyaml":
        if (isArray(r)) {
            r.forEach((_y, i) => {
                $o(_y, merge(options, { __format: "yaml" }))
                if (i < r.length - 1) print("---\n")
            })
        } else {
            $o(r, merge(options, { __format: "yaml" }))
        }
        break
    default   :
        $o(r, options)
    }
}

// Output functions
var _outputFns = new Map([
    ["yaml" , (_res, options) => _$o(af.fromYAML(_res), options)],
    ["xml"  , (_res, options) => {
        params.xmlignored = _$(params.xmlignored, "xmlignored").isString().default(__)
        params.xmlprefix = _$(params.xmlprefix, "xmlprefix").isString().default(__)
        params.xmlfiltertag = toBoolean(_$(params.xmlfiltertag, "xmlfiltertag").isString().default(__))
        _$o(af.fromXML2Obj(_res, params.xmlignored, params.xmlprefix, params.xmlfiltertag), options)
    }],
    ["ndjson", (_res, options) => {
        if (params.ndjsonjoin) {
            if (isDef(params.file)) {
                _res = io.readFileString(params.file)
            }
            _$o(_res.split('\n').filter(l => l.length > 0).map(e => jsonParse(e.trim(), __, __, true)), options)
        } else {
            var _stream
            if (isDef(params.file)) {
                _stream = io.readFileStream(params.file)
            } else {
                _stream = af.fromString2InputStream(_res)
            }
            io.readLinesNDJSON(_stream, r => {
                _$o(r, options)
            })
            _stream.close()
        }
    }],
    ["md", (_res, options) => {
        __ansiColorFlag = true
        __conConsole = true
        print(ow.format.withMD(_res))
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
    ["json", (_res, options) => _$o(jsonParse(_res, __, __, true), options)]
])

// Default format
params.format = _$(params.format, "format").isString().default("ctree")

// Initialize console detection
__initializeCon()

// Set options
var options = { __format: params.format, __from: params.from, __sql: params.sql, __path: params.path, __csv: params.csv, __pause: params.pause }
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
    _res = []
    io.pipeLn(r => {
        if (isDef(_inputLineFns[params.type])) 
            _inputLineFns[params.type](_transform(r), options)
        else
            _res.push(r)
        return false
    })
    _res = _res.join('\n')
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
    if (isDef(_outputFns.has(params.type))) {
        _outputFns.get(params.type)(_res, options)
    } else {      
        _outputFns.get("json")(_res, options)
    }
}