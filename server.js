//Install express server
const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');

// Serve only the static files form the dist directory
app.use(express.static('./dist/AutoTagClient'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/AutoTagClient/'});
});

// Start the app by listening on the default Heroku port
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'autotagportal'
}, app).listen(process.env.PORT || 4202);
