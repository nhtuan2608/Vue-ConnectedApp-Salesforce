const express = require('express');
const jsforce = require('jsforce');
const cors = require('cors');
var cache = require('memory-cache');
const app = express()

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Salesforce
var username = 'celorust@gmail.com';
var password = 'ngTuan2020';
var accessToken = '';
var instanceUrl = '';
// Pattern split username and password common.js Vue
var pattern = '5$ZxCvbDk$l3';
const params = {
    client_id: '3MVG9G9pzCUSkzZvW0n1BVLE_uG7DkWPgQJYTlldloxYU30ThrdmvyjHckpoeNoFimTam.LxebMFqIxSrdpkd',
    client_secret: 'C352494D39F6D9027D5D1354AA7CF50B1FF4F52E8C3B90440B55D83F3064D0E6',
    redirect_uri: 'http://localhost:3000/oauth2/success',
}
// process.env.CLIENT_ID='3MVG9G9pzCUSkzZvW0n1BVLE_uG7DkWPgQJYTlldloxYU30ThrdmvyjHckpoeNoFimTam.LxebMFqIxSrdpkd';
// process.env.CLIENT_SECRET_ID='C352494D39F6D9027D5D1354AA7CF50B1FF4F52E8C3B90440B55D83F3064D0E6';
// process.env.REDIRECT_URI='https://login.salesforce.com/services/oauth2/success'
// var SECURITY_TOKEN='6Cel800D2v000001vnEv8882v000007w3EwdgLHSJhcH6jcFJge2n2bLUIZVPK5KMOT759by4bpbs7EW860y0SD6lUcbaCGNQIOv5HvNn00';

//
var oauth2 = new jsforce.OAuth2({
	// you can change loginUrl to connect to sandbox or prerelease env.
	// loginUrl : 'https://test.salesforce.com',
	clientId : params.client_id,
	clientSecret : params.client_secret,
	redirectUri : params.redirect_uri,
});
  //
  // Get authorization url and redirect to it.
  //
//   http://localhost:9090/oauth2/auth
app.get('/oauth2/auth', function(req, res) {
	isAuthorized(res);
});

app.get('/oauth2/success', function(req, res) {
	var authConn = new jsforce.Connection({ oauth2 });
	authConn.authorize(req.query.code, function (err, userInfo) {
		accessToken = authConn.accessToken;
		instanceUrl = authConn.instanceUrl;
		res.cookie('sf_token', authConn.accessToken);
        res.cookie('port', PORT);
		res.redirect('http://localhost:8080/');
		console.log('Authorized to SF');
		// res.send(200);
	});
	
	// console.log('token $$$$: ' + this.accessToken);
    // res.send('ADASSDSA');
});

app.get('/auth/:info', (req, res) => {
	console.log(req.params);
	console.log(req.params.info);
	const info = req.params.info;
	var username = req.params.info.split(pattern)[0];
	var password = req.params.info.split(pattern)[1];
	// const event = events.find(event => event.id === id);
	console.log(info);
	console.log(username);
	console.log(password);
	var conn = openConnection(instanceUrl, accessToken);
	var isValid = false;
	conn.query("SELECT Id, Name, password__c, username__c, email__c FROM Account WHERE username__c = '" + username + "'" , function(err, result) {
	  if (err) { return console.error(err); }
	  console.log(result);
	  console.log("fetched : " + result.records.length);
	  console.log("records : " + result.records);
	  if(username == result.records[0].username__c) {
		  isValid = true;
		  console.log('isValid: ' + isValid);
		  console.log('isValid: ' + result.records[0].password__c);
	  }
	});
	if(isValid) {
		res.send('Success');
	} else {
		res.send('Access denied');
	}
  });

  function openConnection(url, token) {
	return conn = new jsforce.Connection({
		instanceUrl : url,
		accessToken : token
	  });
  }

  function isAuthorized(res) {
	  	// if server has been authorized (accessToken != '')
		if(accessToken) {
			console.log('SF is authorized, page is refreshed.');
			res.redirect('http://localhost:8080/');
		} else {
	  		// if server hasn't been authorized yet (accessToken = '')
			console.log('Authorizing... to SF');
			res.redirect(oauth2.getAuthorizationUrl({ scope : 'api' }));
		}
  }