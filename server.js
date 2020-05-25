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
app.listen(process.env.PORT || 4200, '0.0.0.0');
