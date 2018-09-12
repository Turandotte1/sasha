const http = require ('https');
const ids = require('../config/keys.js')

module.exports = (req, res, callback) => {

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
        'Authorization': 'Token ' + ids .mailChimpApiKey ,
        'Content-Length': subscriber.length
    }
}


let hreq = http.request(options, (hres) => {
    hres.setEncoding('utf8');
    let response = '';
    hres.on('data',  (data) => {
        response += data;
    });
    hres.on('end',  () => {
		response = JSON.parse(response);
        if (!response.status)
			callback(null, 'caca')
        else
        {
		callback(response.detail);
        }
    });
    hres.on('error', function (e) {
		callback(err)
        });
    });
    hreq.write(subscriber);
    hreq.end();
}
