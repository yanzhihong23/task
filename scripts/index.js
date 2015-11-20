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
			if(+data.flag === 1) {
				location.href = +data.data.switchOpen === 1 ? 'list.html' : 'disabled.html';
			} else {
				alert(data.msg);
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