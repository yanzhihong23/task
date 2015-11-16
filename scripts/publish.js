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
		$.ajax({
			type: 'POST',
			url: utils.HOST + '/publishTask',
			headers: headers,
			data: $.param({
				taskTitle: '店铺推广',
				taskContent: '推广' + info.storeName + '，为期30天。'
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

	// back button event
	$('.back').click(function() {
		history.back();
	});
});