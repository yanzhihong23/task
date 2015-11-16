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
				// save detail data for review page
				localStorage.setItem('task.taskDetail', JSON.stringify(detail));

				$('.company').html(detail.acceptorCompany);
				$('.user .name').html(detail.acceptorName);
				$('.user .phone').html(detail.acceptorMobileNumber);
				$('.task').html('任务: ' + detail.taskContent);

				switch(detail.status) {
					case 1: // accepted
					case 2: // progress
						$('#accept').addClass('active');
						$('#promote').addClass('current');
						$('#promote .date').html(utils.dateFormatter());
						break;
					case 3: // completed
						$('.review .button').removeAttr('disabled');
					case 4: // reviewed
					case 5: // paied
						$('#accept, #promote, #complete').addClass('active');
						break;
				}

				if(detail.acceptedDate) {
					$('#accept .date').html(utils.dateFormatter(detail.acceptedDate));
					if(detail.taskPeriodDay) {
						$('#promote .status').html('已推广了' + detail.taskPeriodDay + '天');
					}
				}

				if(detail.finishDate) {
					$('#complete .date').html(utils.dateFormatter(detail.acceptedDate));
					if(!detail.reviewDate) {
						$('.review .button').removeAttr('disabled').click(function(e) {
							location.href = 'evaluate.html?taskId=' + taskId;
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