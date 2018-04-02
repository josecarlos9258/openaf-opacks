(function() {
    ow.loadTemplate();
    ow.loadServer();

    var hss = {}, chs, port, stampMap;
    var packPath = getOPackPath("inBrowser") || io.fileInfo(".").canonicalPath;

    var hbs = ow.template.loadHBSs({
        e: packPath + "/inBrowser.hbs"
    });

    function checkoutHS(uuid) {
        if (isDef(chs) && Object.keys(hss).length > 0) return chs;

        if (isUnDef(port)) port = findRandomOpenPort();
        chs = ow.server.httpd.start(port, "127.0.0.1");

        if (isUnDef(hss[uuid])) hss[uuid] = {};

        return chs;
    }

    function checkinHS(uuid) {
        delete hss[uuid];

        if (Object.keys(hss).length <= 0) hs.stop();
    }

    /**
     * <odoc>
     * <key>inBrowser.setPort(aPort)</key>
     * Sets the port to be used in the communication to the browser (by default is random).
     * </odoc>
     */
    exports.setPort = function(aPort) {
        port = aPort;
    };

    /**
     * <odoc>
     * <key>inBrowser.getPort() : Number</key>
     * Gets the current port assigned to communicate with the browser.
     * </odoc>
     */
    exports.getPort = function() {
        return port;
    };

    /**
     * <odoc>
     * <key>inBrowser.setStampMap(aMap)</key>
     * Sets options aMap to be merged with every next request.
     * </odoc>
     */
    exports.setStampMap = function(aMap) {
        stampMap = aMap;
    };

    /**
     * <odoc>
     * <key>inBrowser.stop()</key>
     * Forces to stop all communication with the browser. New windows will open a new server.
     * </odoc>
     */
    exports.stop = function() {
        ow.server.httpd.stop(chs);
        chs = void 0;
    };

    /**
     * <odoc>
     * <key>inBrowser.edit(aObject, aMap) : Map</key>
     * Edits aObject in a browser window with aMap options. When the browser window is closed all the
     * changes will be returned as a map. aMap can have the following options: wordwrap (boolean) to indicate 
     * if the browser windows should word wrap; width, height (number) the size of the popup window if choosen by 
     * right-click; theme (string) a ace theme (ace/theme/*).
     * </odoc>
     */
    exports.edit = function(aObj, aMap, forceId) {
        var keepRunning = true;
        var res, resText, resType;

        var id = (isDef(forceId)) ? forceId : genUUID();

        if (isUnDef(aMap) || !isObject(aMap)) aMap = {};
        if (isDef(stampMap)) aMap = merge(stampMap, aMap);
        if (aMap.ro && isString(aObj) && isUnDef(aMap.exec)) aMap = merge(aMap, { exec: true });

        var hs = checkoutHS(id);

        var routes = {}, delroutes = {};
        var nullFunc = function(r) { return aHTTPd.reply("", "", 401, {}); };

        routes["/" + id] = (r) => {
            return chs.replyOKHTML(hbs("e", {
                id: id,
                title: aMap.title
            }));
        };
        delroutes["/" + id] = nullFunc;

        routes["/_css"] = (r) => { 
            return ow.server.httpd.replyFile(chs, packPath + "/gui/_css", "/_css", r.uri);
        };
        routes["/_js"] = (r) => { 
            return ow.server.httpd.replyFile(chs, packPath + "/gui/_js", "/_js", r.uri);
        };
        routes["/_images"] = (r) => { 
            return ow.server.httpd.replyFile(chs, packPath + "/gui/_images", "/_images", r.uri);
        };

        routes["/" + id + "/e/m"] = (r) => {
            return chs.replyOKJSON(stringify(aMap));
        };
        delroutes["/" + id + "/e/m"] = nullFunc;

        routes["/" + id + "/e/q"] = (r) => {
            keepRunning = false;
            return chs.replyOKText("");
        };
        delroutes["/" + id + "/e/q"] = nullFunc;

        routes["/" + id + "/e/u"] = (r) => {
            if (isDef(r.params.e)) {
                if (isDef(r.params.t)) {
                    switch(r.params.t) {
                    case "yaml": 
                        res = af.fromYAML(r.params.e);
                        resText = r.params.e;
                        resType = "yaml";
                        break;
                    case "json":
                        res = jsonParse(r.params.e);
                        resText = r.params.e;
                        resType = "json";
                        break;
                    default:
                        res = r.params.e;
                        resText = r.params.e;
                        resType = "text";
                        break;
                    }
                } else {
                    res = r.params.e;
                    resText = r.params.e;
                    resType = "text";
                }
            }

            return chs.replyOKText("");
        };
        delroutes["/" + id + "/e/u"] = nullFunc;

        routes["/" + id + "/e/d"] = (r) => {
            var type, obj;

            if (isString(aObj) && aMap.exec) {
                obj = af.eval(aObj);
                if (isObject(obj)) type = "json"; else type = "text";
            } else {
                if (isDef(res)) {
                    obj = res;
                } else {
                    obj = aObj;
                    if (isObject(obj)) type = "json"; else type = "text";
                }
            }

            if (isDef(r.params.t)) {
                switch(r.params.t) {
                case "yaml":
                    resText = af.toYAML(obj);
                    res = obj;
                    resType = "yaml";
                    type = "yaml";
                    break;
                case "json":
                    resText = stringify(obj);
                    res = obj;
                    resType = "json";
                    type = "json";
                    break;
                default:
                    res = obj;
                    resText = obj;
                    resType = "text";
                    type = "text";
                    break;
                }
            } else {
                res = obj;
                resText = obj;
                resType = "text";
                type = "text";
            }

            return chs.replyOKJSON(stringify({ e: resText, t: type}));
        };
        delroutes["/" + id + "/e/d"] = nullFunc;

        ow.server.httpd.route(chs, 
            ow.server.httpd.mapWithExistingRoutes(chs, 
                ow.server.httpd.mapRoutesWithLibs(chs, routes)));

        java.awt.Desktop.getDesktop().browse(new java.net.URI("http://127.0.0.1:" + port + "/" + id + "/e.html"));

        while(keepRunning && !(hss[id].stop)) {
            sleep(1000);
        }
        checkinHS(id);

        // TODO: until ow.server.httpd can delete routes
        ow.server.httpd.route(chs,
            ow.server.httpd.mapWithExistingRoutes(chs,
                ow.server.httpd.mapRoutesWithLibs(chs, delroutes)));

        return res;
    };

    /**
     * <odoc>
     * <key>inBrowser.show(aObject, aMap) : String</key>
     * Shows aObject (or evaluates aObject if a string) in a browser window with aMap options. 
     * aMap can have the following options: wordwrap (boolean) to indicate 
     * if the browser windows should word wrap; width, height (number) the size of the popup window if choosen by 
     * right-click; theme (string) a ace theme (ace/theme/*). Returns the associated uuid with this browser window communication.
     * </odoc>
     */
    exports.show = function(obj, map) {
        if (isUnDef(map)) map = {};

        map = merge(map, { ro: true });

        var id = genUUID();
        var p = $do(() => { 
            this.edit(obj, map, id); 
        });

        if (isUnDef(hss[id])) hss[id] = {};
        hss[id].p = p;

        return id;
    };

   /**
     * <odoc>
     * <key>inBrowser.watch(aTime, aObject, aMap) : String</key>
     * Shows aObject (or evaluates aObject if a string) in a browser window, periodically updating every aTime (in ms),
     * with aMap options. 
     * aMap can have the following options: wordwrap (boolean) to indicate 
     * if the browser windows should word wrap; width, height (number) the size of the popup window if choosen by 
     * right-click; theme (string) a ace theme (ace/theme/*). Returns the associated uuid with this browser window communication.
     * </odoc>
     */
    exports.watch = function(aTime, obj, map) {
        if (isUnDef(map)) map = {};
        if (isUnDef(aTime) || !isNumber(aTime)) throw "Please define a numeric watch time watch(aTime, anObject, anOptionsMap).";
        
        map = merge(map, { watch: aTime, ro: true });
        var id = genUUID();
        var p = $do(() => { 
            this.edit(obj, map, id); 
        });

        if (isUnDef(hss[id])) hss[id] = {};
        hss[id].p = p;

        return id;
    };    

    /**
     * <odoc>
     * <key>inBrowser.list() : Array</key>
     * Shows the current uuids that have endpoints to communicate with the browser windows. As browser windows
     * are closed this endpoints should also disappear from this list.
     * </odoc>
     */
    exports.list = function() {
        return Object.keys(hss);
    };

    /**
     * <odoc>
     * <key>inBrowser.get(aUUID) : Object</key>
     * Gets the associated objects with the aUUID communicating with the corresponding browser windows. Currently
     * p as a oPromise.
     * </odoc>
     */
    exports.get = function(aId) {
        return hss[aId];
    };

    /**
     * <odoc>
     * <key>inBrowser.tryToStop(aUUID) : Object</key>
     * Tries to stop communication associated with aUUID.
     * </odoc>
     */
    exports.tryToStop = function(aId) {
        hss[aId].stop = true;
    };
})();