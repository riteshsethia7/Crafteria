const http = require('http');
const debug = require('debug')('crafteria');
const app = require('./backend/app');

const port = process.env.PORT || 3000 ;

app.set('port',port);
const server = http.createServer(app);

server.listen(port , () => { console.log("connected to 3000")});

