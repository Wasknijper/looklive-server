var llApp = function () {
    'use strict';

    /**
     * Invoked when the page is ready.
     *
     * @param  {Function} fn
     * @return {void}
     */

    function _processHash() { // Hash-based routing, get the hash and run the router
		var hash = location.hash || '#';
		var currentPage = hash.slice(1);
		router.run(currentPage);
	}

    function _ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /**
     * Set the classes on the appearence page.
     *
     * @return {void}
     */

    //lets make some routes
    var app = {};
    app.wrapper = '';
 	app.feedData = '';

    app.init = function(){
    	//router.init();

    	app.wrapper = document.querySelector('main');

    	request.get('http://localhost:3000/api/feed', function(d){
    		app.feedData = d;
			_processHash();	
    	});

	    _ready(function () {
	        if (/appearance/.test(window.location.href)) {
	            _appearance();
	        }
    	});

    	window.addEventListener('hashchange', _processHash);
    };

    return app;
}();


(function(){
	llApp.init();
}());

