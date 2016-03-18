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
        if (document.readyState !== 'loading' && fn instanceof Function) {
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

     app.appearance = function() {
        var firstProduct = document.querySelector('.product');
        var firstIndicator = document.querySelector(
            '.product-indicator[data-uuid="' + firstProduct.getAttribute('data-uuid') + '"]'
        );
        var indicators = document.querySelectorAll('.product-indicator');

        firstProduct.classList.add('product-active');
        firstIndicator.classList.add('product-indicator-active');

        Array.prototype.forEach.call(indicators, function (el) {
            el.addEventListener('click', function (event) {
                var id = event.currentTarget.getAttribute('data-uuid');

                document
                    .querySelector('.product-active')
                    .classList.remove('product-active');

                document
                    .querySelector('.product-indicator-active')
                    .classList.remove('product-indicator-active');

                document
                    .querySelector('.product[data-uuid="' + id + '"]')
                    .classList.add('product-active');

                event.currentTarget.classList.add('product-indicator-active');
            });
        });
    };

    app.init = function(){
    	//router.init();

    	app.wrapper = document.querySelector('main');

    	request.get('/api/feed', function(d){
    		app.feedData = d;
			_processHash();	
    	});

	    _ready(function () {
	        if (/appearance/.test(window.location.href)) {
	            app.appearance();
	        }
    	});

    	window.addEventListener('hashchange', _processHash);
    };

    return app;
}();


(function(){
	llApp.init();
}());

