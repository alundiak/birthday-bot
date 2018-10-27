//
// Birthday Bot Server v3
//
require('dotenv').config();

module.exports = function() {
    var builder = require('botbuilder');
    var restify = require('restify');
    var BotBrain = require('./skype-birthday-bot');

    var server = restify.createServer({
        name: 'skype-birthday-bot',
        version: '1.0.0'
    });

    var connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });

    var bot = new BotBrain(connector);

    server.post('/api/messages', connector.listen());

    server.listen(process.env.PORT || 3978, function() {
        console.log('%s listening to %s', server.name, server.url);
    });
}
