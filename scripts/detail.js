$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders(),
			taskId = utils.getSearch().taskId;

	$.ajax({
		type: 'POST',
		url: utils.HOST + '/getTaskDetail',
		headers: headers,
		data: $.param({
			taskId: taskId || '4'
		}),
		beforeSend: function(xhr, settings) {
			$('.loading').show();
		},
		success: function(data) {
			if(+data.flag === 1) {
				var detail = data.data;
				$('.company').html(detail.acceptorCompany);
				$('.user .name').html(detail.acceptorName);
				$('.user .phone').html(detail.acceptorMobileNumber);
				$('.task').html('任务: ' + detail.taskContent);

				if(detail.acceptedDate) {
					$('#accept, #promote').addClass('active');
					$('#accept .date').html(moment(detail.acceptedDate).format('YYYY-MM-DD HH:mm'));
					if(detail.taskPeriodDay) {
						$('#promote .status').html('已推广了' + detail.taskPeriodDay + '天');
					}
				}

				// if(detail.taskPeriodDay) {
				// 	$('#promote').addClass('active');
				// 	$('#promote .status').html('已推广了' + detail.taskPeriodDay + '天');
				// }

				if(detail.finishDate) {
					$('#complete').addClass('active');
					$('#complete .date').html(moment(detail.acceptedDate).format('YYYY-MM-DD HH:mm'));
					if(!detail.reviewDate) {
						$('.review .button').removeAttr('disabled').click(function(e) {
							location.href = 'review.html?taskId=' + taskId;
						});
					}
				}

			}
		},
		complete: function(xhr, status) {
			$('.loading').hide();
		}
	});

	// back button event
	$('.back').click(function() {
		history.back();
	});
});