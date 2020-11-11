var twilio = require("twilio");
//Account SID from www.twilio.com/console
var accountSid = "ACCOUNTSID"; 
//Auth Token from www.twilio.com/console
var authToken = "AUTHTOKEN";

var client = new twilio(accountSid, authToken);

client.messages
    .create({
        body:
            "Welcome brown bag! We look forward to serving you! Your table is ready. Please proceed to table 12.",
        // Text this number
        to: "+15555555555",
        // From a valid Twilio number
        from: "+15555555555",
    })
    // eslint-disable-next-line no-console
    .then((message) => console.log(message.sid));

var numbersToMessage = ["+15555555555", "+15555555555",];

numbersToMessage.forEach(function (number) {
	//go back and check
    // eslint-disable-next-line no-unused-vars
    var message = client.messages
        .create({
            body:
                "Welcome brown bag! We look forward to serving you! Your table is ready now. Please proceed to table 12. Then when you are ready to eat please place your order on the app and our chefs will be happy to prepare it for you.",
            from: "+15555555555",
            to: number,
        })
        // eslint-disable-next-line no-console
        .then((message) => console.log(message.status))
        .done();
});
