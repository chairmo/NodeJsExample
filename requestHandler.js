var formidable = require('formidable');
var fs = require('fs');

exports.start = function start(response) {
    console.log('Request handler "Start" is called');

    var body = '<html lang="en">' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '<title> Beginners guide </title></head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();

};

exports.upload = function (response, request) {
    console.log('Request handler "Upload" is called');

    var form = new formidable.IncomingForm();

    form.parse(request, function (error, fields, files) {
        /* possible error try renaming to an existing file */
        fs.rename(files.upload.path, '/tmp/test.png', function (error) {
            if (error){
                fs.uplink('/tmp/test/png');
                fs.rename(files.upload.path, '/tmp/test.png');
            }
        });
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Received image: <br/>');
    response.write('<img src=" /show"  alt="display image"/>');
    response.end();
};

exports.show = function (response) {
    console.log('request handler "Show" is called');
    fs.readFile('/tmp/text.png', 'binary', function (error, file) {
        if (error) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error, '\n');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
};