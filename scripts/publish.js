$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders();

	$('.publish').click(function(e) {
		$.ajax({
			type: 'POST',
			url: utils.HOST + '/publishTask',
			headers: headers,
			data: $.param({
				taskTitle: 'test title',
				taskContent: 'test content'
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
		});
	});
});