function onSubmit(event){
	event.preventDefault();
	function onSuccess(list){
		console.log(list);
		var name = list.tracks.items[0].name;
		var artist = list.tracks.items[0].artists[0].name;
		var cover = list.tracks.items[0].album.images[0].url;
		var preview = list.tracks.items[0].preview_url;
		$('.title').empty();
		$('.author').empty();
		$('.title').append(name);
		$('.author').append(artist);
		$('#cover_img').attr('src', cover);
		$('#track').attr('src', preview);

		$('.btn-play').on('click', function(){		
			$("#track").on('timeupdate', function(){
				var myAudio = document.getElementById('track');
				var time = myAudio.currentTime;
				$('progress').attr('value', time);
			});					

			$('.btn-play').toggleClass('playing');
			if($('.playing').val() !== undefined){
				$('#track').trigger('play');
			} else{
				$('#track').trigger('pause');
			};
		});



		$('.author').on('click', function(){
			var artist_info = $.get("https://api.spotify.com/v1/search?type=artist&query=" + artist);
			artist_info.done(showArtistInfo);
			artist_info.fail(onFailure);
		});
	}

	function showArtistInfo(list){
		var name = list.artists.items[0].name;
		var image = list.artists.items[0].images[0].url;
		var genre = list.artists.items[0].genres[0];
		var followers = list.artists.items[0].followers.total;
		var artist_id = list.artists.items[0].id;

		$('#myModal').modal('show');
		console.log(list);
		$('.modal-header h2').empty();
		$('.modal-header h2').append(name);

		$('.modal-body img').empty();
		$('.modal-body img').attr('src', image);
		$('.modal-body img').animate({
			'width' : '75%'
		}, 1000);

		$('.modal-body p').empty();
		$('.modal-body p').append("<br><strong>" + name + "'s</strong> Music is mainly <strong>" + genre + "</strong><br>");
		$('.modal-body p').append("He has about <strong>" + followers + "</strong> followers all over the world!<br><br>");

		$('.modal-body p').append("<button id='albums' class='btn btn-dark' style='width:100%'>CHECK OUT HIS ALBUMS</button>");


		$('#albums').on('click', function(){
			var albums = $.get("https://api.spotify.com/v1/artists/" + artist_id +"/albums");
			albums.done(showAlbums);
			albums.fail(onFailure);
		});

	};

	function showAlbums(list){
		console.log(list);
		$('.modal-pic').empty();
		$('.modal-info').empty();
		$('.modal-header h2').append(" Albums");

		list.items.forEach(function(ls){
			var current_alb = ls.name;
			var alb_id = ls.id
			$('.modal-info').append("<button id="+ alb_id + " class='btn btn-dark' style='width:100%'>" + current_alb + "</button>" + "<br>");
			
			$("#" + alb_id).on('click', function(){
				var tracks = $.get("https://api.spotify.com/v1/albums/" + alb_id);
				tracks.done(showTracks);
				tracks.fail(onFailure);
			});
		});
	}

	function showTracks(list){
		$('.modal-info').empty();
		// $('.modal-body').append('<div class="modal-info"></div>');

		$('.modal-header h2').empty();
		$('.modal-header h2').append(list.name + " Tracks");
		console.log(list);
		list.tracks.items.forEach(function(ls){
			var track = ls.name;
			var track_url = ls.preview_url;
			var track_id = ls.id;
			console.log(track_url);
			if(track_url !== undefined || track_url !== null){
				// $('.modal-body').addClass('tracks');
				$('.modal-info').append("<audio id=" + track_id + " src="+ track_url + " type='audio/mpeg'></audio>");
				$('.modal-info').append('<button data-id=' + track_id + ' class="glyphicon glyphicon-play track-button btn-dark"></button>' + track + '<br>');
			};
		});
		$(".track-button").on('click', function(event){	
			var song_id = $(this).attr('data-id');

			$(this).toggleClass('playing');
			if($('.playing').val() !== undefined){
				$(this).removeClass('glyphicon-play');				$(this).toggleClass('glyphicon-pause');
				$(this).addClass('glyphicon-pause');
				$('#' + song_id).trigger('play');
			} else{
				$(this).removeClass('glyphicon-pause');
				$(this).addClass('glyphicon-play');
				$('#' + song_id).trigger('pause');
			};

		});

	}
	function onFailure(err){
		console.error(err.responseJSON);
	}

	var track = $('#search').val();
	var load_track = $.get("https://api.spotify.com/v1/search?type=track&query=" + track);	
	load_track.done(onSuccess);
	load_track.fail(onFailure);
}




$('#submit').on('click', onSubmit);