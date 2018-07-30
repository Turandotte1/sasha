const express = require('express');


app = express();

app.get ('/',  (req, res)=>{
	console.log('je suis le main');
	res.sendFile(__dirname + '/index.html');
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('caca');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('j ecoute sur le port:', port)
});