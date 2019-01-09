
$(document).ready(function () {

	$.getJSON("data.json", function (data) {
		var $select = $('.down');
		$select.find('option').remove();
		$.each(data, function (key, value) {
			$select.append('<option value=' + value.name + '>' + value.name + '</option>');
			console.log(value.name);
		});
	});

	function renderMaps(from, to) {

		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('panel'));

		var request = {
			origin: from,
			destination: to,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

		directionsService.route(request, function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
	}

	renderMaps("Cicaheum", "Ujung Berung");

	$("#rute").click(function () {
		$('#map').remove();
		$('#maps_canvas').append('<div id="map" style="width: 100%; height: 750px; float: left;"></div>');

		$('#panel').remove();
		$('#panel_canvas').append('<div id="panel" style="width: 100%; float: right;"></div>');

		let from = $("#from").find(":selected").text();
		let to = $("#to").find(":selected").text();
		renderMaps(from, to);
	});
});