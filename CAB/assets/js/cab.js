$(document).ready(function() {

	var _branch = ''
		,	maptype = ''

	var branchMap = {
		'dover' 		: '<img src="http://maps.googleapis.com/maps/api/staticmap?center=color:blue|label:S51.127700,1.314671&zoom=17&markers=color:blue|label:S|51.127700,1.314671&size=532x412&sensor=false">',
		'deal' 			: '<img src="http://maps.googleapis.com/maps/api/staticmap?center=51.221125,1.402917&zoom=17&markers=color:blue|51.221125,1.402917|51.274932,1.338732|51.125490,1.313927|51.221125,1.402917&size=532x412&sensor=false">',
		'sandwich'	: '<img src="http://maps.googleapis.com/maps/api/staticmap?center=51.274932,1.338732&zoom=17&markers=color:blue|label:S51.221125,1.402917|51.274932,1.338732&size=532x412&sensor=false">',
		'gateway'		: '<img src="http://maps.googleapis.com/maps/api/staticmap?center=51.125490,1.313927&zoom=17&markers=color:blue|label:S51.221125,1.402917|51.274932,1.338732|51.125490,1.313927&size=532x412&sensor=false">'
	}

	$('#myModal').on('show', function() {
		var html = branchMap[_branch].replace('terrain', maptype)
		$('#myModalBody').html(html)
		var name = _branch[0].toUpperCase() + _branch.slice(1,_branch.length)
		$('#myModalLabel').html('Map of ' + name + ' branch')
	});

  $('.myModal').click(function() {
  	_branch = $(this).attr('id')		
		$('#myModal').modal('show')
	});

});