function Http(config,noAuth){
	var authHeader = window.localStorage.getItem('authtoken');
	var data = null;
	return new Promise(function(resolve,reject){
		var http = new XMLHttpRequest();
		http.open(config.method,config.url);
		if(!noAuth) http.setRequestHeader('authtoken', authHeader);
		if(config.data){
			http.setRequestHeader('Content-Type', 'application/json');
			data = JSON.stringify(config.data);
			console.log(data);
		}
		http.send(data);
		http.onreadystatechange = function(){
			if(http.readyState === 4){
				if(http.status===200) resolve({data:JSON.parse(http.response)});
				else reject('error '+http.status);
			}
		};
	})
}

export default Http;