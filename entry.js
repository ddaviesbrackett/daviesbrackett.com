const static = require('node-static');
const http = require("http");
const port = process.env['PORT'] || 8080;

const statics = {
    "root":new static.Server('./public/root'),
    "dan":new static.Server('./public/dan'),
    "rhys":new static.Server('./public/rhys'),
};

http.createServer(function (request, response) {
    request.addListener('end', function () {
        const host = request.headers.host || "root.",
            dotPos = host.indexOf(".", 1),
            slice = dotPos > 0?dotPos:host.length,
            staticToServe = host.substring(0, slice);
        (statics[staticToServe] || statics["root"]).serve(request, response);
    }).resume();
}).listen(port);