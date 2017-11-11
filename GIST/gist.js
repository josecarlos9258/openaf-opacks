ow.loadCh();
ow.loadObj();

ow.ch.__types.gist = {
    __gist: {},
    __gistURL: "https://api.github.com",
    create       : function(aName, shouldCompress, options) {
        this.__gist[aName] = options;
    },
    destroy      : function(aName) {
        delete this.__gist[aName];
    },
    size         : function(aName) {
        return this.getKeys(aName).length;
    },
    forEach      : function(aName, aFunction, x) {
        var keys = this.getKeys(aName);
        for(let o in keys) {
            aFunction(keys[o], this.get(aName, keys[o]));
        }
    },
    getKeys      : function(aName, full) {
        var list;
        var auth;

        if (isDef(this.__gist[aName].token)) {
            auth = { Authorization: "token " + this.__gist[aName].token };
        }

        if (isDef(this.__gist[aName].user)) 
            list = ow.obj.rest.jsonGet(this.__gistURL + "/users/" + this.__gist[aName].user + "/gists", {}, undefined, undefined, undefined, auth);
        else
            list = ow.obj.rest.jsonGet(this.__gistURL + "/gists");

        return list;
    },
    getSortedKeys: function(aName, full) {
        var list = this.getKeys(aName, full);

        return $from(list).sort("updated_at").select();
    },
    getSet       : function(aName, aMatch, aK, aV, aTimestamp) {
        return undefined;
    },
    set          : function(aName, aK, aV, aTimestamp, x) {
        var auth;
        
        if (isDef(this.__gist[aName].token)) {
            auth = { Authorization: "token " + this.__gist[aName].token };
        }

        var gist = {};
        gist.public = (isUnDef(aK.public)) ? false : aK.public;
        gist.description = (isUnDef(aK.description)) ? "" : aK.description;
        gist.files = {};
        if (isUnDef(aV.files) || isDef(aK.file)) {
            if(isObject(aV) || isString(aV) || isNumber(aV) || isArray(aV)) {
                var filename = (isDef(aK.file)) ? aK.file : "object.json";
                gist.files[filename] = {};
                gist.files[filename].content = stringify(aV);
            } else {
                throw "You need to provie an object or string or number or array or a files map with filenames and contents.";
            }
        } else {
            for(var file in aV.files) {
                gist.files[file] = {};
                if (isUnDef(aV.files[file].content)) throw "Each file needs to have a 'content' key with the corresponding content.";
                gist.files[file].content = aV.files[file].content;
            }
        }
        if (isDef(aK.id)) {
            var h = new ow.obj.http();
            var rmap = merge({"Content-Type":"application/x-www-form-urlencoded"}, auth);
            var res = h.exec(this.__gistURL + "/gists/" + aK.id, "PATCH", stringify(gist), rmap);
            return jsonParse(res.response);
        } else {
            return ow.obj.rest.jsonCreate(this.__gistURL + "/gists", {}, gist, undefined, undefined, undefined, auth);
        }
    },
    setAll       : function(aName, aKs, aVs, aTimestamp) {
        var res = [];
        for(var i in aVs) {
            res.push(this.set(aName, ow.obj.filterKeys(aKs, aVs[i]), aVs[i], aTimestamp));
        }
        return res;
    },
    get          : function(aName, aK, x) {
        var auth;

        if (isDef(this.__gist[aName].token)) {
            auth = { Authorization: "token " + this.__gist[aName].token };
        }

        if (isUnDef(aK.id)) throw "You need to provide a GIST id and, optionally, a 'file'name.";

        var data = ow.obj.rest.jsonGet(this.__gistURL + "/gists/" + aK.id, {}, undefined, undefined, undefined, auth);
        var res;
        if (isDef(aK.file)) {
            if (isDef(data.files) && isDef(data.files[aK.file])) {
                if (isDef(data.files[aK.file].content)) 
                    res = data.files[aK.file];
                else
                    res = merge({ content: ow.obj.rest.get(data.files[aK.file].raw_url, {}, undefined, undefined, undefined, auth) }, data.files[aK.file]);
            } else {
                return undefined;
            }
        } else {
            if (isDef(data.files["object.json"])) {
                res = data.files["object.json"];
            } else {
                res = data;
            }
        }

        if (isDef(res.type) && res.type == "application/json") res.content = jsonParse(res.content);
        return res;
    },
    pop          : function(aName) { return undefined; },
    shift        : function(aName) { return undefined; },
    unset        : function(aName, aK) { 
        var auth;
        
        if (isDef(this.__gist[aName].token)) {
            auth = { Authorization: "token " + this.__gist[aName].token };
        }

        if (isUnDef(aK.id)) throw "You need to provide the GIST id to delete it.";

        return ow.obj.rest.jsonRemove(this.__gistURL + "/gists/" + aK.id, undefined, undefined, undefined, undefined, auth);
    }
};

/**
 * <odoc>
 * <key>GIST(aOptionsMap) : GIST</key>
 * Creates a GIST object for easier manipulation of a "gist" openaf channel. 
 * A channel "__gist" will be created. To override this use aOptionsMap.ch to provide a different channel name.
 * </odoc> 
 */
var GIST = function(aMap) {
    this.ch = (isDef(aMap.ch)) ? aMap.ch : "__gist";
    $ch(this.ch).create(true, "gist", aMap);
};

/**
 * <odoc>
 * <key>GIST.getCh() : Channel</key>
 * Returns the current gist channel being use.
 * </odoc>
 */
GIST.prototype.getCh = function() {
    return $ch(this.ch);
};

/**
 * <odoc>
 * <key>GIST.clip(aFile, aDescription, aContent, isPublic) : String</key>
 * Creates a new GIST given aFile (a filename), aDescription, aContent (an object, string, array or number). Optionally you
 * can specify if the GIST should be public with isPublic = true. If successfull returns the GIST id, URL and file URL.
 * </odoc>
 */
GIST.prototype.clip = function(aFile, aDescription, aContent, isPublic) {
    var aK = { public: isPublic, description: aDescription }, aV = {};
    var filename = (isDef(aFile)) ? aFile : "object.json";
    
    aV.files = {};
    aV.files[aFile] = { content: aContent };
    var res;
    try {
        res = this.getCh().set(aK, aV);
    } catch(e) {
        throw e;
    }

    return {
        id: res.id,
        gistURL: res.html_url,
        fileURL: res.files[filename].raw_url
    };
};

/**
 * <odoc>
 * <key>GIST.getClip(aId, aFile) : Object</key>
 * Tries to retrieve aFile from the GIST aId returning it's contents.
 * </odoc>
 */
GIST.prototype.getClip = function(aId, aFile) {
    var filename = (isDef(aFile)) ? aFile : "object.json";

    return this.getCh().get({ id: aId, file: filename });
}

/**
 * <odoc>
 * <key>GIST.setClip(aId, aFile, aContent) : String</key>
 * Tries to change aId GIST, for the aFile (a filename) with aContent (an object, string, array or number). Returns the GIST id, URL and file URL.
 * </odoc>
 */
GIST.prototype.setClip = function(aId, aFile, aContent) {
    var aK = { id: aId };
    var aV = {
        files: {}
    };
    var filename = (isDef(aFile)) ? aFile : "object.json";
    aV.files[filename] = { content: aContent };
    var res;
    try {
        res = this.getCh().set(aK, aV);
    } catch(e) {
        throw e;
    }
    
    return {
        id: res.id,
        gistURL: res.html_url,
        fileURL: res.files[filename].raw_url
    };
};

/**
 * <odoc>
 * <key>GIST.unClip(aID)</key>
 * Tries to delete a GIST with the provided aID.
 * </odoc>
 */
GIST.prototype.unClip = function(aID) {
    var res;

    try {
        res = this.getCh().unset({id: aID});
    } catch(e) {
        throw e;
    }

    return res;
}

/**
 * <odoc>
 * <key>GIST.close()</key>
 * Destroys the current gist channel (no data will be losted since is stored in GitHub)
 * </odoc>
 */
GIST.prototype.close = function() {
    $(this.ch).destroy();
};