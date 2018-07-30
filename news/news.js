const http = require ('https');
const ids = require('./mailchimpdata.js')
// those variable will be exported from another file for security matters

//end


module.exports =(req, res) =>{
var ok = 0;

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

var hreq = http.request(options, (hres) =>{
    hres.setEncoding('utf8');	
	var response = '';
    hres.on('data',  (data) => {
        response += data;
    });
    hres.on('end',  () => {
        var responseValue = parseInt(response.substr(response.indexOf('"status":') + ('"status":').length));
        console.log(response);
        console.log(response.indexOf('Member Exists'));
         if (responseValue && (responseValue < 300 || (responseValue === 400 && response.indexOf('Member Exists') != -1)))
         {
         res.send("ok");
        }
        else
            res.send("ko");
    });
    hres.on('error', function (e) {
            console.log('ERROR: ' + e.message);
    }); 
});
hreq.write(subscriber);
console.log(ok.toString());
hreq.end(); 

}