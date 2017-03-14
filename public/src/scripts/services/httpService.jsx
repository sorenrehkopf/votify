function Http(data){
	var authHeader = window.localStorage.getItem('auth_token');
	return new Promise(function(resolve,reject){
		var http = new XMLHttpRequest();
		var method = data.method;
		http.open(data.method,data.url);
		http.setRequestHeader('auth_token', authHeader);
		http.send(null);
		http.onreadystatechange = function(){
			if(http.readyState === 4){
				if(http.status===200) resolve({data:JSON.parse(http.response)});
				else reject('error '+http.status);
			}
		};
	})
}

export default Http;