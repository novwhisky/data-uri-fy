var fs = require("fs");

var formats = [
    "base64"
    //, "utf8"
];

var contentType = {
    "svg": "image/svg+xml"
};

function getHeader(content, encoding) {
    var fmt = formats.indexOf(encoding);
    if(content in contentType &&
        fmt in formats)
        return "data:" + contentType[content] + ";" + formats[fmt] + ",";
    else
        return false;
}

function getExtension(file) {
    var fileRE = /\.([\w]+)$/,
        ext = file.match(fileRE);

    if(ext) {
        return ext[1];
    }else{
        return false;
    }
}

module.exports = {
    convert: function(path, options) {
        var opts = {
            "encoding": "base64"
        };

        if(options)
        {
            Object.keys(options).forEach(function(v) {
                opts[v] = options[v];
            });
        }

        var data = fs.readFileSync(path, opts),
            ext = getExtension(path),
            converted = getHeader(ext, opts.encoding) + data;

        return converted;
    }
};