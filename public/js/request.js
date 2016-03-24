//this request works 

var request = function(){

	var url = "";

	return {
		get : function(url, fn){
			var xmlhttp = new XMLHttpRequest();
			
			console.log(fn);

			xmlhttp.open("GET", url, true);
			xmlhttp.send();

			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			       var data = xmlhttp.responseText;
			       //console.log(data);
			       fn(data);
			    }
			};
		}
	};
}();