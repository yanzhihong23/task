$(function() {
	var utils = new Utils(),
			headers = utils.getHeaders();

	var getTaskList = function(type, start) {
		$.ajax({
			type: 'POST',
			url: utils.HOST + '/queryTaskListForOwner',
			// timeout: 5000,
			headers: headers,
			cache: true,
			data: $.param({
				queryType: type || 1, // 1: in progress, 2: complete
				start: start || 0
			}),
			beforeSend: function(xhr, settings) {
				$('.loading').show();
			},
			success: function(data) {
				if(+data.flag === 1) {
					var list = data.data.list;
					if(list.length) {
						list = list.map(function(obj) {
							var status;
							switch(obj.status) {
								case '0':
									status = 'published';
									desc = '发布中，等待接受任务';
									break;
								case '1':
								case '2':
									status = 'accepted';
									desc = '您的任务正在推广中';
									break;
								case '3':
									status = 'completed';
									desc = '您的任务已推广完成';
									break;
								case '4':
								case '5':
									status = 'reviewed';
									desc = '您已完成评论';
									break;
							}

							obj.status = status;
							obj.desc = desc;

							var updatedDate = moment(obj.updatedDate).format('YYYY-MM-DD HH:mm');
							obj.updatedDate = updatedDate;
							
							return obj;
						});

						render(list);
					}

					console.log(list);
				}
			},
			complete: function(xhr, status) {
				$('.loading').hide();
			}
		});
	};

	var render = function(list) {
		var fragment = document.createDocumentFragment();
		for(var i=0, len=list.length; i<len; i++) {
			// create element
			var item = document.createElement('section'),
					icon = document.createElement('i'),
					content = document.createElement('div'),
					time = document.createElement('div'),
					desc = document.createElement('div');
			// add class
			item.className = 'item';
			icon.className = 'icon ' + list[i].status;
			content.className = 'content';
			time.className = 'time';
			desc.className = 'desc';
			// set content
			time.innerHTML = list[i].updatedDate;
			desc.innerHTML = list[i].desc;
			// set data
			item.setAttribute('data-taskId', list[i].taskId);
			// append
			content.appendChild(time);
			content.appendChild(desc);

			item.appendChild(icon);
			item.appendChild(content);

			fragment.appendChild(item);
		}

		$('.task-list').html('').append(fragment);
		$('body').scrollTop(0);
		bindItemEvent();
	};

	var bindItemEvent = function() {
		$('.task-list .item').click(function(e) {
			var taskId = $(e.target).parents('.item').data('taskid');
			location.href = 'detail.html?taskId=' + taskId;
		});
	};

	getTaskList();

	// click handler
	$('.switcher').click(function(e) {
		if($(e.target).hasClass('active')) return;

		$('.switcher .item').removeClass('active');
		$(e.target).addClass('active');
		var type = $(e.target).data('type');
		getTaskList(type);
	});

	// publish handler
	$('.publish .button').click(function(e) {
		location.href = 'publish.html';
	});
	
});