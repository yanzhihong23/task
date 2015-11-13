$(function() {
	var utils = new Utils();

	var headers = localStorage.getItem('task.headers');
	if(headers) {
		headers = JSON.parse(headers);
	}

	console.log(headers);

	var getTaskList = function(type, start) {
		$.ajax({
			type: 'POST',
			url: utils.HOST + '/queryTaskListForOwner',
			// timeout: 5000,
			headers: headers,
			data: $.param({
				queryType: type || 1, // 1: in progress, 2: complete
				start: start || 0
			}),
			beforeSend: function(xhr, settings) {
				$('.loading').show();
			},
			success: function(data) {
				if(+data.flag === 1) {

				}
			},
			complete: function(xhr, status) {
				$('.loading').hide();
			}
		});
	};

	getTaskList();

	// click handler
	$('.switcher').click(function(e) {
		$('.switcher .item').removeClass('active');
		$(e.target).addClass('active');
	});
	
});