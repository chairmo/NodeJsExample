var http = require('http');
var url = require('url');

exports.start = function (route, handler) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received');

        route(handler, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started!');
};