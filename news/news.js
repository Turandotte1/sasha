const http = require ('http');
const ids = require('./mailchimpdata.js')
// those variable will be exported from another file for security matters

//end

var ok = 0;

module.exports =(req, res) =>{
	var i = 0;
var subscriber = JSON.stringify({
    'email_address': req.body.email, 
    'status': 'subscribed', 
});

var options = {
    host: ids.mailchimpInstance + '.api.mailchimp.com',
    path: '/3.0/lists/' + ids.listUniqueId + '/members',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + ids.mailChimpApiKey ,
        'Content-Length': subscriber.length
    }
}
console.log('coucou' + (i++).toString() + req.body.email);

var hreq = http.request(options, (hres) =>{
    console.log('STATUS CODE: ' + hres.statusCode);
    console.log('HEADERS: ' + JSON.stringify(hres.headers));
    hres.setEncoding('utf8');
	
	var response = '';
    hres.on('data',  (data) => {
        response += data;
    });
    hres.on('end',  () => {
        console.log(response);
        var responseValue = parseInt(response.substr(response.indexOf('"status":') + ('"status":').length));
         console.log(parseInt(responseValue)); 
         if (responseValue && (responseValue < 300 || (responseValue === 400 && response.indexOf('Member Exists'))))
         	ok = 1;
    });
    hres.on('error', function (e) {
            console.log('ERROR: ' + e.message);
    }); 
});
hreq.write(subscriber);
hreq.end(); 
	if (ok){
    		res.send('subscribed!');
    	}
    else {
    res.send('Subscription failed');
	}
}