class SpotifyService {
	
	static getPlaylists(){
		var http = new XMLHttpRequest();
		http.open(
			'GET',
			'/api/spotify/getPlaylists');
		http.send(null);
		http.onreadystatechange = function(){
			if(http.readyState === 4){
				if(http.status===200) console.log(http.response);
				else console.log('error '+http.status);
			}
		};

	}

}

export default SpotifyService;