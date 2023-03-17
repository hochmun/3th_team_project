/**
 * Cross domain storage.
 * Based on: http://www.nczonline.net/blog/2010/09/07/learning-from-xauth-cross-domain-localstorage/
 * @author Juan Ramón González Hidalgo
 *
 * @param opts JSON object with the attribute names:
 *      - origin Iframe URL
 *      - path Path to iframe html file in origin
 *      - storage String I.e: 'localStorage' OR 'sessionStorage' (default: 'localStorage')
 *          Indeed, it can be any window global object which accepts getItem, setItem and removeItem methods.
 */
var crossDomainStorage = function(opts) {
	var origin			= opts.origin || '',
		path			= opts.path || '',
        storage			= opts.storage || 'localStorage',
		cdstorage		= {
			'settings' : {
			    _storage : storage,
		        _origin : origin,
		        _path : path,
		        _bakStorage : null
			}
		};
	
	document.crossDomainStorageIfrm		= typeof(document.crossDomainStorageIfrm) != 'undefined' ? document.crossDomainStorageIfrm : null,
	document.crossDomainStorageIfrmReady = typeof(document.crossDomainStorageIfrmReady) != 'undefined' ? document.crossDomainStorageIfrmReady : false;

	window.cdstrg = window.cdstrg || {
		_queue : [],
		_requests : [],
		_id : 0
	}
	
    var supported = (function(){
        try{
            return window.JSON && cdstorage.settings_storage in window && window[cdstorage.settings_storage] !== null && !cdstorage.settings._origin.match(location.host);
        }catch(e){
            return false;
        }
    })();

    //private methods

    var _sendRequest = function(data){
        if (document.crossDomainStorageIfrm) {
            window.cdstrg._requests[data.request.id] = data;
            document.crossDomainStorageIfrm.contentWindow.postMessage(JSON.stringify(data.request), cdstorage.settings._origin);
        }
    };

    var _iframeLoaded = function(){
        document.crossDomainStorageIfrmReady = true;
        if (window.cdstrg._queue.length) {
            for (var i=0, len=window.cdstrg._queue.length; i < len; i++){
                _sendRequest(window.cdstrg._queue[i]);
            }
            window.cdstrg._queue = [];
        }
    };

    var _handleMessage = function(event){
        if (event.origin === cdstorage.settings._origin) {
        	try{
            	var data = JSON.parse(event.data);
        	}
        	catch(e) {
        		var data = event.data;
        	}
        	
            if (typeof window.cdstrg._requests[data.id] != 'undefined') {
                if (typeof window.cdstrg._requests[data.id].deferred !== 'undefined') {
                    window.cdstrg._requests[data.id].deferred.resolve(data.value);
                }
                if (typeof window.cdstrg._requests[data.id].callback === 'function') {
                    window.cdstrg._requests[data.id].callback(data.key, data.value);
                }
                delete window.cdstrg._requests[data.id];
            }
        }
    }

    //Public methods

    cdstorage.getItem = function(key, callback){
        if (supported) {
            var request = {
                    id: ++window.cdstrg._id,
                    type: 'get',
                    key: key,
                    storage: this.settings._storage
                },
                data = {
                    request: request,
                    callback: callback
                };
            if (window.jQuery) {
                data.deferred = jQuery.Deferred();
            }

            if (document.crossDomainStorageIfrmReady) {
                _sendRequest(data);
            } else {
            	window.cdstrg._queue.push(data);
            }

            if (window.jQuery) {
                return data.deferred.promise();
            }
        }
        else {
        	 var storage = eval(this.settings._storage);
        	 var value = storage.getItem(key);
        	 return callback(key, value);
        }

        this.settings._storage = _bakStorage ? _bakStorage : this.settings._storage;
    }

    cdstorage.setItem = function(key, value){
        if (supported) {
            var request = {
                    id: ++window.cdstrg._id,
                    type: 'set',
                    key: key,
                    value: value,
                    storage: this.settings._storage
                },
                data = {
                    request: request
                };
            if (window.jQuery) {
                data.deferred = jQuery.Deferred();
            }

            if (document.crossDomainStorageIfrmReady) {
                _sendRequest(data);
            } else {
            	window.cdstrg._queue.push(data);
            }

            if (window.jQuery) {
                return data.deferred.promise();
            }
        }
        else {
       	    var storage = eval(this.settings._storage);
       	    return storage.setItem(key, value);
        }

        this.settings._storage = _bakStorage ? _bakStorage : this.settings._storage;
    }

    cdstorage.removeItem = function(key) {
        if (supported) {
            var request = {
                    id: ++window.cdstrg._id,
                    type: 'remove',
                    key: key,
                    storage: this.settings._storage
                },
                data = {
                    request: request
                };
            if (window.jQuery) {
                data.deferred = jQuery.Deferred();
            }

            if (document.crossDomainStorageIfrmReady) {
                _sendRequest(data);
            } else {
            	window.cdstrg._queue.push(data);
            }

            if (window.jQuery) {
                return data.deferred.promise();
            }
        }
        else {
       	    var storage = eval(this.settings._storage);
       	    return storage.removeItem(key);
        }

        this.settings._storage = _bakStorage ? _bakStorage : this.settings._storage;
    }

    cdstorage.setStorageOnce = function(strg) {
    	_bakStorage = this.settings._storage;
    	this.settings._storage = strg;
    }

    //Init
    if (!document.crossDomainStorageIfrmReady && supported) {
    	var src = cdstorage.settings._origin + cdstorage.settings._path;
    	
    	if($('iframe[src="'+ src +'"]').index() < 0) {
	        document.crossDomainStorageIfrm = document.createElement("iframe");
	        document.crossDomainStorageIfrm.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
	        document.body.insertBefore(document.crossDomainStorageIfrm, document.body.lastChild);
	        
	        if (window.addEventListener) {
	            document.crossDomainStorageIfrm.addEventListener("load", function(){ _iframeLoaded(); }, false);
	            window.addEventListener("message", function(event){ _handleMessage(event) }, false);
	        } else if (document.crossDomainStorageIfrm.attachEvent) {
	            document.crossDomainStorageIfrm.attachEvent("onload", function(){ document.crossDomainStorageIfrmLoaded(); }, false);
	            window.attachEvent("onmessage", function(event){ _handleMessage(event) });
	        }
	        document.crossDomainStorageIfrm.src = src;
    	}
    	else {
    		
    	}
    }

    return cdstorage;
}