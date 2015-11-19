(function() {
	var Utils = function() {
		this.HOST = (/zaijiadd.com/.test(location.host) ? location.protocol + '//' + location.host : 'http://b2b.zaijiadd.com') + '/zaijiadd-app';
	};

	Utils.prototype.getSearch = function() {
		var query_string = {},
	  		query = window.location.search.substring(1),
	  		vars = query.split("&");

	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	        // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	        // If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	        // If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  }

    return query_string;
	};

	Utils.prototype.setHeaders = function(headers) {
		localStorage.setItem('task.headers', JSON.stringify(headers));
	};

	Utils.prototype.getHeaders = function() {
		var headers = localStorage.getItem('task.headers');
		if(headers) {
			headers = JSON.parse(headers);
		}

		return headers;
	};

	Utils.prototype.dateFormatter = function(str) {
		var date = str ? new Date(str) : new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hours = date.getHours(),
				minutes = date.getMinutes();

		var appendZero = function(obj) {
			return (obj < 10 ? '0' : '') + obj;
		};

		return year + '-' + appendZero(month) + '-' + appendZero(day) + ' ' + appendZero(hours) + ':' + appendZero(minutes)
	}; 

	Utils.prototype.init = function() {
		var search = this.getSearch(),
				zjtoken = search.zjtoken || 'AA6C935B-519C-423D-A4CF-5E6E248D036B-15240-000006C5D1E6EBC6`7APVlAiIhUc8Vh02Wa0V5slLKb60If/N`52',
				store_id = search.store_id || 58,
				headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cache-Control': 'max-age=60',
					'zjtoken': zjtoken,
					'storeid': store_id,
					'userType': 2
				};

		this.setHeaders(headers);
	};

	window.Utils = Utils;
 })();