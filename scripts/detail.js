$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders();

	$.ajax({
		type: 'POST',
		url: utils.HOST + '/getTaskDetail',
		headers: headers,
		data: $.param({
			taskId: '3'
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