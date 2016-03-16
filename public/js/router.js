var router = (function(){


	//make a router
	var routes = new Rlite();
	
	routes.add('', function(){
		llApp.wrapper.innerHTML = llApp.feedData;
	});

	routes.add('appearance/:id', function(route){
		request.get('http://localhost:3000/api/appearance/' + route.params.id, function(d){
			llApp.wrapper.innerHTML = d;
			llApp.appearance();
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

