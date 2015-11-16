(function() {
	// create component
	var fragment = document.createDocumentFragment();
	var aside = document.createElement('aside');
	var div = document.createElement('div');
	div.className = 'back';
	div.id = 'back';
	aside.appendChild(div);
	fragment.appendChild(aside);

	// append to body
	document.body.appendChild(fragment);

	// bind event
	document.getElementById('back').addEventListener('click', function(e) {
		history.back();
	});
})();