$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders(),
			taskId = utils.getSearch().taskId;

	var detail = localStorage.getItem('task.taskDetail');
	if(detail) {
		detail = JSON.parse(detail);
		$('.desc .company').html(detail.acceptorCompany);
		$('.desc .name').html(detail.acceptorName);
		$('.desc .phone').html(detail.acceptorMobileNumber);
	}

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
				taskId: taskId,
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

					setTimeout(function() {
						location.href = 'list.html';
					}, 3000);
				} else {
					alert('啊哦，出错了~');
				}
			},
			complete: function(xhr, status) {
				$('.loading').hide();
			}
		});
	});
});