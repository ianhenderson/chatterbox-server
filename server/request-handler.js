/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
// var db = require('./database.js');
// var db;
var fs = require('fs');
var lazy = require('lazy');
var path = require('path');
var filepath = path.join(__dirname + '/database.js');
var db = [];
new lazy(fs.createReadStream(filepath), {encoding: 'utf8'})
        .lines
        .forEach(function(line){
          // console.log(line.toString());
          // db.push(JSON.parse(line.toString()));
          var test = line.toString()
          db.push(JSON.parse(test));
          console.log(db);
        });
// console.log(db);

// fs.readFile(filepath, 'utf8', function(err,data){
//   if (err){
//     return console.log(err);
//   }
//   db = data;
// });

// var writeout = 'HelloDOODZ';
// fs.appendFile(filepath, writeout, function(err){
//   if (err){
//     return console.log(err);
//   }
//   console.log(writeout);
// });





var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);
  // console.log(request);
  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

  if (request.method === 'GET'){
    console.log(JSON.stringify(db));
    response.write(JSON.stringify(db));
  } else if (request.method === 'POST') {
    request.on('data', function(data){
      var newEntry = {
        createdAt: new Date().toISOString(),
        objectId: "teDOY3Rnpe",
        roomname: JSON.parse(data).roomname,
        text: JSON.parse(data).text,
        updatedAt: new Date().toISOString(),
        username: JSON.parse(data).username
      };
      console.log(newEntry);
      db.push(newEntry);
    });
  }




  response.end();
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};


module.exports = handleRequest;
