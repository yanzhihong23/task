$(function() {
	var utils = new Utils();

	var headers = localStorage.getItem('task.headers');
	if(headers) {
		headers = JSON.parse(headers);
	}

	$.ajax({
		type: 'POST',
		url: utils.HOST + '/getTaskDetail',
		headers: headers,
		data: $.param({
			taskId: ''
		}),
		beforeSend: function(xhr, settings) {
			$('.loading').show();
		},
		success: function(data) {
			if(+data.flag === 1) {
				$('.alert').addClass('slideInUp animated flash show');
			}
		},
		complete: function(xhr, status) {
			$('.loading').hide();
		}
	})
});