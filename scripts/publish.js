$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders(),
			info,
			standardTask = {
				title: '推广任务30天',
				content: '推广累计20天每日订单数65单以上，且每日复购金额达到500元以上，并且总用户数达到600以上，小店微信群人数达到200（需满足80%为小区有效用户）以上。'
			},
			isStandard = true;

	// get store info
	$.ajax({
		type: 'POST',
		url: utils.HOST + '/getStoreInfo',
		headers: headers,
		beforeSend: function(xhr, settings) {
			$('.loading').show();
		},
		success: function(data) {
			if(+data.flag === 1) {
				info = data.data;
				$('.address-wrapper .name').html('店铺: ' + info.storeName);
				$('.address-wrapper .address').html(info.address);
				$('.desc .contacts').html(info.realName + '(' + info.mobileNumber + ')');

				$('.task-content .store-name').html(info.storeName);
			}
		},
		complete: function(xhr, status) {
			$('.loading').hide();
		}
	});

	// publish handler
	$('.publish').click(function(e) {
		var title = $('#task_title').val(),
				content = $('#task_content').val();

		if(!title || !content) return;

		$.ajax({
			type: 'POST',
			url: utils.HOST + '/publishTask',
			headers: headers,
			data: $.param({
				taskTitle: title,
				taskContent: content,
				taskType: isStandard ? 1 : 2
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
				}
			},
			complete: function(xhr, status) {
				$('.loading').hide();
			}
		});
	});

	$('.cmd').click(function(e) {
		$('.cmd').removeClass('active');
		$(e.target).addClass('active');
		if($(e.target).attr('id') === 'standard') {
			isStandard = true;
			$('#task_title').attr('disabled', true).val(standardTask.title);
			$('#task_content').attr('disabled', true).val(standardTask.content);
		} else {
			isStandard = false
			$('#task_title, #task_content').removeAttr('disabled').val('');
		}
	});

	$('#standard').trigger('click');
});