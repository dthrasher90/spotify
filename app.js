



var getTopTracks = function(id) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=US",
		
		success: function (data) { 

				for (var i = 0; i < data.tracks.length; i++) {

				addTrack(data.tracks[i])
			}
		},
		
		error: function (error) {
			console.log(error)

			$("#results").append("There has been an error receiving data from Spotify - please make sure artist name is spelled correctly.")
		}
			
	});
	
};



var doSearch = function(searchText) {
	$('#results').empty();
	$.ajax({
		url: "https://api.spotify.com/v1/search?q=" + searchText + "&type=artist",

		


		success: function (data) { 

			var artist;

			for (var i = 0; i < data.artists.items.length; i++) {

				//pick the right artist & assign artist if conditions are good
				if (searchText.toUpperCase().trim() == data.artists.items[i].name.toUpperCase().trim()) {

					artist = data.artists.items[i];
				}
				

			}
				if (artist!=undefined) {
				getTopTracks(artist.id);
				}

				else {

						$("#results").append("There has been an error receiving data from Spotify - please make sure artist name is spelled correctly.")	
				}


				
		 	},


		
		 error: function (error) {
		
				console.log(error)

		

	}
})

}





var performSearch = function ()  {

doSearch($('#search').val())

}

$(document).ready(function() {

$("#submit").click(performSearch)

});




var addTrack = function(track){

	console.log(track);


	var parentresults = $('<div class="track-template">');


	var border = $('<div class="border">');

		$(parentresults).append(border);


	var art = $('<div class="art"><img src=' + track.album.images[2].url + '></div>');

		$(border).append(art);



	var preview = $('<div class="preview"><a href="' + track.preview_url +'" target="_blank">preview track</a></div>');

		$(border).append(preview);


	var link = $('<div class="link"><a href="' + track.external_urls.spotify +'"><img src="img/listen.png" class="listen"></a></div>');

		$(border).append(link);


	$("#results").append(parentresults);


	var trackName = $('<span class="track">'+track.name+'</span>');

		$(border).append(trackName);


	var numbers = $('<div class="numbers">' +            +'</div');	

		$(border).append(numbers);
}

