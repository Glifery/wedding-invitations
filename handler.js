'use strict';

var fs = require('fs');

module.exports.hello = async (event) => {
    var html = fs.readFileSync('index.html', 'utf8')

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html,
    };
};

module.exports.css = async (event) => {
    var css = fs.readFileSync('assets/main.css', 'utf8')

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/css',
        },
        body: css,
    };
};

module.exports.font_avalon = async (event) => {
    var css = fs.readFileSync('assets/avalon_medium.ttf', 'utf8')

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'font/ttf',
        },
        body: css,
    };
};

module.exports.font_serveroff = async (event) => {
    var css = fs.readFileSync('assets/web_serveroff.ttf', 'utf8')

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'font/ttf',
        },
        body: css,
    };
};
