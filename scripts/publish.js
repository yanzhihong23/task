$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders(),
			info;

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
				taskContent: content
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
});