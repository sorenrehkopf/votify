var express = require('express');
var router = express.Router();

router.get('/getPlaylists',function(req,res){
	console.log('hey!');
	res.send('hey');
})

module.exports = router;