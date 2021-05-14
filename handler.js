'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.hello = async (event) => {
    var html = fs.readFileSync('index.html', 'utf8')

    console.log('env', process.env.DYNAMODB_TABLE);
    console.log('input', event.pathParameters);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            code: event.pathParameters.code,
        },
    };

    if (!event.pathParameters.code) {
        return Promise.reject({
            statusCode: 404,
            headers: {
                'Content-Type': 'text/html',
            },
            body: '',
        });
    }

    const promise = new Promise(function(resolve, reject) {
        dynamoDb.get(params).promise()
            .then(result => {
                if (!result.Item) {
                    resolve({
                        statusCode: 404,
                        headers: {
                            'Content-Type': 'text/html',
                        },
                        body: '',
                    });

                    return;
                }

                console.info('result', result);
                console.info(html);
                html = html.replace(/{{code}}/g, result.Item.code);
                html = html.replace(/{{greeting_name}}/g, result.Item.greeting_name);
                html = html.replace(/{{pronoun}}/g, result.Item.plural == 2 ? 'вас' : 'тебя');
                html = html.replace(/{{feedback}}/g, result.Item.plural == 2 ? 'вы сообщите' : 'ты сообщишь');
                console.info(html);

                resolve({
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'text/html',
                    },
                    body: html,
                });
            })
            .catch(error => {
                console.error(error);
                reject(new Error('Couldn\'t fetch invitation.'));
            });
    });

    return promise
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
