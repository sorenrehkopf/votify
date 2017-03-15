import Http from './httpService.jsx';

class SpotifyService {
	
	static getPlaylists(){
		return Http({
			method:'GET',
			url:'/api/spotify/getPlaylists'
			});
	}

}

export default SpotifyService;