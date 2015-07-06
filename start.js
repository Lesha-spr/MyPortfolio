var app = require('./app');
var config = require('./config/config.json');

var Imagemin = require('imagemin');

new Imagemin()
    .src('./public/src/i/*.{gif,jpg,png,svg}')
    .dest('./public/build/i')
    .use(Imagemin.optipng({progressive: true}))
    .use(Imagemin.jpegtran({progressive: true}))
    .run(function (err, files) {
        console.log(files);
        var server = app.listen(process.env.PORT || config.port, function () {

            var host = server.address().address;
            var port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);

        });
});