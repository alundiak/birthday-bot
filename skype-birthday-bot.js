module.exports = function(connector) {
    var builder = require('botbuilder');
    // var sendSms = require('./parse-xls');
    
    var bot = new builder.UniversalBot(connector, function (session) {
        session.sendTyping();
        consol.log('SESSION', JSON.stringify(session, null, 2));

        // let response = sendSms(session.message.text);

        // if (response){ // todo check state or status of message
        //     session.send("SMS sent to " + response.to);
        // } else {
        //     console.log('NOOOOOO')
        //     // console.log(session)
        // }
    });

    // https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-handle-conversation-events
    bot.on('contactRelationUpdate', function(message) {
        console.log(message);
        if (message.action === 'add') {
            var name = message.user ? message.user.name : null;
            var reply = new builder.Message()
                .address(message.address)
                .text("Hello %s... Thanks for adding me.", name || 'there');
            bot.send(reply);
        }
    });

    return bot;
}