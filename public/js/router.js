var router = (function(){

    function _appearance() {
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
    }

	//make a router
	var routes = new Rlite();
	
	routes.add('', function(){
		llApp.wrapper.innerHTML = llApp.feedData;
	});

	routes.add('appearance/:id', function(route){
		request.get('http://localhost:3000/api/appearance/' + route.params.id, function(d){
			llApp.wrapper.innerHTML = d;
			_appearance();
		});
	});
	return routes;

}());

//tried to write it myself but failed to work with the xhr request. Maybe ill look into it this weekend.

// var router = function() {
// 	var _routes = {};

// 	function _router() {
// 		//get the hash from the url, remove the hash
// 	    var url = location.hash.slice(1);
// 	    // Look up if the route exists in the routes object
// 	    var route = _routes[url];
// 	    console.log(route)
// 	    // Check if we have a wrapper element, and if the route has any data to show
// 	    if (app.wrapper && route) {
// 	        // Add the data to the wrapper, since the data is already html
// 	        route();
// 	    }
// 	}

// 	return {
// 		init : function(){
// 			window.addEventListener('hashchange', _router());
// 			window.addEventListener('load', _router());
// 		},

// 		newRoute : function(path, fn){
// 			_routes[path] = path;
// 			console.log(_routes);
// 		}
// 	};
// }();

