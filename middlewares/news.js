const http = require ('https');
const ids = require('../config/keys.js')

module.exports = (req, res) => {

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

var hreq = http.request(options, (hres) => {
    hres.setEncoding('utf8');
    var response = '';
    hres.on('data',  (data) => {
        response += data;
    });
    hres.on('end',  () => {
        var responseValue = parseInt(response.substr(response.indexOf('"status":') + ('"status":').length));
        console.log('#debut');
        console.log(response);
        console.log('#milieu');
        console.log(responseValue);
        console.log(response.indexOf('Member Exists'));
        console.log('#fin');
        if (!responseValue)
            res.send("ok");
        else
        {
            var index = response.indexOf('"detail":') + ('"detail":"').length;
            console.log(response.substr(index).indexOf("\","));
            res.send(response.substr(index, response.substr(index).indexOf(".\"") == -1 ? (response.substr(index).indexOf("\",")) : (response.substr(index).indexOf(".\""))));
        }
    });
    hres.on('error', function (e) {
        console.log('ERROR: ' + e.message);
        });
    });
    hreq.write(subscriber);
    hreq.end();
}
