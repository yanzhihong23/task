$(function() {
	var utils = new Utils(),
			search = utils.getSearch(),
			zjtoken = search.zjtoken || '64C8B923-8ABE-42CE-ABF5-AEBACDA09DF3-75022-00009F62C13819AC`AATmZNU1hZX/rUCJTc2o4Z5bMbj9Ab7I`1',
			store_id = search.store_id || 7,
			headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'zjtoken': zjtoken,
				'store_id': store_id,
				'userType': 2
			};

	if(zjtoken && store_id) {
		localStorage.setItem('task.headers', JSON.stringify(headers));
	}

	location.href = 'list.html';
});