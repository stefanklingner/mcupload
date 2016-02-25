/**
 * Created by stefank on 24.02.2016.
 */

var fs = require('fs');


function picture_facade () {

    var self = this;

    self.load_pictures = function (source, callback) {

        callback(true);

    };

    self.add = function(a, b) {

        return a + b;

    };

    self.load = function (path, callback) {

        fs.readdir(path, function (err, files) {

            if (err) { throw err; }

            files.forEach(function (elem) {

                fs.readFile(elem, function(err, data) {
                    if (err) throw err;
                    callback(data);
                });
            });
        });

    };

};

module.exports = picture_facade;