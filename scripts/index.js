(function() {
	var utils = new Utils();

	utils.init();

	$.ajax({
		method: 'POST',
		url: utils.HOST + '/getSwitchInfo',
		headers: utils.getHeaders(),
		beforeSend: function(xhr, settings) {
			$('.loading').show();
		},
		success: function(data) {
			if(+data.flag === 1 && +data.data.switchOpen ===1) { // enabled
				location.href = 'list.html';
			} else {
				location.href = 'progress.html?type=disabled';
			}
		},
		error: function(err) {
			console.log('ajax error');
		},
		complete: function(xhr, status) {
			$('.loading').hide();
		}
	});

})();