const express = require('express');
const parser = require('body-parser');
var request = require('superagent');

const port = process.env.PORT || 8080;

app = express();
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));


var mailchimpInstance   = 'us18';
var listUniqueId        = 'a2a4ea0fb5';
var mailchimpApiKey     = '2b62581492cabf90369aeafc4a90a5f1-us18';

app.get('/', function (req, res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer.from('any:' + mailchimpApiKey).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
        })
        .end(function(err, response) {
        	  if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('subscribed!');
              } else {

                res.send('Subscription failed');
              }
        });
});

app.listen (port, () => console.log('Listening on port ' + port));
