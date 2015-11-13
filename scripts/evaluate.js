$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders();

	$('.score').click(function(e) {
		var val = $(e.target).data('value');
		var parent = $(e.target).parent();
		parent.data('score', val);
		parent.children().removeClass('active');
		for(var i=0; i<+val; i++) {
			parent.children('*:nth-child(' + (i + 1) + ')').addClass('active');
		}
	});

	$('.submit').click(function(e) {
		var comment = $('#comment').val(),
				attitude = $('#attitude').data('score'),
				satisfaction = $('#satisfaction').data('score'),
				method = $('#method').data('score');
				
		$.ajax({
			type: 'POST',
			url: utils.HOST + '/reviewTask',
			headers: headers,
			data: $.param({
				taskId: '',
				attitudeScore: attitude,
				satisfactionScore: satisfaction,
				methodScore: method,
				content: comment
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