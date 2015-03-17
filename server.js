/**
 * Created by Stefan on 06.11.14.
 */


var util = require('util')
var path = require('path')
var os = require('os')
var express = require('express')

var Busboy = require('busboy')

var app = express()

var html_dir = '/html/'

//for iisnode
var home = '/node/uploadExample/';

var home = '/';

app.use(express.static(path.join(__dirname, 'html')));
app.use(home + 'js', express.static(path.join(__dirname, 'js')));
app.use(home + 'css', express.static(path.join(__dirname, 'css')));
app.use(home + 'fonts', express.static(path.join(__dirname, 'fonts')));

//
app.get(home, function (req, res) {
    res.sendFile(__dirname + html_dir + 'upload.html');
})

//
app.get(home + 'simple', function (req, res) {
    res.send(
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="snapshot" />' +
        '<input type="submit" value="Upload" />' +
        '</form>'
    );
})

//
app.get(home + 'simple2', function (req, res) {
    res.sendFile(__dirname + html_dir + 'simple2.html');
})

//
app.get(home + 'dnd', function(req, res) {
    res.sendFile(__dirname + html_dir + 'DragAndDrop.html');
})

//
app.post(home + 'upload', function (req, res) {

    var busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        console.log('File [' + fieldname + ']: filename: ' + filename);
        file.on('data', function(data) {
            //console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });

    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));
    });

    busboy.on('error', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));
    });


    busboy.on('finish', function () {
        console.log("finish");
        res.writeHead(200, {'Connection': 'close'});
        res.end("That's all folks!");
    });

    return req.pipe(busboy);

})

//for iisnode
//var port = process.env.PORT;
var port = 8080;
var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})


